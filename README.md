# Kanban Board

A drag-and-drop Kanban board built with React, TypeScript, and Welcome UI.

## Tech Stack

- **React 19** + **TypeScript**
- **TanStack Query** — data fetching, caching, and mutations
- **dnd-kit** — drag-and-drop interactions
- **Welcome UI** — component library
- **Vite** — build tooling

## Installation

```bash
npm install
npm run dev
```

## Features (MVP)

- View tasks organised across three swimlanes: To Do, In Progress, and Done
- Drag and drop tasks between swimlanes
- Create new tasks — validated to prevent empty submissions
- Persistent state via REST API (MockAPI)
- Loading and error states handled throughout

## Tradeoffs & Known Limitations

**Optimistic updates on drag:** Drag-and-drop currently uses `invalidateQueries` on completion, which triggers a refetch after every move. This is simpler and avoids rollback logic, but means there's a brief visual delay on slow connections. A proper `onMutate` implementation with cache rollback on failure would improve perceived performance.

**Shared MockAPI endpoint:** The app uses a public MockAPI instance for convenience during development. This means the app requires an internet connection and any developer running it shares the same dataset. In a production context this would be replaced with MSW and local fixtures for testing, and a real backend for deployment.

**No task deletion or editing:** Kept scope intentional to focus on the drag-and-drop architecture and data-fetching patterns rather than building out full CRUD.

## If I Had More Time

- Keyboard support — submit new task on Enter, keyboard-navigable drag-and-drop via dnd-kit's keyboard sensor
- Delete and edit mutations — tasks are currently append-only
- Optimistic updates on drag to eliminate the refetch delay
- Mutation error feedback — a toast or inline message if a drag or create fails silently
- Task count badge per swimlane
- A dedicated drag handle on each card rather than the full card being draggable