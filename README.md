# LOOP

LOOP is a productivity workspace for planning tasks, protecting focus time, tracking goals, and using AI assistance to understand your work.

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). The main workspace is available at `/dashboard`.

## Application features

| Feature | Route | Main implementation |
| --- | --- | --- |
| Dashboard | `/dashboard` | `app/(app)/dashboard/page.tsx` |
| Tasks | `/tasks` | `app/(app)/tasks/page.tsx` |
| Calendar | `/calendar` | `app/(app)/calendar/page.tsx` |
| Focus Mode | `/focus` | `app/(app)/focus/page.tsx` |
| Goals | `/goals` | `app/(app)/goals/page.tsx` |
| Analytics | `/analytics` | `app/(app)/analytics/page.tsx` |
| Notes | `/notes` | `app/(app)/notes/page.tsx` |
| AI Assistant | `/ask` | `components/AIAssistant.tsx` |
| Integrations | `/integrations` | `app/(app)/integrations/page.tsx` |
| Settings | `/settings` | `app/(app)/settings/page.tsx` |

## Team implementation notes

- Shared layout and navigation are in `app/(app)/layout.tsx`.
- Shared page headers and metric cards are in `components/FeaturePageLayout.tsx`; reusable progress bars and category dots are in `components/ProgressBar.tsx` and `components/CategoryDot.tsx`.
- Feature pages use route-local mock data so team members can replace it with API calls incrementally.
- Global styles use logical sizing properties for progress indicators and scrollbars, supporting different writing modes.
- The AI Assistant route uses `components/AIAssistant.tsx`. Its chat implementation lives in `components/AskLoopChat.tsx`; replace the mock `handleSend` response with the production AI endpoint when it is ready.
- Legacy Inbox, Reports, and Trends routes were removed because they are outside the current navigation design.

## Verification

```bash
npm run build
```
