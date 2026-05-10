# API Design

All endpoints are prefixed with `/api/v1`. Protected endpoints require `Authorization: Bearer <token>`.

### 4.1 Auth
| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/auth/register` | Create account |
| `POST` | `/auth/login` | Return JWT |
| `POST` | `/auth/forgot-password` | Send reset email |
| `POST` | `/auth/reset-password` | Apply new password |

### 4.2 Users
| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/users/me` | Get own profile |
| `PATCH` | `/users/me` | Update name, avatar, language |
| `DELETE` | `/users/me` | Delete account (cascades everything) |
| `GET` | `/users/me/saved-destinations` | List saved cities |
| `POST` | `/users/me/saved-destinations` | Save a city |
| `DELETE` | `/users/me/saved-destinations/:cityId` | Unsave a city |

### 4.3 Trips
| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/trips` | List current user's trips |
| `POST` | `/trips` | Create trip |
| `GET` | `/trips/:id` | Get trip (with stops, activities) |
| `PATCH` | `/trips/:id` | Update trip metadata |
| `DELETE` | `/trips/:id` | Delete trip |
| `POST` | `/trips/:id/share` | Generate `share_token`, set `is_public = true` |
| `DELETE` | `/trips/:id/share` | Revoke sharing |
| `GET` | `/shared/:shareToken` | Public — fetch read-only itinerary |

### 4.4 Stops
| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/trips/:tripId/stops` | List stops in order |
| `POST` | `/trips/:tripId/stops` | Add a stop |
| `PATCH` | `/trips/:tripId/stops/:id` | Update dates or reorder |
| `DELETE` | `/trips/:tripId/stops/:id` | Remove stop |

### 4.5 Activities
| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/cities/:cityId/activities` | Browse activities for a city |
| `GET` | `/stops/:stopId/activities` | List scheduled activities for a stop |
| `POST` | `/stops/:stopId/activities` | Add activity to stop |
| `PATCH` | `/stops/:stopId/activities/:id` | Update schedule or cost override |
| `DELETE` | `/stops/:stopId/activities/:id` | Remove from stop |

### 4.6 Discovery
| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/cities` | Search cities (`?q=`, `?region=`, `?sort=popularity`) |
| `GET` | `/cities/:id` | City detail |
| `GET` | `/activities` | Search activities (`?cityId=`, `?category=`, `?maxCost=`) |

### 4.7 Budget
| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/trips/:tripId/budget` | Aggregated cost breakdown by category |
| `POST` | `/trips/:tripId/budget` | Log a manual expense |
| `DELETE` | `/trips/:tripId/budget/:entryId` | Remove an entry |

### 4.8 Packing list
| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/trips/:tripId/packing` | List all items |
| `POST` | `/trips/:tripId/packing` | Add item |
| `PATCH` | `/trips/:tripId/packing/:id` | Toggle `is_packed`, rename |
| `DELETE` | `/trips/:tripId/packing/:id` | Remove item |
| `DELETE` | `/trips/:tripId/packing` | Reset all |

### 4.9 Notes
| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/trips/:tripId/notes` | All notes for trip (optionally `?stopId=`) |
| `POST` | `/trips/:tripId/notes` | Create note (pass `stop_id` for stop-level) |
| `PATCH` | `/trips/:tripId/notes/:id` | Edit note body |
| `DELETE` | `/trips/:tripId/notes/:id` | Delete note |
