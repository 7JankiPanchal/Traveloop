<div align="center">
  <h1>🌍 Traveloop</h1>
  <p><strong>Personalized Travel Planning Made Easy</strong></p>

  <!-- Badges -->
  <p>
    <img src="https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=next.js" alt="Next.js" />
    <img src="https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript" alt="TypeScript" />
    <img src="https://img.shields.io/badge/Tailwind_CSS-v4-38B2AC?style=for-the-badge&logo=tailwind-css" alt="Tailwind CSS" />
    <img src="https://img.shields.io/badge/Prisma-7.0-2D3748?style=for-the-badge&logo=prisma" alt="Prisma" />
    <img src="https://img.shields.io/badge/PostgreSQL-Neon-336791?style=for-the-badge&logo=postgresql" alt="PostgreSQL" />
  </p>

  <p>
    <a href="#-problem-statement">Problem Statement</a> •
    <a href="#-key-features">Features</a> •
    <a href="#-tech-stack">Tech Stack</a> •
    <a href="#%EF%B8%8F-database-schema">Architecture & DB</a> •
    <a href="#-getting-started">Getting Started</a>
  </p>
</div>

---

## 🌟 Overall Vision & Mission

> **Vision:** To become a personalized, intelligent, and collaborative platform that transforms the way individuals plan and experience travel. We aim to empower users to dream, design, and organize trips with ease, combining flexibility and interactivity.

> **Mission:** To build a user-centric, responsive application that simplifies the complexity of planning multi-city travel. We provide travelers with intuitive tools to manage stops, explore activities, estimate budgets, visualize timelines, and seamlessly share plans.

---

## 💡 Problem Statement

Organizing a multi-city journey often involves juggling scattered spreadsheets, shared documents, and disconnected booking references. **Traveloop** solves this by providing a unified, end-to-end travel planning application.

Users can create customized multi-city itineraries, assign travel dates, activities, and budgets, discover destinations through an integrated search, receive automated cost breakdowns, and share their itineraries publicly or with friends. The platform leverages a robust relational database to handle complex travel data, ensuring dynamic, highly responsive user interfaces that adapt to each user's unique trip flow.

---

## ✨ Key Features

Traveloop is packed with comprehensive features tailored for the ultimate travel planning experience:

### 🔐 User & Community
- **Authentication**: Secure Login / Signup screen to manage personal travel plans.
- **User Profile**: Personalized settings to update information, preferences, and view saved destinations.
- **Dashboard**: A central hub showing upcoming trips, recommended destinations, and budget highlights.
- **Shared Itineraries**: Generate public, read-only URLs to share your travel plans. Visitors can even "Copy Trip" for inspiration.

### 🗺️ Trip Planning & Discovery
- **Create Trip**: Initialize a new journey with dates, descriptions, and cover photos.
- **City Search**: Integrated search to discover and add cities, displaying country info, cost indexes, and popularity.
- **Activity Search**: Browse curated things-to-do for each stop, filterable by interest, cost, and duration.
- **My Trips**: Dedicated list view of all created journeys with at-a-glance summaries.

### 📅 Organization & Logistics
- **Itinerary Builder**: Interactive drag-and-drop interface to add cities, allocate dates, and assign specific activities to each stop.
- **Timeline View**: Visual, day-by-day representation of the completed trip with activity blocks, times, and costs.
- **Trip Notes / Journal**: Contextual note-taking for storing hotel check-ins, local contacts, or day-specific reminders.
- **Packing Checklist**: A reusable, categorized per-trip checklist to ensure nothing is forgotten.

### 💰 Finance & Analytics
- **Budget & Cost Breakdown**: Automated financial summaries displaying total estimated costs, segmented by transport, stay, activities, and meals with intuitive charts.
- **Admin Dashboard**: Analytics interface to track platform usage, user trends, top destinations, and engagement stats.

---

## 🛠 Tech Stack

Our application is built on a modern, bleeding-edge web stack designed for performance, type safety, and scalability.

| Category | Technology | Description |
|---|---|---|
| **Frontend Framework** | **Next.js 16** | App Router, Turbopack, React Server Components |
| **Language** | **TypeScript 5** | Strict end-to-end type safety |
| **Styling** | **Tailwind CSS v4** | Utility-first CSS for rapid UI development |
| **Database** | **PostgreSQL (Neon)** | Serverless, highly scalable Postgres |
| **ORM** | **Prisma 7** | Type-safe database client (`@prisma/adapter-neon`) |
| **Authentication** | **PASETO v4** | Highly secure, stateless token authentication |
| **State & Forms** | **React Hook Form + Zod** | Robust form validation and state management |
| **Interactivity** | **@dnd-kit / Recharts** | Accessible drag-and-drop & dynamic data visualization |

---

## 🏗️ Architecture

Traveloop uses a modular, layered architecture separating UI components, Server Actions, Services, and the ORM layer.
- **Design Rule:** Prisma queries are completely isolated from React components. All mutations flow through secure Server Actions with strict authentication boundaries.

---

## 🗄️ Database Schema

The relational database is meticulously structured to efficiently handle multi-layered, multi-city travel plans.

```mermaid
erDiagram
    User ||--o{ Trip : creates
    User ||--o{ SavedDestination : saves
    Trip ||--o{ Stop : contains
    Trip ||--o{ BudgetEntry : tracks
    Trip ||--o{ PackingItem : requires
    Trip ||--o{ Note : has
    City ||--o{ Stop : "visited as"
    City ||--o{ Activity : offers
    Stop ||--o{ StopActivity : schedules
    Activity ||--o{ StopActivity : "included in"
```

### Core Data Models

| Model | Description |
|---|---|
| **`User`** | Platform users with authentication details and preferences. |
| **`Trip`** | The primary container holding budget limits, date ranges, and sharing settings. |
| **`Stop`** | A specific destination within a trip, maintaining chronological order via `sortOrder`. |
| **`Activity`** | Reusable points of interest or experiences associated with a `City`. |
| **`StopActivity`** | Junction table mapping `Activity` records to a `Stop`, including scheduled times and cost overrides. |
| **`City`** | Global destination metadata including cost indexes and cover photos. |

### Auxiliary Models

| Model | Description |
|---|---|
| **`BudgetEntry`** | Explicit expense tracking entries categorized by transport, accommodation, etc. |
| **`PackingItem`** | Checklist items for a trip with packed status toggles. |
| **`Note`** | Free-form journal entries or reminders linked to a trip or specific stop. |
| **`SavedDestination`**| Cities bookmarked by a user for future inspiration. |

*Mockup Reference: [Excalidraw Design File](https://link.excalidraw.com/l/65VNwvy7c4X/22o30WE3bE4)*

---

## 🚀 Getting Started

Follow these steps to run the project locally.

### 1. Prerequisites
- **Node.js** 18+
- **npm** (or pnpm/yarn)
- A **Neon PostgreSQL** database instance.

### 2. Clone & Install
```bash
git clone https://github.com/7JankiPanchal/Traveloop.git
cd Traveloop
npm install
```
*(Note: `npm install` runs `prisma generate` automatically via the `postinstall` script.)*

### 3. Environment Variables
Create a `.env` file in the project root:
```env
DATABASE_URL="postgresql://USER:PASSWORD@HOST/DBNAME?sslmode=require"
PASETO_PRIVATE_KEY="<base64-encoded-ed25519-private-key>"
PASETO_PUBLIC_KEY="<base64-encoded-ed25519-public-key>"
```

### 4. Database Setup
Apply migrations to construct the database schema:
```bash
npx prisma migrate dev
```

### 5. Run Development Server
Start the Turbopack development server:
```bash
npm run dev
```
Navigate to [http://localhost:3000](http://localhost:3000) to explore the application.

---

<div align="center">
  <p>Built with ❤️ for travelers everywhere.</p>
  <p>Licensed under <a href="./LICENSE">MIT</a></p>
</div>
