# 🏢 Operations Core

Kumpulan 5 aplikasi backend API independen yang berbagi **1 database Neon PostgreSQL** yang sama, dengan tabel `users` yang di-share lintas app.

## Aplikasi

| App | Deskripsi | Port default | Admin default |
|---|---|---|---|
| `pineapple-stack/` | Forum diskusi | 3001 | admin@pineapplestack.com |
| `codigram/` | Media sosial | 3002 | admin@codigram.com |
| `m-ployee/` | Sistem informasi HR | 3003 | admin@mployee.com |
| `leather-shelf/` | Manajemen perpustakaan | 3004 | admin@leathershelf.com |
| `waretrack/` | Manajemen inventori gudang | 3005 | admin@waretrack.com |

Semua user seed pakai password **`123`**.

## Stack

NestJS + TypeScript + Prisma ORM + PostgreSQL (Neon) + JWT Auth + Swagger.

## Arsitektur

- **1 database fisik**, `schema.prisma` **identik checksum-nya** di kelima app (lihat `prisma/schema.prisma` masing-masing)
- **Tabel `users` di-share** — 1 akun bisa dipakai lintas app. Role global: `MEMBER` (default register) / `ADMIN`
- **Tabel `audit_logs` & `notifications` di-share** (generik, ada kolom `appType` buat audit log)
- Tabel domain masing-masing app (`threads`, `posts`, `products`, `books`, `employee_profiles`, dst) **tidak** di-share

## Menjalankan (per app)

```bash
cd <nama-app>
npm install
cp .env.example .env
# isi DATABASE_URL (Neon) - SAMA PERSIS di kelima app
# isi JWT_SECRET

npx prisma generate

# migration CUKUP dijalankan SEKALI dari salah satu app (misal pineapple-stack),
# app lain tinggal `prisma generate` aja (migration history-nya udah sama di DB yang sama)
npx prisma migrate dev --name init

npm run db:seed
npm run start:dev
npm run test
```

Swagger UI tersedia di `http://localhost:<port>/api` tiap app setelah `start:dev`.

## Catatan Migration

Karena kelima app connect ke database fisik yang sama:
1. Jalankan `npx prisma migrate dev --name init` **cuma dari satu app**
2. Copy folder `prisma/migrations/` yang dihasilkan ke keempat app lain (biar `schema.prisma` + migration history-nya tetap identik)
3. App lain cukup `npx prisma generate` (gak perlu migrate lagi, tabelnya udah ada di database yang sama)
