# Database Setup Guide

## Migration & Seeder Overview

Project ini menggunakan PostgreSQL via Supabase dengan migration dan seeder otomatis di GitHub Actions.

## Environment Variables Required

### For GitHub Actions:

| Variable | Description | Example |
|----------|-------------|---------|
| `SUPABASE_URL` | Supabase project URL | `https://xxxxx.supabase.co` |
| `SUPABASE_SERVICE_KEY` | Service role key (secret!) | `eyJhbGciOiJIUzI1NiIs...` |
| `DATABASE_PASSWORD` | PostgreSQL password | Same as service key or DB password |
| `DATABASE_URL` | Direct PostgreSQL connection (optional) | `postgresql://postgres:password@db.xxxxx.supabase.co:5432/postgres` |

### Getting Database Credentials:

1. **Login to Supabase Dashboard:**
   - Go to: https://app.supabase.com/
   - Select your project

2. **Get SUPABASE_URL and SUPABASE_SERVICE_KEY:**
   - Click **Settings** (gear icon)
   - Click **API**
   - Copy:
     - **Project URL** → `SUPABASE_URL`
     - **service_role** key → `SUPABASE_SERVICE_KEY`

3. **Get DATABASE_PASSWORD:**
   - Click **Settings** > **Database**
   - Copy **Database password** (you set this when creating project)
   - Or use `SUPABASE_SERVICE_KEY` as password

4. **Get DATABASE_URL (optional):**
   - Click **Settings** > **Database**
   - Under **Connection string** > **URI**
   - Copy the full connection string
   - Replace `[YOUR-PASSWORD]` with actual password

## NPM Scripts

```bash
# Run migration only
npm run db:migrate

# Run seeder only
npm run db:seed

# Run both migration and seeder
npm run db:setup
```

## Migration Files

Located in: `supabase/migrations/`

- `001_initial_schema.sql` - Creates all tables, indexes, RLS policies, functions

## Seed Files

Located in: `supabase/seed.sql`

- Contains sample data for development/testing
- **WARNING:** Seeder skipped in production unless `ALLOW_PRODUCTION_SEED=true`

## What Gets Created

### Tables:
- `profiles` - User profiles (extends auth.users)
- `invitations` - Digital invitation data
- `guests` - Guest lists for each invitation
- `guest_book` - Guest book messages/wishes
- `payments` - Payment transactions

### Features:
- ✅ Row Level Security (RLS) enabled on all tables
- ✅ Automatic `updated_at` triggers
- ✅ Unique guest link generation
- ✅ Storage policies for file uploads
- ✅ Indexes for performance

## GitHub Actions Workflow

Workflow automatically:
1. Runs `npm run db:migrate` on push to `main`
2. Runs `npm run db:seed` for development
3. Continues build even if migration/seed already applied

## Setup in GitHub Secrets

**URL:** https://github.com/volumeee/undangan-digital/settings/secrets/actions

Add these secrets:

```
SUPABASE_URL = https://xxxxx.supabase.co
SUPABASE_KEY = eyJhbGciOiJIUzI1NiIs... (anon key)
SUPABASE_SERVICE_KEY = eyJhbGciOiJIUzI1NiIs... (service key)
DATABASE_PASSWORD = your_database_password
DATABASE_URL = postgresql://postgres:password@db.xxxxx.supabase.co:5432/postgres (optional)
```

## Troubleshooting

### Error: "password authentication failed"

❌ **Cause:** Wrong `DATABASE_PASSWORD`

✅ **Solution:**
1. Go to Supabase Dashboard > Settings > Database
2. Click **Reset database password**
3. Copy new password
4. Update `DATABASE_PASSWORD` in GitHub Secrets

### Error: "could not connect to server"

❌ **Cause:** Wrong database host or firewall

✅ **Solution:**
1. Verify Supabase project is active
2. Check connection string format: `db.[PROJECT_REF].supabase.co:5432`
3. Ensure SSL is enabled in connection

### Error: "relation already exists"

✅ **OK!** This means migration already ran successfully before

### Seeding Fails with "duplicate key"

✅ **OK!** This means seed data already exists in database

## Manual Migration (Local)

```bash
# Set environment variables
export SUPABASE_URL="https://xxxxx.supabase.co"
export SUPABASE_SERVICE_KEY="your_service_key"
export DATABASE_PASSWORD="your_db_password"

# Run migration
npm run db:migrate

# Run seeder
npm run db:seed
```

## Production Considerations

- ⚠️ **Never** expose `SUPABASE_SERVICE_KEY` in client-side code
- ⚠️ Seeder is **disabled** in production by default
- ✅ Use `SUPABASE_KEY` (anon key) for client-side
- ✅ Use `SUPABASE_SERVICE_KEY` only in server-side code

## Database Schema Version Control

Migrations are version-controlled in Git:
- Add new migrations as `002_*.sql`, `003_*.sql`, etc.
- Never modify existing migrations
- Always test migrations in development first

---

**After setup, migrations and seeding will run automatically on every deployment!** 🚀
