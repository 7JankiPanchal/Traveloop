# Suggested Tech Stack

| Layer            | Choice                | Rationale                                      |
| ---------------- | --------------------- | ---------------------------------------------- |
| Frontend         | NEXT JS               | Fast setup, wide ecosystem                     |
| Styling          | Tailwind CSS          | Utility-first, no design system overhead       |
| State management | React Query           | Server-state caching, automatic refetch        |
| Backend          | Node.js + Express     | Simple REST setup, large ecosystem             |
| ORM              | Prisma                | Type-safe queries, schema migrations, great DX |
| Database         | PostgreSQL            | Full relational support, UUID native           |
| Auth             | PASETO + bcrypt       | Secure, platform-agnostic, stateless tokens    |
| File storage     | Cloudinary / Supabase | Cover photo and avatar uploads                 |
| Charts           | Recharts              | Lightweight React chart library                |
