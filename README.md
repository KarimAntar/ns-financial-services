# NS Financial and Bookkeeping Services LLC

<div align="center">
  <img src="public/logo_with_gradient.png" alt="NS Financial Logo" width="200"/>
  
  **Simplify Your Finances. Focus on Your Business.**
  
  [![Next.js](https://img.shields.io/badge/Next.js-14-black?style=flat-square&logo=next.js)](https://nextjs.org/)
  [![React](https://img.shields.io/badge/React-18-blue?style=flat-square&logo=react)](https://reactjs.org/)
  [![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
  [![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-38bdf8?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)
  [![License](https://img.shields.io/badge/license-MIT-green?style=flat-square)](LICENSE)
</div>

---

## 📋 Table of Contents

- [About](#about)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Configuration](#configuration)
- [Deployment](#deployment)
- [API Routes](#api-routes)
- [Styling](#styling)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

---

## 🏢 About

**NS Financial and Bookkeeping Services LLC** is a professional website for a woman-owned financial services firm based in Colorado. The platform provides comprehensive information about bookkeeping, financial reporting, and advisory services for small businesses, with an integrated booking system for consultations.

Founded by **Noura Salman**, the firm brings over five years of professional experience in credit analysis and financial reporting, empowering business owners with accurate financial insights to make confident, growth-driven decisions.

---

## ✨ Features

### 🎨 **Modern UI/UX**
- Fully responsive design optimized for desktop, tablet, and mobile
- Smooth animations and transitions
- Custom gradient color scheme matching brand identity
- Interactive typing effect on hero section
- Scroll-based section animations

### 📱 **Mobile-First Navigation**
- Desktop: Horizontal navigation with icons
- Mobile: Hamburger menu with full-screen overlay
- Active section highlighting with gradient background
- Smooth page transitions

### 📅 **Integrated Booking System**
- Real-time consultation booking form
- Google Calendar integration via OAuth2
- Automatic Google Meet link generation
- Email notifications to both client and business
- Form validation with toast notifications
- Date picker with minimum date restriction (today onwards)

### 📧 **Email Notifications**
- Nodemailer integration with Gmail SMTP
- Professional HTML email templates
- Automatic confirmation emails to clients
- Booking details sent to business owner
- Google Meet link included in emails

### 🔐 **Google OAuth2 Integration**
- Secure authentication for Google Calendar API
- Refresh token management
- Calendar event creation with attendees
- Conference data (Google Meet) generation

### 🎯 **Key Sections**
- **Hero**: Dynamic typing text with call-to-action
- **Services**: Grid layout showcasing 6 core services
- **Why Choose Us**: Three key value propositions
- **Testimonials**: Client feedback with ratings
- **About**: Company background and founder information
- **Booking**: Full-featured consultation booking form
- **Contact**: Business hours, location, and contact details

---

## 🛠️ Tech Stack

### **Frontend**
- **Framework**: [Next.js 14](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **UI Library**: [React 18](https://reactjs.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Notifications**: [React Hot Toast](https://react-hot-toast.com/)
- **Image Optimization**: Next.js Image Component

### **Backend**
- **API Routes**: Next.js API Routes (Server Components)
- **Email Service**: [Nodemailer](https://nodemailer.com/) with Gmail SMTP
- **Calendar API**: Google Calendar API v3
- **Authentication**: Google OAuth2

### **Development**
- **Package Manager**: npm/yarn
- **Code Quality**: ESLint, Prettier
- **Version Control**: Git

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager
- Google Cloud Console account (for OAuth2 and Calendar API)
- Gmail account for SMTP

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/ns-financial-services.git
   cd ns-financial-services
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables**
   
   Create a `.env.local` file in the root directory:
   ```env
   # Google OAuth2 Credentials
   GOOGLE_OAUTH_CLIENT_ID=your_client_id_here
   GOOGLE_OAUTH_CLIENT_SECRET=your_client_secret_here
   GOOGLE_OAUTH_REDIRECT_URI=http://localhost:3000/api/auth/callback
   GOOGLE_OAUTH_REFRESH_TOKEN=your_refresh_token_here

   # Email Configuration (Gmail SMTP)
   EMAIL_USER=your_email@gmail.com
   EMAIL_PASSWORD=your_app_password_here
   ```

4. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000)

---

## 📁 Project Structure

```
ns-financial-services/
├── app/
│   ├── api/
│   │   ├── auth/
│   │   │   ├── callback/
│   │   │   │   └── route.ts          # OAuth2 callback handler
│   │   │   └── google/
│   │   │       └── route.ts          # OAuth2 initiation
│   │   └── booking/
│   │       └── route.ts              # Booking form handler
│   ├── globals.css                   # Global styles & animations
│   ├── layout.tsx                    # Root layout
│   └── page.tsx                      # Main homepage component
├── public/
│   ├── logo_100x100_white.png       # Main logo
│   ├── logo_with_gradient.png       # Logo with gradient
│   ├── background.jpg               # Hero background image
│   ├── Earn.png                     # Why Choose Us icon
│   ├── Helping_You.png              # Why Choose Us icon
│   └── Growing.png                  # Why Choose Us icon
├── .env.local                       # Environment variables (not in repo)
├── .gitignore
├── next.config.js
├── package.json
├── README.md
├── tailwind.config.ts
└── tsconfig.json
```

---

## ⚙️ Configuration

### Google OAuth2 Setup

1. **Create a Google Cloud Project**
   - Go to [Google Cloud Console](https://console.cloud.google.com/)
   - Create a new project

2. **Enable Google Calendar API**
   - Navigate to "APIs & Services" > "Library"
   - Search for "Google Calendar API"
   - Click "Enable"

3. **Create OAuth2 Credentials**
   - Go to "APIs & Services" > "Credentials"
   - Click "Create Credentials" > "OAuth 2.0 Client ID"
   - Application type: Web application
   - Add authorized redirect URIs:
     - `http://localhost:3000/api/auth/callback` (development)
     - `https://yourdomain.com/api/auth/callback` (production)

4. **Get Refresh Token**
   - Run the OAuth flow by visiting `/api/auth/google`
   - Complete the authorization
   - Copy the refresh token from the callback response
   - Add it to your `.env.local` file

### Email Configuration (Gmail)

1. **Enable 2-Factor Authentication** on your Gmail account

2. **Generate App Password**
   - Go to Google Account settings
   - Security > 2-Step Verification > App passwords
   - Generate a new app password for "Mail"
   - Use this password in `EMAIL_PASSWORD` env variable

3. **Update Email Settings**
   - Modify the `from` address in `app/api/booking/route.ts`
   - Update recipient email addresses as needed

---

## 🌐 Deployment

### Vercel (Recommended)

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Deploy to Vercel**
   - Visit [Vercel](https://vercel.com)
   - Import your GitHub repository
   - Add environment variables in Vercel dashboard
   - Deploy!

3. **Update OAuth2 Redirect URI**
   - Add your production URL to Google Cloud Console
   - Update `GOOGLE_OAUTH_REDIRECT_URI` in Vercel environment variables

### Other Platforms

The application can be deployed to any platform that supports Next.js:
- **Netlify**: Use the Netlify Next.js plugin
- **AWS Amplify**: Configure build settings for Next.js
- **Railway**: Direct deployment with GitHub integration
- **DigitalOcean App Platform**: Docker or buildpack deployment

---

## 🔌 API Routes

### `/api/auth/google` (GET)
Initiates Google OAuth2 flow for calendar access.

**Response**: Redirects to Google authorization page

### `/api/auth/callback` (GET)
Handles OAuth2 callback and exchanges code for tokens.

**Query Parameters**:
- `code`: Authorization code from Google

**Response**:
```json
{
  "message": "OAuth2 successful",
  "refresh_token": "your_refresh_token"
}
```

### `/api/booking` (POST)
Handles consultation booking requests.

**Request Body**:
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "(555) 123-4567",
  "service": "Bookkeeping & Accounting",
  "otherService": "",
  "date": "2025-11-15",
  "time": "2:00 PM",
  "message": "I need help with monthly bookkeeping"
}
```

**Response**:
```json
{
  "success": true,
  "message": "Booking request submitted successfully"
}
```

**Functionality**:
- Creates Google Calendar event
- Generates Google Meet link
- Sends email to business owner
- Sends confirmation email to client

---

## 🎨 Styling

### Color Palette

The project uses a custom teal-based color scheme:

```css
:root {
  --primary-teal: #018880;      /* Main brand color */
  --dark-teal: #002830;         /* Dark accent */
  --medium-teal: #114040;       /* Medium accent */
  --light-gray: #E6E6E0;        /* Background accent */
  --dark-gray: #222222;         /* Text dark */
}
```

### Custom Animations

The project includes custom CSS animations in `globals.css`:
- `fadeIn`, `fadeInLeft`, `fadeInRight`
- `slideUp`, `slideDown`
- `scaleIn`, `bounceIn`
- `pulse-slow`, `glow`
- `float`, `shimmer`

### Responsive Breakpoints

```
sm: 640px   - Small devices
md: 768px   - Medium devices (tablets)
lg: 1024px  - Large devices (desktops)
xl: 1280px  - Extra large devices
2xl: 1536px - Ultra wide screens
```

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/YourFeatureName
   ```
3. **Commit your changes**
   ```bash
   git commit -m "Add some feature"
   ```
4. **Push to the branch**
   ```bash
   git push origin feature/YourFeatureName
   ```
5. **Open a Pull Request**

### Development Guidelines

- Follow existing code style and conventions
- Write clear commit messages
- Add comments for complex logic
- Test thoroughly before submitting PR
- Update documentation as needed

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 📞 Contact

**NS Financial and Bookkeeping Services LLC**

- **Website**: [https://ns-financial-services.vercel.app](https://ns-financial-services.vercel.app)
- **Email**: info@nsfinancialservice.com
- **Address**: 1500 N. Grant St. Ste R, Denver, CO 80203
- **Business Hours**: Monday - Friday, 9:00 AM - 5:00 PM

**Founder**: Noura Salman
- Bachelor's degree in Accounting
- Master's in Finance and Risk Management
- 5+ years of professional experience in credit analysis and financial reporting

---

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - React framework
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [Lucide Icons](https://lucide.dev/) - Beautiful icon library
- [Google Cloud](https://cloud.google.com/) - Calendar API and OAuth2
- [Nodemailer](https://nodemailer.com/) - Email sending library
- [Vercel](https://vercel.com/) - Hosting platform

---

<div align="center">
  <p>Made with ❤️ by NS Financial Services</p>
  <p>© 2025 NS Financial and Bookkeeping Services LLC. All rights reserved.</p>
</div>