# Non-Functional Requirements

### Authentication
- Passwords hashed with bcrypt (cost factor 12).
- JWTs expire after 7 days.
- All state-mutating endpoints require a valid JWT.

### Data Integrity
- `ON DELETE CASCADE` for trip-related entities.
- Unique index on `share_token`.
- `(trip_id, sort_order)` unique constraint for stops.
- `(stop_id, activity_id)` unique constraint for stop activities.
- `(user_id, city_id)` unique constraint for saved destinations.

### Performance
- Indexed foreign keys.
- Budget aggregation performed via single SQL query with `GROUP BY`.

### Error Handling
Consistent error shape:
```json
{
  "error": {
    "code": "ERROR_CODE",
    "message": "Human readable message"
  }
}
```
Standard HTTP status codes (400, 401, 403, 404, 500).
