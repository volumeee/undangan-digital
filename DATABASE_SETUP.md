# Database Setup Guide

## Migration & Seeder Overview

Project ini menggunakan PostgreSQL via Supabase dengan migration dan seeder otomatis di GitHub Actions.

## Environment Variables Required

### For GitHub Actions:

| Variable | Description | Required |
|----------|-------------|----------|
| `DATABASE_URL` | PostgreSQL connection URI | ✅ **YES** |
| `SUPABASE_URL` | Supabase project URL (for app runtime) | ✅ YES |
| `SUPABASE_KEY` | Supabase anon key (for app runtime) | ✅ YES |
| `SUPABASE_SERVICE_KEY` | Service role key (for server API) | ✅ YES |

### Getting Database Credentials:

1. **Login to Supabase Dashboard:**
   - Go to: https://app.supabase.com/
   - Select your project

2. **Get DATABASE_URL:**
   - Click **Settings** (gear icon) > **Database**
   - Scroll to **Connection string**
   - Select **URI** tab
   - Copy the connection string (format: `postgresql://postgres.xxxxx:[YOUR-PASSWORD]@host:port/postgres`)
   - Replace `[YOUR-PASSWORD]` with your actual database password
   - Example: `postgresql://postgres.nodqmccxdjtjcmbpreaq:undangan123@aws-1-ap-southeast-1.pooler.supabase.com:6543/postgres`

3. **Get SUPABASE_URL and Keys:**
   - Click **Settings** > **API**
   - Copy:
     - **Project URL** → `SUPABASE_URL`
     - **anon public** → `SUPABASE_KEY`
     - **service_role** → `SUPABASE_SERVICE_KEY`

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
DATABASE_URL = postgresql://postgres.nodqmccxdjtjcmbpreaq:undangan123@aws-1-ap-southeast-1.pooler.supabase.com:6543/postgres
SUPABASE_URL = https://nodqmccxdjtjcmbpreaq.supabase.co
SUPABASE_KEY = eyJhbGciOiJIUzI1NiIs... (your anon key)
SUPABASE_SERVICE_KEY = eyJhbGciOiJIUzI1NiIs... (your service key)
```

⚠️ **IMPORTANT:** Change password `undangan123` to your actual database password!

## Troubleshooting

### Error: "password authentication failed"

❌ **Cause:** Wrong password in `DATABASE_URL`

✅ **Solution:**
1. Go to Supabase Dashboard > Settings > Database
2. Click **Reset database password** if you forgot
3. Copy new password
4. Update `DATABASE_URL` in GitHub Secrets with new password

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
# Set environment variable
export DATABASE_URL="postgresql://postgres.nodqmccxdjtjcmbpreaq:undangan123@aws-1-ap-southeast-1.pooler.supabase.com:6543/postgres"

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
