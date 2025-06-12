# الشيخ شاهد (Sheikh Shahid) - Islamic Studies Website

A comprehensive Kiswahili Islamic studies website with Darsa schedules, YouTube videos, audio content, articles, and donation features. Built with modern web technologies and Supabase backend.

## Features

- **Arabic/Kiswahili Interface**: Beautiful bilingual design with proper Arabic typography
- **Audio Player**: Stream Islamic teachings and lectures  
- **Video Integration**: YouTube video embedding for educational content
- **Article Management**: Islamic articles with rich content
- **Schedule System**: Live Darsa schedules for different mosques
- **Content Dashboard**: Admin interface for managing all content
- **Donation Modal**: Encouraging donation system
- **Responsive Design**: Works perfectly on all devices

## Tech Stack

- **Frontend**: React + TypeScript + Vite
- **Styling**: TailwindCSS + shadcn/ui
- **Backend**: Express.js + TypeScript
- **Database**: Supabase (PostgreSQL)
- **Routing**: Wouter
- **State Management**: TanStack Query
- **Deployment**: Replit

## Quick Start

### 1. Clone and Setup

The project is already configured. Just set up your Supabase database:

### 2. Supabase Setup

1. **Create a Supabase Project**:
   - Go to [supabase.com](https://supabase.com)
   - Create a new project
   - Wait for the database to be ready

2. **Get Your Credentials**:
   - Go to Settings > API in your Supabase dashboard
   - Copy the Project URL and anon public key
   - Copy the service role key (for backend)

3. **Set Environment Variables**:
   Create a `.env` file in the root directory:
   ```env
   # Backend Supabase Configuration
   SUPABASE_URL=https://your-project-id.supabase.co
   SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

   # Frontend Supabase Configuration  
   VITE_SUPABASE_URL=https://your-project-id.supabase.co
   VITE_SUPABASE_ANON_KEY=your-anon-public-key
   ```

4. **Initialize Database**:
   - Open the Supabase SQL Editor
   - Copy and paste the contents of `supabase_setup.sql`
   - Execute the queries to create tables and sample data

5. **Create Storage Buckets** (Optional):
   - Go to Storage in Supabase dashboard
   - Create buckets named: `images` and `audio-files`
   - Set them to public if you want direct file access

### 3. Run the Application

The application will automatically start using Supabase once environment variables are configured. If not configured, it falls back to in-memory storage for development.

```bash
npm run dev
```

## Content Management

### Accessing the Dashboard

Visit `/dashboard` to access the content management interface. The dashboard allows you to:

- **Manage Articles**: Create, edit, and delete Islamic articles
- **Audio Content**: Upload and manage audio lectures
- **Video Management**: Add YouTube videos with descriptions
- **Schedule Management**: Create and update Darsa schedules for different mosques

### Content Types

1. **Articles**:
   - Title, content, excerpt
   - Category (Akidah, Fiqh, Maadili, Tarehe)
   - Cover image, reading time
   - Published date

2. **Audio Content**:
   - Title, description
   - Audio file URL, cover image
   - Duration, currently playing status

3. **Videos**:
   - YouTube integration
   - Title, description, duration
   - Automatic thumbnail generation

4. **Schedules**:
   - Mosque information
   - Day, time, subject, teacher
   - Active/inactive status

## Database Schema

The Supabase database includes these tables:

- `articles`: Islamic articles and blog posts
- `audio_content`: Audio lectures and teachings
- `videos`: YouTube video references
- `schedules`: Darsa schedules for different mosques

All tables include automatic timestamps and proper indexing for performance.

## File Storage

For file uploads (audio files, images):

1. **Audio Files**: Store in `audio-files` bucket
2. **Images**: Store in `images` bucket
3. **Access**: Use Supabase Storage API for upload/download

## Styling & Theming

The website uses Islamic-inspired colors:

- **Primary**: Islamic Green (`#1F4E3D`)
- **Secondary**: Warm Orange (`#FF8C00`)
- **Accent**: Warm Yellow (`#FFD700`)

Typography includes:
- **Arabic**: Amiri font for Arabic text
- **English/Kiswahili**: Inter font for modern readability
- **Headings**: Playfair Display for elegance

## Security

- **Row Level Security (RLS)**: Enabled on all tables
- **Public Read**: Anyone can read content
- **Authenticated Write**: Only authenticated users can modify content
- **Environment Variables**: Sensitive keys stored securely

## Deployment

The application is ready for deployment on Replit or any Node.js hosting platform:

1. Set environment variables in your hosting platform
2. Ensure Supabase database is accessible
3. Deploy using the provided configuration

## Development Notes

- **Fallback Storage**: If Supabase isn't configured, the app uses in-memory storage
- **Error Handling**: Comprehensive error handling for database operations
- **Type Safety**: Full TypeScript support throughout the application
- **Responsive**: Mobile-first design approach

## Language Support

- **Primary**: Kiswahili (Swahili)
- **Secondary**: Arabic for Islamic terms and prayers
- **UI**: Modern Kiswahili interface with proper cultural context

## Contributing

When adding new features:

1. Follow the existing TypeScript patterns
2. Use the established styling system
3. Maintain the Islamic cultural context
4. Test with both in-memory and Supabase storage

## Support

For setup assistance or customization needs, refer to the Supabase documentation or reach out with specific questions about the implementation.