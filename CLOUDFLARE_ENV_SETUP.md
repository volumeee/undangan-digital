# Setup Environment Variables untuk Cloudflare Pages

## ⚠️ PENTING: Masalah yang Diperbaiki

### Masalah:
- ❌ Error 400 Bad Request pada Supabase Auth
- ❌ Button "Daftar sekarang" tidak berfungsi
- ❌ Login/Register gagal

### Penyebab:
Environment variables tidak ter-set dengan benar di Cloudflare Pages

---

## 🔧 Cara Setup Environment Variables yang Benar

### 1. Buka Cloudflare Pages Settings

1. Login ke: https://dash.cloudflare.com/
2. Pilih account: **Bagus251001@gmail.com's Account**
3. Klik **Workers & Pages**
4. Klik project **undangan-digital**
5. Klik tab **Settings**
6. Scroll ke **Environment variables**

### 2. Tambahkan Environment Variables

**PENTING:** Gunakan nama variable yang PERSIS seperti di bawah!

#### For Production Environment:

| Variable Name | Value | Contoh |
|---------------|-------|--------|
| `SUPABASE_URL` | URL Supabase project Anda | `https://xxxxx.supabase.co` |
| `SUPABASE_KEY` | Anon/Public key dari Supabase | `eyJhbGciOiJIUzI1NiIsInR5cCI6...` |
| `SUPABASE_SERVICE_KEY` | Service role key (RAHASIA!) | `eyJhbGciOiJIUzI1NiIsInR5cCI6...` |
| `MIDTRANS_SERVER_KEY` | Server key Midtrans | `SB-Mid-server-xxx` |
| `MIDTRANS_CLIENT_KEY` | Client key Midtrans | `SB-Mid-client-xxx` |
| `FONNTE_API_KEY` | API key Fonnte WhatsApp | `your_fonnte_token` |
| `NODE_VERSION` | Versi Node.js | `20` |

#### For Preview Environment:

Tambahkan variable yang sama KECUALI:
- **Jangan** tambahkan `SUPABASE_SERVICE_KEY` (hanya untuk production)
- Bisa gunakan Midtrans Sandbox keys untuk testing

### 3. Cara Mendapatkan Supabase Credentials

1. **Login ke Supabase:**
   - Buka: https://app.supabase.com/
   - Pilih project Anda

2. **Dapatkan URL dan Keys:**
   - Klik **Settings** (icon gear di sidebar)
   - Klik **API**
   - Copy values:
     - **Project URL** → masukkan ke `SUPABASE_URL`
     - **anon public** key → masukkan ke `SUPABASE_KEY`
     - **service_role** key → masukkan ke `SUPABASE_SERVICE_KEY` (production only!)

### 4. Setup GitHub Secrets (Jika Belum)

Buka: https://github.com/volumeee/undangan-digital/settings/secrets/actions

Pastikan secrets ini ada:

| Secret Name | Value | Keterangan |
|-------------|-------|------------|
| `CLOUDFLARE_API_TOKEN` | Token dengan permission "Edit Cloudflare Workers" | Untuk deployment |
| `CLOUDFLARE_ACCOUNT_ID` | `a66e2a7351ca758a188de37b70556b23` | Account ID Anda |
| `SUPABASE_URL` | URL Supabase | Untuk build di GitHub Actions |
| `SUPABASE_KEY` | Anon key Supabase | ⚠️ Ganti dari `SUPABASE_ANON_KEY` |
| `SUPABASE_SERVICE_KEY` | Service key | Production only |
| `MIDTRANS_SERVER_KEY` | Midtrans server key | |
| `MIDTRANS_CLIENT_KEY` | Midtrans client key | |
| `FONNTE_API_KEY` | Fonnte API key | |

**CATATAN:** Jika sebelumnya Anda set `SUPABASE_ANON_KEY`, rename menjadi `SUPABASE_KEY`!

---

## 🔄 Deploy Ulang Setelah Setup

Setelah environment variables ter-set:

### Option 1: Via GitHub Actions (Recommended)

```bash
cd "/home/baguse/Documents/New Folder/undangan-digital"
git commit --allow-empty -m "Trigger redeploy with correct env vars"
git push origin main
```

### Option 2: Via Cloudflare Dashboard

1. Buka project **undangan-digital** di Cloudflare Pages
2. Klik tab **Deployments**
3. Klik **View details** pada deployment terakhir
4. Klik **Retry deployment**

---

## ✅ Verifikasi Setup Berhasil

Setelah deployment selesai:

1. **Buka aplikasi:** https://undangan-digital.pages.dev/login
2. **Test button "Daftar sekarang":**
   - Klik button → Harus redirect ke `/register`
3. **Test register:**
   - Isi form register
   - Klik "Daftar"
   - Harus berhasil tanpa error 400
4. **Test login:**
   - Masukkan email/password
   - Klik "Masuk"
   - Harus berhasil login ke dashboard

---

## 🐛 Troubleshooting

### Error: "Invalid API key" atau 400 Bad Request

❌ **Penyebab:** SUPABASE_URL atau SUPABASE_KEY salah/belum di-set

✅ **Solusi:**
1. Cek kembali Supabase credentials di https://app.supabase.com/
2. Pastikan copy paste dengan benar (tidak ada spasi)
3. Re-deploy setelah update env vars

### Error: Button "Daftar sekarang" tidak navigasi

❌ **Penyebab:** JavaScript error karena Supabase config salah

✅ **Solusi:**
1. Set environment variables yang benar
2. Re-deploy
3. Hard refresh browser (Ctrl + Shift + R)

### Error: "Auth session missing"

❌ **Penyebab:** Supabase Auth belum di-enable atau email confirmation required

✅ **Solusi:**
1. Buka Supabase Dashboard > Authentication > Settings
2. **Disable** "Confirm email" (untuk development)
3. Enable "Email provider"
4. Save settings

### Error Build di GitHub Actions

❌ **Penyebab:** GitHub Secrets salah atau belum di-set

✅ **Solusi:**
1. Cek GitHub Secrets: https://github.com/volumeee/undangan-digital/settings/secrets/actions
2. Pastikan `SUPABASE_KEY` ada (bukan `SUPABASE_ANON_KEY`)
3. Re-run workflow

---

## 📝 Checklist Setup

- [ ] Set `SUPABASE_URL` di Cloudflare Pages
- [ ] Set `SUPABASE_KEY` di Cloudflare Pages
- [ ] Set `SUPABASE_SERVICE_KEY` di Cloudflare Pages (Production only)
- [ ] Set Midtrans keys di Cloudflare Pages
- [ ] Set Fonnte API key di Cloudflare Pages
- [ ] Set `NODE_VERSION=20` di Cloudflare Pages
- [ ] Update GitHub Secrets (`SUPABASE_KEY` bukan `SUPABASE_ANON_KEY`)
- [ ] Deploy ulang aplikasi
- [ ] Test register baru
- [ ] Test login
- [ ] Verify button "Daftar sekarang" berfungsi

---

**Setelah semua checklist done, aplikasi akan berfungsi normal!** 🚀
