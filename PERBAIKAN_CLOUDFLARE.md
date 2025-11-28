# Panduan Perbaikan Cloudflare Pages - LENGKAP

## ✅ Yang Sudah Diperbaiki Otomatis

1. ✅ GitHub Actions workflow - sudah diupdate ke `dist`
2. ✅ Dokumentasi setup sudah diperbarui

## ⚠️ Yang Harus Diperbaiki Manual di Dashboard Cloudflare

### Langkah 1: Perbaiki Root Directory (PALING PENTING!)

**Masalah:** Root directory saat ini adalah `/dist` - INI SALAH!

**Solusi:**
1. Buka browser, login ke [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. Klik **Workers & Pages** di menu kiri
3. Pilih project **undangan-digital**
4. Klik tab **Settings**
5. Scroll ke section **Build & deployments**
6. Di bagian **Build configuration**, cari **Root directory**
7. **Ubah dari `/dist` menjadi `/`** atau **kosongkan**
8. Pastikan **Build output directory** tetap `dist`
9. Klik **Save**

**Setting yang benar:**
```
Root directory:          /  (atau kosong)
Build command:           npm run build
Build output directory:  dist
Deploy command:          npm run deploy
```

---

### Langkah 2: Regenerate Build Token

**Masalah:** Build token sudah dihapus atau expired

**Solusi:**
1. Masih di halaman **Settings** → **Build & deployments**
2. Scroll ke bagian **Worker Builds** atau **Build token**
3. Klik tombol **Regenerate token** atau **Create new token**
4. Token akan otomatis tersimpan (tidak perlu copy-paste)
5. Klik **Save** jika ada

---

### Langkah 3: Regenerate API Token (KEAMANAN!)

**Masalah:** API token `wtT32bhOAuKHPUJ89Mx8GauQY2sY0unsxoPMLlY8` sudah terekspos publik, harus diganti!

**Solusi A: Hapus Token Lama**
1. Buka [Cloudflare API Tokens](https://dash.cloudflare.com/profile/api-tokens)
2. Cari token lama yang terekspos
3. Klik **Roll** atau **Delete** pada token tersebut
4. Konfirmasi penghapusan

**Solusi B: Buat Token Baru dengan Permissions yang Benar**
1. Di halaman yang sama, klik **Create Token**
2. Pilih template **"Edit Cloudflare Pages"**
3. Atau buat **Custom token** dengan permission:
   - **Account** → **Cloudflare Pages** → **Edit**
   - **Account** → **Account Settings** → **Read** (opsional)
4. Klik **Continue to summary**
5. Klik **Create Token**
6. **PENTING:** Copy token yang muncul (hanya muncul sekali!)

**Solusi C: Simpan Token Baru ke Environment Variables**
1. Kembali ke **Workers & Pages** → **undangan-digital**
2. Klik tab **Settings**
3. Scroll ke **Environment variables**
4. Cari `CLOUDFLARE_API_TOKEN` (jika ada, edit; jika tidak, add variable)
5. Paste token baru yang tadi dicopy
6. Pilih environment: **Production** dan **Preview**
7. Klik **Save**

---

### Langkah 4: Setting Environment Variables Lainnya

Pastikan semua environment variables sudah diset (untuk Production dan Preview):

**Required variables:**
```
NUXT_PUBLIC_SUPABASE_URL       = [URL Supabase project Anda]
NUXT_PUBLIC_SUPABASE_KEY       = [Anon key dari Supabase]
SUPABASE_SERVICE_KEY           = [Service role key - PRODUCTION ONLY!]
MIDTRANS_SERVER_KEY            = [Server key dari Midtrans]
MIDTRANS_CLIENT_KEY            = [Client key dari Midtrans]
FONNTE_API_KEY                 = [API key dari Fonnte]
CLOUDFLARE_API_TOKEN           = [Token yang baru dibuat]
```

**Cara setting:**
1. Di **Settings** → **Environment variables**
2. Klik **Add variable**
3. Masukkan **Variable name** dan **Value**
4. Pilih environment (Production/Preview atau keduanya)
5. Klik **Save**
6. Ulangi untuk setiap variable

---

### Langkah 5: Retry Deployment

Setelah semua diperbaiki:

1. Kembali ke tab **Deployments**
2. Cari deployment yang gagal terakhir
3. Klik **View details** → **Retry deployment**
4. Atau push commit baru ke GitHub untuk trigger build baru

---

## 📋 Checklist Akhir

Sebelum retry deployment, pastikan:

- [ ] Root directory sudah diubah ke `/` atau kosong (bukan `/dist`)
- [ ] Build output directory adalah `dist`
- [ ] Build token sudah di-regenerate
- [ ] API token lama sudah dihapus
- [ ] API token baru sudah dibuat dengan permission "Edit Cloudflare Pages"
- [ ] API token baru sudah disimpan di Environment variables
- [ ] Semua environment variables (Supabase, Midtrans, Fonnte) sudah diset

---

## 🚀 Alternatif: Deploy via GitHub Actions

Jika ingin deploy otomatis dari GitHub (lebih mudah):

### Setup GitHub Secrets

1. Buka repository GitHub: [volumeee/undangan-digital](https://github.com/volumeee/undangan-digital)
2. Klik **Settings** → **Secrets and variables** → **Actions**
3. Klik **New repository secret** untuk setiap secret berikut:

**Secrets yang dibutuhkan:**
```
CLOUDFLARE_API_TOKEN           = [Token baru dengan Edit Pages permission]
CLOUDFLARE_ACCOUNT_ID          = a66e2a7351ca758a188de37b70556b23
SUPABASE_URL                   = [URL Supabase Anda]
SUPABASE_ANON_KEY              = [Anon key Supabase]
SUPABASE_SERVICE_KEY           = [Service key Supabase]
MIDTRANS_SERVER_KEY            = [Midtrans server key]
MIDTRANS_CLIENT_KEY            = [Midtrans client key]
FONNTE_API_KEY                 = [Fonnte API key]
```

4. Setelah selesai, setiap push ke branch `main` akan otomatis build & deploy!

---

## ❓ Butuh Bantuan?

Jika masih error setelah mengikuti semua langkah:

1. Copy **full error message** dari Cloudflare Pages deployment log
2. Screenshot halaman **Build settings** Anda
3. Paste error dan share screenshot untuk diagnosis lebih lanjut

---

**Dibuat:** 2025-11-28
**Update terakhir:** Setelah fix GitHub Actions workflow
