# Screen-by-Screen Implementation

### Screen 1 — Login / Signup

**API calls:** `POST /auth/login`, `POST /auth/register`
**Components:** `AuthForm`, `InputField`, `SubmitButton`, `ErrorBanner`

### Screen 2 — Dashboard / Home

**API calls:** `GET /trips?limit=5&sort=created_at`, `GET /cities?sort=popularity&limit=6`
**Components:** `TripCard`, `CityCard`, `PlanNewTripButton`, `BudgetHighlightBadge`

### Screen 3 — Create Trip

**API calls:** `POST /trips`
**Components:** `TripForm`, `DateRangePicker`, `PhotoUpload`, `SaveButton`

### Screen 4 — My Trips

**API calls:** `GET /trips`, `DELETE /trips/:id`
**Components:** `TripList`, `TripCard`, `EmptyState`, `ConfirmDeleteModal`

### Screen 5 — Itinerary Builder

**API calls:** `GET /trips/:id`, `POST /trips/:tripId/stops`, `PATCH /trips/:tripId/stops/:id`, `DELETE /trips/:tripId/stops/:id`
**Components:** `StopList`, `StopCard`, `AddStopButton`, `CitySearchModal`, `ActivityAssigner`, `DatePicker`

### Screen 6 — Itinerary View

**API calls:** `GET /trips/:id`
**Components:** `ItineraryViewToggle`, `DayGroup`, `ActivityBlock`, `CityHeader`

### Screen 7 — City Search

**API calls:** `GET /cities?q=:query&region=:region`
**Components:** `SearchInput`, `CityList`, `CityRow`, `AddToTripButton`, `RegionFilter`

### Screen 8 — Activity Search

**API calls:** `GET /activities?cityId=:id&category=:cat&maxCost=:n`
**Components:** `FilterChips`, `ActivityCard`, `AddButton`, `ActivityDetailSheet`

### Screen 9 — Budget & Cost Breakdown

**API calls:** `GET /trips/:tripId/budget`, `POST /trips/:tripId/budget`, `DELETE /trips/:tripId/budget/:id`
**Components:** `BudgetSummaryCard`, `CategoryBreakdownChart`, `DailyAverageRow`, `ManualEntryForm`, `OverBudgetAlert`

### Screen 10 — Packing Checklist

**API calls:** `GET /trips/:tripId/packing`, `POST /trips/:tripId/packing`, `PATCH /trips/:tripId/packing/:id`, `DELETE /trips/:tripId/packing`, `DELETE /trips/:tripId/packing/:id`
**Components:** `CategoryGroup`, `ChecklistItem`, `AddItemInput`, `CategoryBadge`, `ResetButton`

### Screen 11 — Shared / Public Itinerary View

**API calls:** `GET /shared/:shareToken`
**Components:** `PublicItineraryHeader`, `ReadOnlyStopList`, `CopyTripButton`, `ShareButtons`

### Screen 12 — User Profile / Settings

**API calls:** `GET /users/me`, `PATCH /users/me`, `DELETE /users/me`, `GET /users/me/saved-destinations`
**Components:** `ProfileForm`, `AvatarUpload`, `LanguagePicker`, `SavedDestinationsList`, `DeleteAccountButton`

### Screen 13 — Trip Notes / Journal

**API calls:** `GET /trips/:tripId/notes`, `POST /trips/:tripId/notes`, `PATCH /trips/:tripId/notes/:id`, `DELETE /trips/:tripId/notes/:id`
**Components:** `NoteList`, `NoteCard`, `NoteEditor`, `ScopeSelector`

### Screen 14 — Admin Dashboard (optional)

**API calls:** `GET /admin/stats`, `GET /admin/cities/top`, `GET /admin/activities/top`, `GET /admin/users`
**Components:** `StatCard`, `TopCitiesTable`, `UserManagementTable`, `TrendsChart`
