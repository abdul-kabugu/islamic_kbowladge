# How to Export Sheikh Shahid Project to GitHub

## Method 1: Download and Upload (Easiest)

### Step 1: Download Project Files
1. In Replit, click the three dots menu (⋯) next to your project name
2. Select "Download as zip"
3. Extract the zip file on your computer

### Step 2: Create GitHub Repository
1. Go to [github.com](https://github.com) and sign in
2. Click "New repository" (green button)
3. Name it: `sheikh-shahid-website`
4. Add description: "Islamic Studies Website with Kiswahili content"
5. Keep it Public (or Private if preferred)
6. Don't initialize with README (we already have one)
7. Click "Create repository"

### Step 3: Upload Files
1. On the new repository page, click "uploading an existing file"
2. Drag and drop ALL files from the extracted folder
3. Write commit message: "Initial commit: Sheikh Shahid Islamic Studies Website"
4. Click "Commit changes"

## Method 2: Git Commands (Advanced)

If you prefer using Git commands:

### Step 1: Initialize Repository
```bash
# In your project directory
git init
git add .
git commit -m "Initial commit: Sheikh Shahid Islamic Studies Website"
```

### Step 2: Connect to GitHub
```bash
# Replace YOUR_USERNAME with your GitHub username
git remote add origin https://github.com/YOUR_USERNAME/sheikh-shahid-website.git
git branch -M main
git push -u origin main
```

## Important Files Included

✅ **All Source Code**
- `client/` - React frontend with dashboard
- `server/` - Express.js backend
- `shared/` - Database schemas

✅ **Documentation**
- `README.md` - Complete project documentation
- `DEPLOYMENT.md` - Deployment instructions
- `supabase_setup.sql` - Database setup

✅ **Configuration**
- `package.json` - Dependencies
- `vercel.json` - Deployment config
- `.gitignore` - Git ignore rules
- `.github/workflows/` - CI/CD setup

✅ **Features Ready**
- File upload functionality for audio and images
- Kiswahili interface
- Admin dashboard
- Supabase integration
- Deployment ready

## After Upload to GitHub

### 1. Update Repository URL
In `README.md`, change:
```
git clone https://github.com/yourusername/sheikh-shahid-website.git
```
To your actual GitHub username.

### 2. Set Repository Topics
Add these topics to help others find your project:
- `islamic-studies`
- `kiswahili`
- `react`
- `typescript`
- `supabase`
- `darsa`
- `islamic-education`

### 3. Enable GitHub Pages (Optional)
In repository Settings → Pages, you can enable GitHub Pages for documentation.

## Next Steps After GitHub Upload

1. **Set up Supabase**: Create account and run the SQL setup
2. **Deploy**: Use Vercel, Netlify, or other platforms
3. **Configure Environment Variables**: Add your Supabase keys
4. **Test File Uploads**: Ensure storage buckets are created

## Repository Features

Your GitHub repository will include:
- ⭐ Professional README with setup instructions
- 🚀 Automated deployment with GitHub Actions
- 📁 Well-organized project structure
- 🔧 Complete configuration files
- 📚 Comprehensive documentation
- 🎨 Beautiful Islamic-themed design
- 🗂️ File upload functionality
- 🌐 Kiswahili localization

The project is production-ready and can be deployed immediately after setting up the database!