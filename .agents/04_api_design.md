# API Design

All endpoints are prefixed with `/api`. Protected endpoints require a valid PASETO token in cookies or `Authorization: Bearer <token>`.

## 4.1 Auth

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/auth/signup` | Create account (using PASETO) |
| `POST` | `/api/auth/login` | Return PASETO token in cookie |
| `POST` | `/api/auth/logout` | Clear auth cookie |

## 4.2 Users

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/users/me` | Get own profile |
| `PATCH` | `/api/users/me` | Update name, avatar, language |
| `DELETE` | `/api/users/me` | Delete account (cascades everything) |
| `GET` | `/api/users/me/saved-destinations` | List saved cities |
| `POST` | `/api/users/me/saved-destinations` | Save a city |
| `DELETE` | `/api/users/me/saved-destinations/:cityId` | Unsave a city |

## 4.3 Trips

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/trips` | List current user's trips |
| `POST` | `/api/trips` | Create trip |
| `GET` | `/api/trips/:id` | Get trip (with stops, activities) |
| `PATCH` | `/api/trips/:id` | Update trip metadata |
| `DELETE` | `/api/trips/:id` | Delete trip |
| `POST` | `/api/trips/:id/share` | Generate `share_token`, set `is_public = true` |
| `DELETE` | `/api/trips/:id/share` | Revoke sharing |
| `GET` | `/api/shared/:shareToken` | Public — fetch read-only itinerary |

## 4.4 Stops

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/trips/:tripId/stops` | List stops in order |
| `POST` | `/api/trips/:tripId/stops` | Add a stop |
| `PATCH` | `/api/trips/:tripId/stops/:id` | Update dates or reorder |
| `DELETE` | `/api/trips/:tripId/stops/:id` | Remove stop |

## 4.5 Activities

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/cities/:cityId/activities` | Browse activities for a city |
| `GET` | `/api/stops/:stopId/activities` | List scheduled activities for a stop |
| `POST` | `/api/stops/:stopId/activities` | Add activity to stop |
| `PATCH` | `/api/stops/:stopId/activities/:id` | Update schedule or cost override |
| `DELETE` | `/api/stops/:stopId/activities/:id` | Remove from stop |

## 4.6 Discovery

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/cities` | Search cities (`?q=`, `?region=`, `?sort=popularity`) |
| `GET` | `/api/cities/:id` | City detail |
| `GET` | `/api/activities` | Search activities (`?cityId=`, `?category=`, `?maxCost=`) |

## 4.7 Budget

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/trips/:tripId/budget` | Aggregated cost breakdown by category |
| `POST` | `/api/trips/:tripId/budget` | Log a manual expense |
| `DELETE` | `/api/trips/:tripId/budget/:entryId` | Remove an entry |

## 4.8 Packing list

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/trips/:tripId/packing` | List all items |
| `POST` | `/api/trips/:tripId/packing` | Add item |
| `PATCH` | `/api/trips/:tripId/packing/:id` | Toggle `is_packed`, rename |
| `DELETE` | `/api/trips/:tripId/packing/:id` | Remove item |
| `DELETE` | `/api/trips/:tripId/packing` | Reset all |

## 4.9 Notes

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/trips/:tripId/notes` | All notes for trip (optionally `?stopId=`) |
| `POST` | `/api/trips/:tripId/notes` | Create note (pass `stop_id` for stop-level) |
| `PATCH` | `/api/trips/:tripId/notes/:id` | Edit note body |
| `DELETE` | `/api/trips/:tripId/notes/:id` | Delete note |
