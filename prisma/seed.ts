import { db } from "../lib/db";
import { hashPassword } from "../lib/auth";

async function main() {
  console.log("Seeding demo workspace and users...");

  // Create demo workspace
  const workspace = await db.workspace.create({ data: { name: "Demo Company" } });

  // Create three users: ADMIN, ANALYST, VIEWER
  const users = [
    { name: "Alice Admin", email: "alice.admin@demo.test", password: "password123", role: "ADMIN" },
    { name: "Andy Analyst", email: "andy.analyst@demo.test", password: "password123", role: "ANALYST" },
    { name: "Vera Viewer", email: "vera.viewer@demo.test", password: "password123", role: "VIEWER" },
  ];

  for (const u of users) {
    const hashed = hashPassword(u.password);
    await db.user.create({ data: { name: u.name, email: u.email, password: hashed, role: u.role as any, workspaceId: workspace.id } });
  }

  console.log("Seeding complete: Demo Company with ADMIN/ANALYST/VIEWER users created.");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
