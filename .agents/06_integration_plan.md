# Integration Plan by Phase

### Phase 1 — Auth (Week 1)
Deliverables: `users` table, `POST /auth/*` endpoints, JWT middleware, Login/Signup screen.
- Nothing else can be built until auth exists.
- Write integration tests for the token flow.

### Phase 2 — Core trip flow (Week 1–2)
Deliverables: `trips`, `stops`, `cities` tables, all `/trips` and `/stops` endpoints, Dashboard, Create Trip, My Trips, Itinerary Builder, Itinerary View screens.
- Seed the `cities` table with at least 50 cities early.
- Reordering logic for `sort_order` is high priority.

### Phase 3 — Discovery (Week 2)
Deliverables: `activities` table, `/cities` search endpoint, `/activities` search endpoint, City Search and Activity Search screens.
- Build as modal flows returning selection where possible.

### Phase 4 — Enrichment (Week 2–3)
Deliverables: `budget_entries`, `packing_items`, `notes`, `saved_destinations` tables, all related endpoints, Budget, Packing, Notes, Shared View, Profile screens.
- Build and test server-side sum logic for budget first.

### Phase 5 — Admin (Week 3, optional)
Deliverables: Admin role on `users`, admin-only endpoints, Admin Dashboard screen.
- Pure read queries on existing data.
