import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getSessionUser } from "@/lib/auth";

export async function GET(request: NextRequest) {
  try {
    const user = getSessionUser(request);
    if (!user?.workspaceId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    if (user.role !== "ADMIN") return NextResponse.json({ error: "Forbidden" }, { status: 403 });

    const members = await db.user.findMany({
      where: { workspaceId: user.workspaceId },
      select: { id: true, name: true, email: true, role: true, createdAt: true },
    });

    // Also return pending invitations for this workspace so the UI can show pending members
    const invites = await db.invitation.findMany({
      where: { workspaceId: user.workspaceId, accepted: false },
      select: { id: true, email: true, role: true, token: true, createdAt: true },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ success: true, members, invites });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to fetch members" }, { status: 500 });
  }
}
