import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getSessionUser, signJWT } from "@/lib/auth";

export async function PATCH(request: NextRequest) {
  try {
    const sessionUser = getSessionUser(request);
    if (!sessionUser) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { name, email } = await request.json();
    const normalizedName = typeof name === "string" ? name.trim() : "";
    const normalizedEmail = typeof email === "string" ? email.trim().toLowerCase() : "";
    if (!normalizedName || !normalizedEmail) {
      return NextResponse.json({ error: "Name and email are required" }, { status: 400 });
    }

    const existing = await db.user.findUnique({ where: { email: normalizedEmail } });
    if (existing && existing.id !== sessionUser.id) {
      return NextResponse.json({ error: "That email address is already in use" }, { status: 409 });
    }

    const user = await db.user.update({
      where: { id: sessionUser.id },
      data: { name: normalizedName, email: normalizedEmail },
      include: { workspace: true },
    });
    const token = signJWT({
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      workspaceId: user.workspaceId,
      workspaceName: user.workspace?.name || "No Company Workspace",
    });
    const response = NextResponse.json({ success: true, user: { id: user.id, name: user.name, email: user.email, role: user.role, workspaceId: user.workspaceId } });
    response.headers.set("Set-Cookie", `token=${token}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${60 * 60 * 24 * 7}`);
    return response;
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to save profile" }, { status: 500 });
  }
}
