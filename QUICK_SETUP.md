# 🚀 Quick Setup - Database Migration

## ⚠️ URGENT: Add GitHub Secret

Migration will **FAIL** without this secret!

### 1. Add DATABASE_URL to GitHub Secrets

**Go to:** https://github.com/volumeee/undangan-digital/settings/secrets/actions

**Click:** "New repository secret"

**Name:** `DATABASE_URL`

**Value:** 
```
postgresql://postgres.nodqmccxdjtjcmbpreaq:undangan123@aws-1-ap-southeast-1.pooler.supabase.com:6543/postgres
```

⚠️ **Replace `undangan123` with your actual database password!**

### 2. Verify Other Secrets Exist

Make sure these secrets are also set:

- ✅ `SUPABASE_URL` = `https://nodqmccxdjtjcmbpreaq.supabase.co`
- ✅ `SUPABASE_KEY` = your anon key
- ✅ `SUPABASE_SERVICE_KEY` = your service role key
- ✅ `CLOUDFLARE_API_TOKEN` = your Cloudflare API token
- ✅ `CLOUDFLARE_ACCOUNT_ID` = `a66e2a7351ca758a188de37b70556b23`
- ✅ `MIDTRANS_SERVER_KEY` = your Midtrans server key
- ✅ `MIDTRANS_CLIENT_KEY` = your Midtrans client key
- ✅ `FONNTE_API_KEY` = your Fonnte API key

### 3. Monitor Deployment

After adding the secret, GitHub Actions will run automatically.

**Check status:** https://github.com/volumeee/undangan-digital/actions

Expected workflow:
1. ✅ Install dependencies
2. ✅ Run linting
3. ✅ Type checking
4. ✅ **Run database migrations** ← NEW!
5. ✅ **Seed database** ← NEW!
6. ✅ Build application
7. ✅ Create Cloudflare Pages project
8. ✅ Deploy to Cloudflare

### 4. If Migration Succeeds

You'll see:
```
🚀 Starting database migration...
📡 Connecting to database...
✅ Connected to database
📄 Running migration: 001_initial_schema.sql
✅ Migration completed successfully!

🌱 Starting database seeding...
   Environment: development
📡 Connecting to database...
✅ Connected to database
📄 Running seed: seed.sql
✅ Seeding completed successfully!
```

### 5. What Gets Created

The migration creates:
- ✅ `profiles` table - User profiles
- ✅ `invitations` table - Digital invitations
- ✅ `guests` table - Guest lists
- ✅ `guest_book` table - Guest book messages
- ✅ `payments` table - Payment transactions
- ✅ RLS policies for security
- ✅ Indexes for performance
- ✅ Triggers for auto-updates
- ✅ Storage policies for uploads

The seeder adds sample data for testing.

---

## 🔥 Current Status

GitHub Actions is now running: https://github.com/volumeee/undangan-digital/actions

**It will fail if `DATABASE_URL` secret is not set!**

**Add the secret NOW to fix the deployment.** ⬆️
