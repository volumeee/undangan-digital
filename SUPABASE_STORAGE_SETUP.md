# Supabase Storage Setup Guide

## Overview

Storage policies are NOT included in database migrations because they use Supabase-specific SQL extensions. You must configure them manually via Supabase Dashboard.

## Setup Steps

### 1. Create Storage Bucket

1. **Login to Supabase Dashboard:**
   - Go to: https://app.supabase.com/
   - Select your project: `nodqmccxdjtjcmbpreaq`

2. **Navigate to Storage:**
   - Click **Storage** in the sidebar
   - Click **Create a new bucket**

3. **Create "invitations" Bucket:**
   - Bucket name: `invitations`
   - Public bucket: **No** (we'll use RLS policies)
   - Click **Create bucket**

### 2. Configure Storage Policies

#### Policy 1: Users can upload to their own invitation folders

1. Click on the **invitations** bucket
2. Click **Policies** tab
3. Click **New policy**
4. Select **For full customization**
5. Configure:
   - **Policy name:** `Users can upload to their own invitation folders`
   - **Allowed operation:** `INSERT`
   - **Policy definition:**
     ```sql
     ((auth.role() = 'authenticated'::text) AND 
      ((storage.foldername(name))[1] IN 
       (SELECT invitations.slug::text 
        FROM invitations 
        WHERE (invitations.owner_id = auth.uid()))))
     ```
6. Click **Review** > **Save policy**

#### Policy 2: Users can view their own invitation files

1. Click **New policy**
2. Select **For full customization**
3. Configure:
   - **Policy name:** `Users can view their own invitation files`
   - **Allowed operation:** `SELECT`
   - **Policy definition:**
     ```sql
     ((auth.role() = 'authenticated'::text) AND 
      ((storage.foldername(name))[1] IN 
       (SELECT invitations.slug::text 
        FROM invitations 
        WHERE (invitations.owner_id = auth.uid()))))
     ```
4. Click **Review** > **Save policy**

#### Policy 3: Public access to published invitation files

1. Click **New policy**
2. Select **For full customization**
3. Configure:
   - **Policy name:** `Public access to published invitation files`
   - **Allowed operation:** `SELECT`
   - **Policy definition:**
     ```sql
     ((storage.foldername(name))[1] IN 
      (SELECT invitations.slug::text 
       FROM invitations 
       WHERE (invitations.status = ANY (ARRAY['published'::text, 'paid'::text]))))
     ```
4. Click **Review** > **Save policy**

### 3. Verify Setup

1. **Check Bucket:**
   - Storage > invitations bucket should exist
   - Should be Private (not Public)

2. **Check Policies:**
   - Should have 3 policies configured
   - Policies should show as "Active"

### 4. Test Upload (Optional)

You can test file upload from your application:

```javascript
// Example upload code
const { data, error } = await supabase
  .storage
  .from('invitations')
  .upload(`${invitationSlug}/photo.jpg`, file)

if (error) {
  console.error('Upload failed:', error)
} else {
  console.log('Upload success:', data)
}
```

## Storage Structure

Files should be organized by invitation slug:

```
invitations/
├── wedding-john-jane-2024/
│   ├── bride-photo.jpg
│   ├── groom-photo.jpg
│   ├── gallery-1.jpg
│   ├── gallery-2.jpg
│   └── gallery-3.jpg
├── engagement-mike-sarah-2024/
│   ├── couple-photo.jpg
│   └── gallery-1.jpg
└── ...
```

## Troubleshooting

### Error: "new row violates row-level security policy"

❌ **Cause:** Storage policies not configured

✅ **Solution:** Follow setup steps above to create all 3 policies

### Error: "Bucket not found"

❌ **Cause:** Bucket not created

✅ **Solution:** Create "invitations" bucket in Supabase Dashboard

### Files Not Accessible

❌ **Cause:** Incorrect policy configuration

✅ **Solution:** 
1. Check policy SQL syntax
2. Verify bucket is private (not public)
3. Ensure policies are Active

## Important Notes

- ⚠️ Storage policies CANNOT be created via SQL migrations
- ⚠️ They must be configured via Supabase Dashboard
- ✅ Policies are applied automatically after creation
- ✅ Files are stored in Supabase's object storage (AWS S3)
- ✅ Public URLs available for published invitations

## File Size Limits

Default Supabase limits:
- Max file size: **50 MB** per file
- Max upload size: **50 MB** per request
- Storage quota: **1 GB** (free tier)

To increase limits: Upgrade to Pro plan

---

**Setup storage policies via Supabase Dashboard to enable file uploads in your application!** 📤
