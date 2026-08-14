import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { hashPassword, signJWT } from "@/lib/auth";

export async function POST(request: NextRequest) {
  try {
    const { token, name, password } = await request.json();
    if (!token || !name || !password) return NextResponse.json({ error: "Missing fields" }, { status: 400 });

    const invite = await db.invitation.findUnique({ where: { token } });
    if (!invite) return NextResponse.json({ error: "Invalid or expired invitation" }, { status: 404 });
    if (invite.accepted) return NextResponse.json({ error: "Invitation already accepted" }, { status: 400 });
    if (invite.expiresAt && new Date() > invite.expiresAt) return NextResponse.json({ error: "Invitation expired" }, { status: 400 });

    // If a user already exists with this email, attach them to the workspace and update role
    const existingUser = await db.user.findUnique({ where: { email: invite.email } });

    let user;
    const hashed = hashPassword(password);
    if (existingUser) {
      user = await db.user.update({ where: { email: invite.email }, data: { workspaceId: invite.workspaceId, role: invite.role } });
    } else {
      user = await db.user.create({ data: { name, email: invite.email, password: hashed, role: invite.role, workspaceId: invite.workspaceId } });
    }

    // Mark invitation accepted
    await db.invitation.update({ where: { token }, data: { accepted: true } });

    // Retrieve workspace name for better client display
    const workspace = await db.workspace.findUnique({ where: { id: invite.workspaceId } });

    // Sign JWT and set cookie (include workspaceName)
    const tokenJwt = signJWT({ id: user.id, name: user.name, email: user.email, role: user.role, workspaceId: user.workspaceId, workspaceName: workspace?.name });

    const response = NextResponse.json({ success: true, user: { id: user.id, name: user.name, email: user.email, role: user.role, workspaceId: user.workspaceId } });
    response.headers.set("Set-Cookie", `token=${tokenJwt}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${60 * 60 * 24 * 7}`);

    return response;
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to accept invitation" }, { status: 500 });
  }
}
