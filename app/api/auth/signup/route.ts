import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { hashPassword, signJWT } from "@/lib/auth";

export async function POST(request: NextRequest) {
  try {
    const { name, email, password, workspaceName } = await request.json();

    if (!name || !email || !password) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Check if user already exists
    const existingUser = await db.user.findUnique({ where: { email } });
    if (existingUser) {
      return NextResponse.json({ error: "User with this email already exists" }, { status: 400 });
    }

    // If there's a pending invitation for this email, auto-accept and attach to that workspace
    const pendingInvite = await db.invitation.findFirst({ where: { email, accepted: false } });
    let workspace;
    let user;
    const hashedPassword = hashPassword(password);

    if (pendingInvite) {
      // Attach to existing workspace and set role from invitation
      workspace = await db.workspace.findUnique({ where: { id: pendingInvite.workspaceId } });
      if (!workspace) {
        return NextResponse.json({ error: "The invited workspace no longer exists" }, { status: 404 });
      }

      user = await db.user.create({
        data: {
          name,
          email,
          password: hashedPassword,
          role: pendingInvite.role,
          workspaceId: pendingInvite.workspaceId,
        },
      });

      // Mark the invitation accepted
      await db.invitation.update({ where: { token: pendingInvite.token }, data: { accepted: true } });
    } else {
      // No invite: create a new company workspace and make creator ADMIN
      const finalWorkspaceName = workspaceName || `${name}'s Company`;
      workspace = await db.workspace.create({ data: { name: finalWorkspaceName } });

      user = await db.user.create({
        data: {
          name,
          email,
          password: hashedPassword,
          role: "ADMIN",
          workspaceId: workspace.id,
        },
      });
    }

    // Sign JWT
    const token = signJWT({
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      workspaceId: workspace.id,
      workspaceName: workspace.name,
    });

    // Return response with HTTP-only cookie
    const response = NextResponse.json({
      success: true,
      user: { id: user.id, name: user.name, email: user.email, role: user.role, workspaceId: workspace.id },
    });

    response.headers.set(
      "Set-Cookie",
      `token=${token}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${60 * 60 * 24 * 7}`
    );

    return response;
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to register user" }, { status: 500 });
  }
}
