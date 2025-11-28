# Deployment Checklist

## Prerequisites

### 1. Supabase Setup
- [ ] Create Supabase project
- [ ] Run migrations: `supabase db push`
- [ ] Run seed data: `supabase db seed`
- [ ] Configure storage policies
- [ ] Enable Row Level Security
- [ ] Get project URL and keys

### 2. Midtrans Configuration
- [ ] Create Midtrans account
- [ ] Configure Snap API
- [ ] Get server key and client key
- [ ] Set webhook URL: `https://your-domain.com/api/payment/notification`

### 3. WhatsApp Gateway (Fonnte)
- [ ] Register Fonnte account
- [ ] Get API key
- [ ] Configure webhook if needed

### 4. Environment Variables
- [ ] Copy `.env.example` to `.env`
- [ ] Fill in all required environment variables
- [ ] Test database connection
- [ ] Test Midtrans integration

## Development Setup

### 1. Local Development
```bash
# Install dependencies
npm install

# Setup environment
cp .env.example .env
# Edit .env with your credentials

# Run development server
npm run dev
```

### 2. Testing
```bash
# Run linting
npm run lint

# Type checking
npm run typecheck

# Run tests
npm run test
```

## Production Deployment

### 1. Build Application
```bash
# Build for production
npm run build

# Preview build
npm run preview
```

### 2. Cloudflare Pages Setup
- [ ] Connect repository to Cloudflare Pages
- [ ] Set build command: `npm run build`
- [ ] Set output directory: `.output/public`
- [ ] Configure environment variables
- [ ] Enable Functions (for API routes)

### 3. Environment Variables in Production
Set these in Cloudflare Pages settings:
- `NUXT_PUBLIC_SUPABASE_URL`
- `NUXT_PUBLIC_SUPABASE_KEY`
- `SUPABASE_SERVICE_KEY`
- `MIDTRANS_SERVER_KEY`
- `MIDTRANS_CLIENT_KEY`
- `FONNTE_API_KEY`

### 4. DNS Configuration
- [ ] Point custom domain to Cloudflare Pages
- [ ] Configure SSL certificate
- [ ] Set up email if needed

## Post-Deployment Checklist

### 1. Functionality Testing
- [ ] Test user registration/login
- [ ] Test invitation creation
- [ ] Test payment flow (use Midtrans sandbox)
- [ ] Test WhatsApp blast
- [ ] Test file uploads
- [ ] Test guest book functionality
- [ ] Test real-time updates

### 2. Performance Testing
- [ ] Check Core Web Vitals
- [ ] Test mobile responsiveness
- [ ] Verify SEO meta tags
- [ ] Test image optimization

### 3. Security Testing
- [ ] Verify Row Level Security policies
- [ ] Test API rate limiting
- [ ] Check CORS configuration
- [ ] Verify input sanitization

### 4. Monitoring Setup
- [ ] Set up error tracking
- [ ] Configure analytics
- [ ] Set up uptime monitoring
- [ ] Configure backup strategy

## Maintenance

### 1. Regular Tasks
- [ ] Monitor database usage
- [ ] Update dependencies
- [ ] Review security advisories
- [ ] Backup database regularly

### 2. Scaling Considerations
- [ ] Monitor CDN usage
- [ ] Review Supabase limits
- [ ] Optimize database queries
- [ ] Consider Redis for caching

## Troubleshooting

### Common Issues

1. **Build Failures**
   - Check Node.js version compatibility
   - Verify environment variables
   - Review error logs

2. **Database Connection Issues**
   - Verify Supabase URL and keys
   - Check network policies
   - Test connection manually

3. **Payment Failures**
   - Verify Midtrans configuration
   - Check webhook URLs
   - Review server logs

4. **File Upload Issues**
   - Check storage policies
   - Verify file size limits
   - Review CORS settings

### Support Contacts
- Supabase: https://supabase.com/docs
- Midtrans: https://docs.midtrans.com
- Cloudflare: https://developers.cloudflare.com/pages
- Fonnte: https://fonnte.com/api