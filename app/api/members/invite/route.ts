import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getSessionUser } from "@/lib/auth";
import crypto from "crypto";

export async function POST(request: NextRequest) {
  try {
    const user = getSessionUser(request);
    if (!user?.workspaceId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    if (user.role !== "ADMIN") return NextResponse.json({ error: "Forbidden" }, { status: 403 });

    const { email, role } = await request.json();
    const normalizedEmail = typeof email === "string" ? email.trim().toLowerCase() : "";
    if (!normalizedEmail || !["ANALYST", "VIEWER"].includes(role)) return NextResponse.json({ error: "Use a valid email and role" }, { status: 400 });

    // Sanity guard: ensure Prisma client includes the Invitation model
    if (!(db as any).invitation) {
      return NextResponse.json({ error: "Server misconfiguration: Invitation model not available. Run `npx prisma generate` and `npx prisma db push` then restart the server." }, { status: 500 });
    }

    // Create a unique token for in-app invitation
    const token = crypto.randomUUID();

    const invite = await (db as any).invitation.create({
      data: {
        email: normalizedEmail,
        role,
        token,
        workspaceId: user.workspaceId!,
      },
    });

    const inviteUrl = `${process.env.NEXT_PUBLIC_BASE_URL || ""}/accept-invite?token=${token}`;

    return NextResponse.json({ success: true, token: invite.token, inviteUrl });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to create invitation" }, { status: 500 });
  }
}
