# Deployment Guide for Sheikh Shahid Website

This guide covers multiple deployment options for your Islamic studies website.

## GitHub Setup

### 1. Create GitHub Repository

1. Go to [GitHub](https://github.com) and create a new repository
2. Name it `sheikh-shahid-website` (or any name you prefer)
3. Initialize without README, .gitignore, or license (we already have them)

### 2. Connect Your Project to GitHub

In your Replit console, run these commands:

```bash
# Initialize git (if not already done)
git init

# Add all files
git add .

# Create first commit
git commit -m "Initial commit: Sheikh Shahid Islamic Studies Website"

# Add your GitHub repository as remote
git remote add origin https://github.com/YOUR_USERNAME/sheikh-shahid-website.git

# Push to GitHub
git push -u origin main
```

Replace `YOUR_USERNAME` with your actual GitHub username.

## Deployment Options

### Option 1: Vercel (Recommended)

Vercel works great for full-stack applications with serverless functions.

#### Setup Steps:

1. **Install Vercel CLI**:
   ```bash
   npm i -g vercel
   ```

2. **Login to Vercel**:
   ```bash
   vercel login
   ```

3. **Deploy**:
   ```bash
   vercel
   ```

4. **Configure Environment Variables** in Vercel Dashboard:
   - `SUPABASE_URL`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`

5. **Connect GitHub** for automatic deployments:
   - Go to Vercel Dashboard
   - Connect your GitHub repository
   - Enable auto-deployments on push to main branch

### Option 2: Netlify

Great for static sites with serverless functions.

#### Setup Steps:

1. **Build Configuration** (create `netlify.toml`):
   ```toml
   [build]
   command = "npm run build"
   publish = "dist"

   [build.environment]
   NODE_VERSION = "20"

   [[redirects]]
   from = "/api/*"
   to = "/.netlify/functions/:splat"
   status = 200

   [[redirects]]
   from = "/*"
   to = "/index.html"
   status = 200
   ```

2. **Connect GitHub Repository**:
   - Go to Netlify Dashboard
   - Click "New site from Git"
   - Connect GitHub and select your repository

3. **Configure Environment Variables**:
   - Add the same Supabase variables as above

### Option 3: Railway

Perfect for full-stack applications with databases.

#### Setup Steps:

1. **Connect GitHub**:
   - Go to [Railway](https://railway.app)
   - Connect your GitHub repository

2. **Configure Build**:
   - Build Command: `npm run build`
   - Start Command: `npm start`

3. **Add Environment Variables**:
   - Same Supabase variables as above

### Option 4: Render

Another excellent option for full-stack deployment.

#### Setup Steps:

1. **Create Web Service**:
   - Go to [Render](https://render.com)
   - Connect GitHub repository

2. **Configure Service**:
   - Build Command: `npm install && npm run build`
   - Start Command: `npm start`

3. **Add Environment Variables**:
   - Same Supabase variables

## Environment Variables Required

For all deployment platforms, you'll need these variables:

```env
# Backend
SUPABASE_URL=https://your-project-id.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# Frontend
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-public-key
```

## Custom Domain Setup

### For Vercel:
1. Go to Project Settings → Domains
2. Add your custom domain
3. Configure DNS records as instructed

### For Netlify:
1. Go to Site Settings → Domain management
2. Add custom domain
3. Update DNS records

### For Railway:
1. Go to Project → Settings → Domains
2. Add custom domain
3. Configure DNS

## SSL/HTTPS

All recommended platforms provide automatic SSL certificates:
- Vercel: Automatic
- Netlify: Automatic
- Railway: Automatic
- Render: Automatic

## Monitoring and Analytics

### Add Google Analytics (Optional):
1. Create Google Analytics account
2. Add tracking code to `client/index.html`
3. Configure goals for donations and content engagement

### Error Monitoring:
- Consider adding Sentry for error tracking
- Most platforms provide basic monitoring

## Performance Optimization

### Image Optimization:
- Use WebP format for images
- Implement lazy loading
- Consider using Cloudinary or similar services

### Caching:
- Enable CDN caching
- Set appropriate cache headers
- Use service workers for offline functionality

## Backup Strategy

### Database Backups:
- Supabase provides automatic backups
- Set up additional manual backups if needed

### Code Backups:
- GitHub serves as primary backup
- Consider mirroring to GitLab or Bitbucket

## Scaling Considerations

### For High Traffic:
- Use Vercel Pro for better performance
- Implement Redis caching
- Consider database read replicas in Supabase

### Content Delivery:
- Enable CDN on your deployment platform
- Use image optimization services
- Implement progressive loading

## Security Checklist

- [ ] Environment variables configured correctly
- [ ] Supabase RLS policies enabled
- [ ] HTTPS enforced
- [ ] CORS properly configured
- [ ] API rate limiting implemented
- [ ] Regular security updates

## Troubleshooting

### Common Issues:

1. **Build Failures**:
   - Check Node.js version (use 18 or 20)
   - Verify all environment variables
   - Review build logs

2. **Database Connection Issues**:
   - Verify Supabase credentials
   - Check network connectivity
   - Review RLS policies

3. **Performance Issues**:
   - Enable compression
   - Optimize images
   - Use CDN

## Support

For deployment issues:
- Check platform documentation
- Review deployment logs
- Contact platform support if needed

Choose the deployment option that best fits your needs. Vercel is recommended for its simplicity and excellent performance with this tech stack.