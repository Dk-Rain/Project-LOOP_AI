# LOOP — AI Customer-Feedback Intelligence Platform

LOOP is a premium, multi-tenant SaaS customer feedback intelligence platform built to ingest, auto-classify, cluster, and analyze customer feedback logs from multiple channels (Zendesk, Intercom, App Store, Discord, etc.) using Anthropic's Claude 3.5 Sonnet.

---

## 🚀 Getting Started

### 1. Prerequisite Environment
Create a `.env` file in the root directory:
```env
DATABASE_URL="postgresql://postgres:admin@localhost:5432/loop"
JWT_SECRET="your-secure-jwt-signing-secret"
ANTHROPIC_API_KEY="your-anthropic-key-here"
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Synchronize Database & Generate Types
Apply the Prisma schema migrations and compile type indices:
```bash
# Push database structures to PostgreSQL
npx prisma db push

# Rebuild local TypeScript Client types
npx prisma generate
```

### 4. Run the Platform Locally
```bash
# Start Next.js development server
npm run dev

# Start visual database studio explorer (runs at http://localhost:51212)
npx prisma studio
```
The application will be live at [http://localhost:3000](http://localhost:3000).

---

## 🛠️ Tech Stack
- **Framework**: Next.js 14 (App Router)
- **Database**: PostgreSQL (synchronized via Prisma ORM v7)
- **Database Driver Adapter**: Explicit `@prisma/adapter-pg` + native `pg` pool connector (Prisma 7 compatible)
- **Authentication**: Custom lightweight HTTP-only cookie session JWTs signed via Node's native `crypto` HMAC-SHA256
- **AI Classification**: Dual Engine: Anthropic Claude 3.5 Sonnet API / Heuristic Keyword Sentiment Fallback
- **Styling**: Vanilla CSS and Tailwind-compatible layouts

---

## 📂 Routes & Folder Map

| Feature Area | Router Path | Main Component Location |
| :--- | :--- | :--- |
| **Landing Page** | `/` | [app/page.tsx](file:///c:/Users/LAWRENCE%20DIKE/OneDrive/Documents/Zidddo%20Intenship%20Project/Loop/app/page.tsx) |
| **Sign Up & Workspace Register** | `/signup` | [app/(auth)/signup/page.tsx](file:///c:/Users/LAWRENCE%20DIKE/OneDrive/Documents/Zidddo%20Intenship%20Project/Loop/app/%28auth%29/signup/page.tsx) |
| **Login portal** | `/login` | [app/(auth)/login/page.tsx](file:///c:/Users/LAWRENCE%20DIKE/OneDrive/Documents/Zidddo%20Intenship%20Project/Loop/app/%28auth%29/login/page.tsx) |
| **Analytics Dashboard** | `/dashboard` | [app/(app)/dashboard/page.tsx](file:///c:/Users/LAWRENCE%20DIKE/OneDrive/Documents/Zidddo%20Intenship%20Project/Loop/app/%28app%29/dashboard/page.tsx) |
| **Feedback Inbox Manager** | `/inbox` | [app/(app)/inbox/page.tsx](file:///c:/Users/LAWRENCE%20DIKE/OneDrive/Documents/Zidddo%20Intenship%20Project/Loop/app/%28app%29/inbox/page.tsx) |
| **AI Q&A Grounded Chat** | `/ask` | [app/(app)/ask/page.tsx](file:///c:/Users/LAWRENCE%2520DIKE/OneDrive/Documents/Zidddo%2520Intenship%2520Project/Loop/app/%28app%29/ask/page.tsx) |
| **Theme Clustering & Trends** | `/trends` | [app/(app)/trends/page.tsx](file:///c:/Users/LAWRENCE%20DIKE/OneDrive/Documents/Zidddo%20Intenship%20Project/Loop/app/%28app%29/trends/page.tsx) |
| **Voice of Customer Reports** | `/reports` | [app/(app)/reports/page.tsx](file:///c:/Users/LAWRENCE%20DIKE/OneDrive/Documents/Zidddo%20Intenship%20Project/Loop/app/%28app%29/reports/page.tsx) |
| **Workspace Settings** | `/settings` | [app/(app)/settings/page.tsx](file:///c:/Users/LAWRENCE%20DIKE/OneDrive/Documents/Zidddo%20Intenship%20Project/Loop/app/%28app%29/settings/page.tsx) |

---

## 🎯 Key Features & Tenant Security

### 🔐 1. Multi-Tenant Security & Isolation
Every row stored in the database (`Feedback`, `Theme`, `Report`, `User`) is scoped strictly to a `workspaceId`. Backend API routes fetch verified user credentials from secure HTTP-only cookies and append `where: { workspaceId }` limits to all SQL queries, preventing cross-tenant access.

### 🔴 2. Role-Based Access Control (RBAC)
Supports three active user permissions:
- **Admin**: Full workspace access and user management capability.
- **Analyst**: Ingest manual customer records, process CSV batch imports, simulate channel integrations, and run reports.
- **Viewer**: Read-only workspace layout access. 
*RBAC permissions are verified on both the frontend layout state and enforced on the server-side API endpoints (`403 Forbidden` response rules).*

### 🔌 3. Feedback Ingestion Channels
Supports three entry pathways inside the Feedback Inbox:
1. **Manual Single Form**: Adds custom logs with name and email options.
2. **CSV Import**: Drop or paste comma-separated values (`Name,Email,Channel,Content`) to bulk ingest.
3. **Simulated Feed**: Randomly seeds logs from integrations (Zendesk, Intercom, Discord, App Store) with automatic classification.

### 🤖 4. AI Auto-Classification & Re-classify
Ingested logs trigger an AI classifier which computes:
- Sentiment ("Positive" / "Neutral" / "Negative")
- Sentiment Score (numerical rating `-1.0 to 1.0`)
- Theme tags association
- Feature area categorizations
- Detailed reasoning / rationales
*Users with Admin/Analyst roles can click the manual re-classify trigger at any time to refresh AI metrics.*

### 🤖 5. Grounded AI Q&A Chat
Ensures that Ask LOOP AI chatbot queries are grounded purely on customer tickets inside the workspace. The backend matches keywords in the query, pulls corresponding tickets from PostgreSQL, formats the context, and instructs Claude to generate answers citing specific client names and quotes.

### 🤖 6. Voice of Customer (VoC) Reports
Analysts can compile executive summaries of customer logs in selected periods. Reports include sentiment spreads, top theme growths, customer quotes, and recommendations. Standard browser print layouts are configured to export styled reports to physical sheets or PDF files.
