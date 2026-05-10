# Architecture

Traveloop follows a standard three-layer architecture:

```text
Client (Web / Mobile)
        │
        ▼
REST API (backend server)
        │
        ▼
Relational Database (PostgreSQL)
```

## Architecture Details

### Frontend

A single-page application (SPA) or React Native app consuming the REST API. All navigation is client-side. Protected routes redirect unauthenticated users to the login screen.

The platform must support:

- Authenticated multi-user access with personal trip data
- Relational storage of trips, stops, cities, activities, budgets, notes, and checklists
- Dynamic interfaces that adapt to each user's trip structure
- Public sharing of itineraries via tokenised URLs
- Cost aggregation and visual breakdown by category

### Backend

A stateless REST API server. Each request is authenticated via a JWT bearer token (except public shared itinerary endpoints, which use a share token). Business logic lives here — cost aggregation, budget alerts, and share token generation all happen server-side.

### Database

PostgreSQL with UUID primary keys throughout. All foreign keys are indexed. Soft deletes are not used — hard deletes are fine for this scope, but cascade rules must be set correctly (deleting a trip cascades to stops, activities, notes, checklist items, and budget entries).
