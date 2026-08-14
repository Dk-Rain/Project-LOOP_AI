import { NextRequest, NextResponse } from "next/server";
import { getSessionUser } from "@/lib/auth";
import { db } from "@/lib/db";

export async function GET(request: NextRequest) {
  try {
    const user = getSessionUser(request);
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    // Read the current database record so role and workspace changes take effect
    // immediately instead of waiting for the JWT to expire.
    const currentUser = await db.user.findUnique({
      where: { id: user.id },
      include: { workspace: { select: { name: true } } },
    });
    if (!currentUser || !currentUser.workspaceId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    return NextResponse.json({
      user: {
        id: currentUser.id,
        name: currentUser.name,
        email: currentUser.email,
        role: currentUser.role,
        workspaceId: currentUser.workspaceId,
        workspaceName: currentUser.workspace?.name,
      },
    });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch user session" }, { status: 500 });
  }
}
