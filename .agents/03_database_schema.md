# Database Schema

## Entity Relationship Overview

The core chain is: `users → trips → stops → cities`. Activities are a catalogue tied to cities and attached to stops via a join table. All enrichment tables (notes, packing items, budget entries) hang off trips or stops.

```text
users
  └── trips
        ├── stops ──── cities ──── activities
        │     └── stop_activities (join)
        ├── packing_items
        ├── notes (also optionally per-stop)
        └── budget_entries (also optionally per-stop)

users ──── saved_destinations ──── cities
```

## Table Definitions

### `users`

- `id`: `uuid` (PK)
- `email`: `varchar(255)` (Unique)
- `password_hash`: `text`
- `name`: `varchar(100)`
- `avatar_url`: `text`
- `language`: `varchar(10)`
- `created_at`: `timestamptz`
- `updated_at`: `timestamptz`

### `trips`

- `id`: `uuid` (PK)
- `user_id`: `uuid` (FK → `users.id`)
- `title`: `varchar(200)`
- `description`: `text`
- `cover_photo_url`: `text`
- `start_date`: `date`
- `end_date`: `date`
- `budget_limit`: `numeric(10,2)`
- `share_token`: `varchar(64)` (Unique)
- `is_public`: `boolean`

### `cities`

- `id`: `uuid` (PK)
- `name`: `varchar(100)`
- `country`: `varchar(100)`
- `region`: `varchar(100)`
- `cost_index`: `numeric(5,2)`
- `popularity_score`: `integer`
- `cover_photo_url`: `text`

### `stops`

- `id`: `uuid` (PK)
- `trip_id`: `uuid` (FK → `trips.id`)
- `city_id`: `uuid` (FK → `cities.id`)
- `sort_order`: `integer`
- `arrive_date`: `date`
- `depart_date`: `date`

### `activities`

- `id`: `uuid` (PK)
- `city_id`: `uuid` (FK → `cities.id`)
- `name`: `varchar(200)`
- `description`: `text`
- `category`: `varchar(50)`
- `base_cost`: `numeric(8,2)`
- `duration_minutes`: `integer`
- `image_url`: `text`

### `stop_activities`

- `id`: `uuid` (PK)
- `stop_id`: `uuid` (FK → `stops.id`)
- `activity_id`: `uuid` (FK → `activities.id`)
- `scheduled_date`: `date`
- `scheduled_time`: `time`
- `cost_override`: `numeric(8,2)`

### `packing_items`

- `id`: `uuid` (PK)
- `trip_id`: `uuid` (FK → `trips.id`)
- `label`: `varchar(200)`
- `category`: `varchar(50)`
- `is_packed`: `boolean`

### `notes`

- `id`: `uuid` (PK)
- `trip_id`: `uuid` (FK → `trips.id`)
- `stop_id`: `uuid` (FK → `stops.id`, nullable)
- `body`: `text`

### `budget_entries`

- `id`: `uuid` (PK)
- `trip_id`: `uuid` (FK → `trips.id`)
- `stop_id`: `uuid` (FK → `stops.id`, nullable)
- `category`: `varchar(50)`
- `label`: `varchar(200)`
- `amount`: `numeric(10,2)`
- `recorded_at`: `timestamptz`

### `saved_destinations`

- `id`: `uuid` (PK)
- `user_id`: `uuid` (FK → `users.id`)
- `city_id`: `uuid` (FK → `cities.id`)

---

## SQL Create Statements

```sql
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

CREATE TABLE users (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email         VARCHAR(255) UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  name          VARCHAR(100) NOT NULL,
  avatar_url    TEXT,
  language      VARCHAR(10) NOT NULL DEFAULT 'en',
  created_at    TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at    TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE cities (
  id               UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name             VARCHAR(100) NOT NULL,
  country          VARCHAR(100) NOT NULL,
  region           VARCHAR(100),
  cost_index       NUMERIC(5,2),
  popularity_score INTEGER NOT NULL DEFAULT 0,
  cover_photo_url  TEXT
);

CREATE TABLE trips (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id         UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  title           VARCHAR(200) NOT NULL,
  description     TEXT,
  cover_photo_url TEXT,
  start_date      DATE,
  end_date        DATE,
  budget_limit    NUMERIC(10,2),
  share_token     VARCHAR(64) UNIQUE,
  is_public       BOOLEAN NOT NULL DEFAULT false,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX idx_trips_user_id ON trips(user_id);

CREATE TABLE stops (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  trip_id     UUID NOT NULL REFERENCES trips(id) ON DELETE CASCADE,
  city_id     UUID NOT NULL REFERENCES cities(id),
  sort_order  INTEGER NOT NULL,
  arrive_date DATE,
  depart_date DATE,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (trip_id, sort_order)
);
CREATE INDEX idx_stops_trip_id ON stops(trip_id);

CREATE TABLE activities (
  id               UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  city_id          UUID NOT NULL REFERENCES cities(id),
  name             VARCHAR(200) NOT NULL,
  description      TEXT,
  category         VARCHAR(50),
  base_cost        NUMERIC(8,2),
  duration_minutes INTEGER,
  image_url        TEXT
);
CREATE INDEX idx_activities_city_id ON activities(city_id);

CREATE TABLE stop_activities (
  id             UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  stop_id        UUID NOT NULL REFERENCES stops(id) ON DELETE CASCADE,
  activity_id    UUID NOT NULL REFERENCES activities(id),
  scheduled_date DATE,
  scheduled_time TIME,
  cost_override  NUMERIC(8,2),
  UNIQUE (stop_id, activity_id)
);
CREATE INDEX idx_stop_activities_stop_id ON stop_activities(stop_id);

CREATE TABLE packing_items (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  trip_id    UUID NOT NULL REFERENCES trips(id) ON DELETE CASCADE,
  label      VARCHAR(200) NOT NULL,
  category   VARCHAR(50),
  is_packed  BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX idx_packing_items_trip_id ON packing_items(trip_id);

CREATE TABLE notes (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  trip_id    UUID NOT NULL REFERENCES trips(id) ON DELETE CASCADE,
  stop_id    UUID REFERENCES stops(id) ON DELETE CASCADE,
  body       TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX idx_notes_trip_id ON notes(trip_id);

CREATE TABLE budget_entries (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  trip_id     UUID NOT NULL REFERENCES trips(id) ON DELETE CASCADE,
  stop_id     UUID REFERENCES stops(id) ON DELETE SET NULL,
  category    VARCHAR(50) NOT NULL,
  label       VARCHAR(200) NOT NULL,
  amount      NUMERIC(10,2) NOT NULL,
  recorded_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX idx_budget_entries_trip_id ON budget_entries(trip_id);

CREATE TABLE saved_destinations (
  id       UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id  UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  city_id  UUID NOT NULL REFERENCES cities(id),
  saved_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (user_id, city_id)
);
CREATE INDEX idx_saved_destinations_user_id ON saved_destinations(user_id);
```
