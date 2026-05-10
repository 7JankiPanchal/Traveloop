# Traveloop

## What is Traveloop?

Traveloop is a travel itinerary planning platform that helps you plan multi-city trips from start to finish. Instead of juggling spreadsheets and scattered notes, you get one place to organize everything — your cities, daily activities, budgets, and timelines.

### What you can do

- **Create trips** — set a title, date range, and overall budget for each journey.
- **Add cities/stops** — build your route by adding the cities you want to visit, in order. Search from a worldwide city database and drag-and-drop to reorder.
- **Plan activities** — within each city, add things to do — tours, restaurants, landmarks, adventures. Each activity tracks its estimated cost, duration, and category.
- **View your itinerary** — switch to a read-only timeline view that groups everything by city, shows day-by-day breakdowns, and totals up your costs. Filter by city, category, or search for specific activities.
- **Search destinations** — discover cities and activities through a dedicated search page. Find a place, then add it straight to your trip.
- **Track budgets** — see estimated costs at the stop level and trip level, with visual breakdowns.
- **Account system** — sign up, log in, and keep your trips private. Each trip belongs to its creator.

### Who is it for?

Solo travelers, friend groups, or anyone who wants a clean, organized way to plan a trip without the chaos of shared Google Docs.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router + Turbopack) |
| Language | TypeScript 5 |
| Styling | Tailwind CSS v4 |
| ORM | Prisma 7 |
| Database | PostgreSQL (Neon serverless) |
| DB Adapter | `@prisma/adapter-neon` |
| Forms | React Hook Form + Zod |
| Drag & Drop | `@dnd-kit` |
| Auth | PASETO v4 tokens |
| Charts | Recharts |

---

## Prerequisites

- **Node.js** 18+
- **npm**
- A [Neon](https://neon.tech) PostgreSQL database

---

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/7JankiPanchal/Traveloop.git
cd Traveloop
```

### 2. Install dependencies

```bash
npm install
```

> This also runs `prisma generate` automatically via the `postinstall` script.

### 3. Set up environment variables

Create a `.env` file in the project root:

```env
DATABASE_URL="postgresql://USER:PASSWORD@HOST/DBNAME?sslmode=require"
PASETO_PRIVATE_KEY="<base64-encoded-ed25519-private-key>"
PASETO_PUBLIC_KEY="<base64-encoded-ed25519-public-key>"
```

> Get your database connection string from the [Neon dashboard](https://console.neon.tech).

### 4. Apply database migrations

```bash
npx prisma migrate dev
```

This creates all tables in your Neon database.

### 5. (Optional) Open Prisma Studio

```bash
npx prisma studio
```

### 6. Start the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Project Structure

```
src/
├── app/
│   ├── (app)/                          # Authenticated route group
│   │   ├── trips/page.tsx              # Trip list
│   │   ├── trips/[tripId]/builder/     # Itinerary Builder (write layer)
│   │   ├── trips/[tripId]/view/        # Itinerary View (read layer)
│   │   └── search/                     # City & Activity Search (discovery layer)
│   ├── api/auth/                       # Auth API routes (login, signup)
│   ├── login/                          # Login page
│   ├── signup/                         # Signup page
│   ├── layout.tsx                      # Root layout
│   └── page.tsx                        # Landing / budget overview
├── actions/
│   ├── trip/                           # createTrip, deleteTrip
│   ├── stop/                           # createStop, updateStop, deleteStop, reorderStops
│   ├── activity/                       # createActivity, updateActivity, deleteActivity, assignActivity
│   └── search/                         # searchCitiesAction, searchActivitiesAction
├── components/
│   ├── itinerary/                      # StopList, StopCard, StopForm, ActivityCard, ActivityForm, etc.
│   ├── city-search/                    # CitySearchInput (autocomplete dropdown)
│   ├── budget/                         # BudgetSummaryCard, ExpenseBreakdownChart, DailyExpenseBarChart
│   ├── trips/                          # Trip list components
│   └── ui/                            # Button, Badge, Skeleton, EmptyState
├── services/
│   ├── itinerary/                      # getItinerary, transformItinerary
│   ├── city/                           # searchCities (Nominatim / OpenStreetMap API)
│   └── activity/                       # searchActivities (local DB)
├── lib/
│   ├── auth/getCurrentUser.ts          # Auth abstraction layer
│   ├── auth.ts                         # PASETO token sign/verify utilities
│   ├── validations/                    # Zod schemas (trip, stop, activity)
│   ├── generated/prisma/              # Auto-generated Prisma client
│   ├── prisma.ts                       # Prisma singleton with Neon adapter
│   └── utils.ts                        # formatDate, formatCurrency, serialize
├── hooks/                              # useDebounce, useCitySearch, useActivitySearch
├── data/                               # Static mock data (budget)
├── styles/                             # Additional styles
└── types/                              # Shared TypeScript types (auth, city, itinerary)
```

---

## Architecture

The project follows a layered architecture to keep concerns separated:

```
UI Components (React)
  → Server Actions (src/actions/)
    → Services (src/services/)
      → Prisma ORM (src/lib/prisma.ts)
        → PostgreSQL (Neon)
```

**Design rules:**
- Prisma queries never appear inside React components.
- All mutations go through Server Actions with auth validation via `requireUser()`.
- Reusable business logic lives in the services layer.
- Search is public; all write operations require authentication.
- The auth provider is abstracted — features import from `lib/auth/getCurrentUser.ts`, never from any auth SDK directly.

---

## Database Schema

Defined in `prisma/schema.prisma`. Models:

| Model | Description |
|---|---|
| `User` | Platform users with email/password auth |
| `Trip` | A user's trip with dates, budget, and optional share token |
| `Stop` | A city/stop within a trip, ordered via `sortOrder` |
| `Activity` | A reusable activity record tied to a city |
| `StopActivity` | Junction table: an activity scheduled within a specific stop |
| `City` | City metadata (name, country, cost index, popularity) |
| `Note` | Free-form notes attached to a trip or stop |
| `BudgetEntry` | Budget tracking entries by category |
| `PackingItem` | Packing checklist items |
| `SavedDestination` | User's bookmarked cities |

### Key relationships

- A **User** has many **Trips**.
- A **Trip** has many **Stops** (ordered).
- A **Stop** belongs to a **City** and has many **StopActivities**.
- An **Activity** belongs to a **City** and can be assigned to multiple stops.

### Prisma commands

```bash
npx prisma migrate dev --name <migration-name>   # Apply schema changes
npx prisma generate                               # Regenerate client
npx prisma migrate reset                           # Reset DB (drops all data)
npx prisma studio                                  # Visual DB browser
```

---

## Auth

Auth uses **PASETO v4 tokens** through an internal abstraction layer.

```ts
import { getCurrentUser } from '@/lib/auth/getCurrentUser'
import { requireUser } from '@/lib/auth/getCurrentUser'

const user = await getCurrentUser()   // returns AuthUser | null
const user = await requireUser()      // throws if not authenticated
```

In development (`NODE_ENV=development`), a mock user is returned automatically so all features work without a real auth session.

---

## Routes

| Route | Description |
|---|---|
| `/` | Landing page / budget overview |
| `/login` | Login page |
| `/signup` | Signup page |
| `/trips` | List of your trips |
| `/trips/[tripId]/builder` | Drag-and-drop itinerary builder |
| `/trips/[tripId]/view` | Read-only timeline view with filters |
| `/search` | City and activity discovery |
| `/api/auth/login` | POST — login with email/password |
| `/api/auth/signup` | POST — register new user |

---

## Scripts

```bash
npm run dev          # Start development server (Turbopack)
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
```

---

## Future Modules

The architecture is designed to support:

- Budget analytics dashboard
- Packing checklist UI
- Public trip sharing via share tokens
- Notes / travel journal
- AI-powered recommendations
- Collaborative editing
- Admin analytics
- Saved destinations management

---

## License

[MIT](./LICENSE)
