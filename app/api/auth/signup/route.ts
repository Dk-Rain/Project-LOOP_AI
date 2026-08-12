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
    const existingUser = await db.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json({ error: "User with this email already exists" }, { status: 400 });
    }

    // Create a new company workspace
    const finalWorkspaceName = workspaceName || `${name}'s Company`;
    const workspace = await db.workspace.create({
      data: { name: finalWorkspaceName },
    });

    // Create user as ADMIN since they are the creator of this workspace
    const hashedPassword = hashPassword(password);
    const user = await db.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role: "ADMIN",
        workspaceId: workspace.id,
      },
    });

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
