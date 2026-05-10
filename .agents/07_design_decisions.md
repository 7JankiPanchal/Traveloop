# Key Design Decisions

### UUIDs over auto-increment integers
Used for all PKs to make IDs safe in URLs, avoid enumeration attacks, and simplify distributed sync.

### `share_token` on trips, not a separate table
Nullable column is simpler than a junction table. Revoking a share is a single update.

### `notes.stop_id` is nullable
One table handles both trip-level and stop-level notes. Null `stop_id` = trip-level.

### Budget is computed server-side
The API returns a fully aggregated object. Client renders charts directly, keeping logic centralized and testable.

### `sort_order` as an integer, not a linked list
Simple to query and read. Reordering requires multiple row updates but queries remain straightforward.

### Activities are a seeded catalogue
Users pick from high-quality seeded data rather than creating custom entries, ensuring better data consistency for the hackathon.
