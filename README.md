# Traveloop

A scalable multi-city travel itinerary planning platform built with Next.js, Prisma, and PostgreSQL (Neon).

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 |
| ORM | Prisma 7 |
| Database | PostgreSQL (Neon serverless) |
| DB Adapter | `@prisma/adapter-neon` |
| Forms | React Hook Form + Zod |
| Drag & Drop | `@dnd-kit` |
| Auth | PASETO (integration pending) |

---

## Prerequisites

- Node.js 18+
- npm
- A [Neon](https://neon.tech) PostgreSQL database

---

## Getting Started

### 1. Clone and install dependencies

```bash
git clone https://github.com/7JankiPanchal/Traveloop.git
cd Traveloop
npm install
# This also runs `prisma generate` automatically via postinstall
```

### 2. Set up environment variables

Create a `.env` file in the project root:

```env
DATABASE_URL="postgresql://USER:PASSWORD@HOST/DBNAME?sslmode=require&channel_binding=require"
```

> Get your connection string from the [Neon dashboard](https://console.neon.tech).

### 3. Apply database migrations

```bash
npx prisma migrate dev
```

This creates all tables in your Neon database.

### 4. (Optional) Open Prisma Studio

```bash
npx prisma studio
```

### 5. Start the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Project Structure

```
src/
├── app/
│   ├── (app)/                        # Authenticated route group
│   │   ├── trips/[tripId]/builder/   # Feature 5 — Itinerary Builder
│   │   ├── trips/[tripId]/view/      # Feature 6 — Itinerary View
│   │   └── search/                   # Feature 7 — City/Activity Search
│   └── api/
│       ├── cities/search/            # Proxies Teleport city search API
│       └── activities/search/        # Activity search from local DB
├── components/
│   ├── itinerary/                    # Builder + timeline components
│   ├── city-search/                  # City autocomplete
│   ├── activity/                     # Activity search cards
│   └── ui/                           # Button, Badge, Skeleton, EmptyState
├── actions/
│   ├── stop/                         # createStop, updateStop, deleteStop, reorderStops
│   └── activity/                     # createActivity, updateActivity, deleteActivity
├── services/
│   ├── itinerary/                    # getItinerary, transformItinerary
│   ├── city/                         # searchCities (Teleport API)
│   └── activity/                     # searchActivities (local DB)
├── lib/
│   ├── auth/getCurrentUser.ts        # Auth abstraction (PASETO-ready stub)
│   ├── validations/                  # Zod schemas
│   ├── generated/prisma/             # Auto-generated Prisma client (gitignored)
│   └── prisma.ts                     # Prisma singleton with Neon adapter
├── hooks/                            # useDebounce, useCitySearch, useActivitySearch
└── types/                            # Shared TypeScript types
```

---

## Database

Schema is defined in `prisma/schema.prisma`. Key models:

| Model | Description |
|---|---|
| `User` | Platform users |
| `Trip` | A user's trip with dates and budget |
| `Stop` | A city/stop within a trip (ordered) |
| `Activity` | A reusable activity record |
| `StopActivity` | Junction: activity scheduled within a stop |
| `Note` | Free-form notes per trip or stop |
| `BudgetEntry` | Budget tracking entries |
| `PackingItem` | Packing checklist items |

### Useful Prisma commands

```bash
# Apply schema changes to DB
npx prisma migrate dev --name <migration-name>

# Regenerate Prisma client after schema changes
npx prisma generate

# Reset DB (drops all data)
npx prisma migrate reset

# Open Prisma Studio
npx prisma studio
```

---

## Auth

Auth is handled via **PASETO tokens**.

The abstraction is in `src/lib/auth/getCurrentUser.ts`:

```ts
const user = await getCurrentUser()   // returns AuthUser | null
const user = await requireUser()      // throws if unauthenticated
```

In development, a mock user is returned automatically so all features work without a real auth session.

---

## Available Routes

| Route | Description |
|---|---|
| `/trips/[tripId]/builder` | Drag-and-drop itinerary builder |
| `/trips/[tripId]/view` | Read-only timeline view with filters |
| `/search` | City and activity discovery |
| `/api/cities/search?q=` | City search API (Teleport) |
| `/api/activities/search?q=` | Activity search API (local DB) |

---

## Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
```
