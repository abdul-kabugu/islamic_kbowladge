# Sheikh Shahid - Islamic Studies Website

A comprehensive Kiswahili Islamic studies website featuring Darsa schedules, audio lectures, articles, and video content management.

## Features

- **Kiswahili Interface** - Full website in Kiswahili with Arabic elements
- **Audio Lectures** - Stream Islamic lectures with file upload support
- **Articles System** - Islamic articles with rich content management
- **Video Integration** - YouTube video integration for visual content
- **Darsa Schedules** - Weekly Islamic study schedules across mosques
- **Admin Dashboard** - Complete content management system
- **File Uploads** - Direct file upload for audio and images
- **Responsive Design** - Beautiful orange-to-gold gradient design

## Technology Stack

- **Frontend**: React 18, TypeScript, Tailwind CSS
- **Backend**: Express.js, Node.js
- **Database**: Supabase (PostgreSQL)
- **Storage**: Supabase Storage for file uploads
- **UI Components**: Shadcn/ui, Radix UI
- **Styling**: Tailwind CSS with custom Islamic design

## Quick Start

### 1. Clone Repository
```bash
git clone https://github.com/yourusername/sheikh-shahid-website.git
cd sheikh-shahid-website
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Setup
Create `.env` file:
```env
SUPABASE_URL=your_supabase_url
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_anon_key
```

### 4. Database Setup
Run the SQL commands from `supabase_setup.sql` in your Supabase dashboard.

### 5. Start Development
```bash
npm run dev
```

## Project Structure

```
sheikh-shahid-website/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/         # Application pages
│   │   ├── lib/           # Utilities and API clients
│   │   └── hooks/         # Custom React hooks
├── server/                # Express backend
│   ├── routes.ts          # API routes
│   ├── storage.ts         # Database operations
│   └── index.ts           # Server entry point
├── shared/                # Shared types and schemas
└── supabase_setup.sql     # Database schema
```

## Features Overview

### Homepage
- Beautiful Islamic design with Arabic typography
- Live audio player with current lecture
- Featured articles carousel
- Video teachings section
- Darsa schedule display

### Admin Dashboard
- Content management for articles, audio, videos, schedules
- File upload functionality for images and audio
- Real-time content updates
- Kiswahili interface

### Content Types

#### Articles (Makala)
- Title, content, excerpt
- Categories: Akidah, Fiqh, Maadili, Tarehe
- Cover image upload
- Reading time estimation

#### Audio Content (Sauti)
- Title and description
- Audio file upload (up to 50MB)
- Cover image upload
- Duration tracking
- Currently playing status

#### Videos
- YouTube integration
- Title and description
- Thumbnail and duration
- Publication date

#### Darsa Schedule (Ratiba)
- Mosque information
- Day and time slots
- Subject and teacher
- Active/inactive status

## Deployment

See `DEPLOYMENT.md` for detailed deployment instructions for:
- Vercel (Recommended)
- Netlify
- Railway
- Render

## Environment Variables

### Required
- `SUPABASE_URL` - Your Supabase project URL
- `SUPABASE_SERVICE_ROLE_KEY` - Supabase service role key
- `VITE_SUPABASE_URL` - Supabase URL for frontend
- `VITE_SUPABASE_ANON_KEY` - Supabase anonymous key

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

MIT License - see LICENSE file for details

## Support

For support and questions, please open an issue in the GitHub repository.

---

**Built with ❤️ for the Islamic community**