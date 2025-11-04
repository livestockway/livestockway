# 🚚 LivestockWay TMS - Phase 1

> Modern livestock transportation management system connecting haulers, shippers, and service providers.

[![Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?style=flat&logo=vercel)](https://vercel.com)
[![React](https://img.shields.io/badge/React-18.3-blue?style=flat&logo=react)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.4-blue?style=flat&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.0-38bdf8?style=flat&logo=tailwind-css)](https://tailwindcss.com)

---

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Deployment](#deployment)
- [Project Structure](#project-structure)
- [User Roles](#user-roles)
- [Documentation](#documentation)
- [Roadmap](#roadmap)
- [Support](#support)

---

## 🎯 Overview

LivestockWay TMS is a comprehensive transportation management platform designed specifically for the livestock industry. It connects three key user types:

- 🟢 **Haulers** - Truck owners who bid on and transport loads
- 🟠 **Shippers** - Farm owners who post loads for transport
- ⚫ **Stakeholders** - Service providers (washout, feed, vet services)

**Current Status:** Phase A Complete (82% of Phase A, 31/38 user stories) ✅

---

## ✨ Features

### Phase A - Foundation (Complete)

#### 🔐 Authentication & Onboarding
- Modern landing page with role selection
- Combined signup/login flow with company registration toggle
- Email and phone verification (SMS/Email)
- Password recovery with secure reset flow
- Role-specific 3-step onboarding wizards

#### 📱 Dashboards (5 Roles)
- **Hauler Dashboard** (Green #29CA8D)
  - Fleet management with vehicle tracking
  - Post available trucks (PostTruckDialog)
  - Driver management
  - Loadboard with filtering
  
- **Shipper Dashboard** (Orange #F97316)
  - Post loads for transport (PostLoadDialog)
  - Track active shipments
  - View available carriers
  - Manage billing
  
- **Stakeholder Dashboard** (Gray #6B7280)
  - Service marketplace (washout, feed, vet)
  - Job listings and bidding
  - Service area management
  
- **Driver Dashboard**
  - Trip management
  - Earnings tracking
  - Route navigation (mock)
  
- **Super Admin Dashboard** (Dark Blue #172039)
  - Platform monitoring
  - User management
  - Analytics overview

#### 🎨 Design System
- Role-based color coding (Green/Orange/Gray/Blue)
- Mobile-first responsive design (320px+)
- Dark mode support with system preference detection
- Accessible components (WCAG 2.1 AA compliant)
- Consistent spacing and typography system

#### 🛠️ Core Functionality
- Advanced loadboard with multi-filter system
- Fleet and driver management
- Team management with role assignments
- Basic wallet/billing UI
- Support ticket system
- Profile settings with avatar upload
- Keyboard shortcuts (Cmd+K for quick actions)
- Offline indicator with auto-retry
- Toast notifications (success/error/info)
- Loading states and skeletons
- Empty states with helpful CTAs

---

## 🛠️ Tech Stack

### Frontend
- **React 18.3** - UI framework
- **TypeScript 5.4** - Type safety
- **Vite 5.2** - Build tool & dev server
- **React Router 6.22** - Client-side routing

### Styling
- **Tailwind CSS 4.0** - Utility-first CSS
- **shadcn/ui** - Accessible component library
- **Lucide React** - Icon library

### State & Storage
- **LocalStorage** - Client-side persistence (Phase A)
- **Context API** - Global state (theme, auth)

### UI Components
- **Radix UI** - Unstyled accessible primitives
- **Sonner** - Toast notifications
- **Recharts** - Data visualization
- **React Hook Form** - Form management
- **Zod** - Schema validation

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ and npm 9+
- Git

### Installation

```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/livestockway-tms.git
cd livestockway-tms

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Test Credentials
```
Email: Any email (e.g., test@hauler.com)
Password: Anything (e.g., password123)
OTP Code: 123456
```

### Build for Production

```bash
# Type check
npm run type-check

# Build
npm run build

# Preview production build
npm run preview
```

---

## 🌐 Deployment

### Deploy to Vercel (Recommended)

#### Option 1: GitHub Integration
1. Push code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Click "Add New Project"
4. Import your repository
5. Framework: **Vite** (auto-detected)
6. Click "Deploy"

#### Option 2: Vercel CLI
```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
vercel --prod
```

#### Option 3: Drag & Drop
Drag the project folder to [vercel.com/new](https://vercel.com/new)

### Configuration
All deployment settings are pre-configured in `vercel.json`:
- ✅ SPA routing (all routes → index.html)
- ✅ Asset caching (1 year for /assets/*)
- ✅ Security headers (XSS, Clickjacking protection)
- ✅ Optimized build settings

**No environment variables needed for Phase A!**

See [DEPLOY.md](./DEPLOY.md) for detailed instructions.

---

## 📁 Project Structure

```
livestockway-tms/
├── src/
│   └── main.tsx                 # Application entry point
├── components/                  # React components
│   ├── AppRouter.tsx           # Main routing logic
│   ├── AppLayout.tsx           # Dashboard layout wrapper
│   ├── LandingPage.tsx         # Landing page
│   ├── Login.tsx               # Login screen
│   ├── SignupLogin.tsx         # Combined signup/login
│   ├── Onboarding.tsx          # Onboarding flow
│   ├── OnboardingWizard.tsx    # Role-specific wizards
│   ├── HaulerDashboard.tsx     # Hauler dashboard
│   ├── ShipperDashboard.tsx    # Shipper dashboard
│   ├── StakeholderDashboard.tsx # Stakeholder dashboard
│   ├── DriverDashboard.tsx     # Driver dashboard
│   ├── SuperAdminDashboard.tsx # Admin dashboard
│   ├── PostTruckDialog.tsx     # Post truck flow (haulers)
│   ├── PostLoadDialog.tsx      # Post load flow (shippers)
│   └── ui/                     # shadcn/ui components
├── lib/                        # Utility functions
│   ├── storage.ts              # LocalStorage wrapper
│   ├── theme.ts                # Theme management
│   ├── keyboard-shortcuts.ts   # Keyboard shortcuts
│   ├── network.ts              # Network utilities
│   └── undo-manager.ts         # Undo/redo system
├── styles/
│   └── globals.css             # Global styles & tokens
├── public/                     # Static assets
├── App.tsx                     # Root component
├── index.html                  # HTML template
├── vite.config.ts              # Vite configuration
├── tsconfig.json               # TypeScript config
├── vercel.json                 # Vercel deployment config
└── package.json                # Dependencies
```

---

## 👥 User Roles

### 🟢 Hauler (Truck Owner)
**Primary Actions:**
- Post available trucks with capacity/availability
- Bid on shipper loads
- Manage fleet (trucks, trailers)
- Assign drivers to trips
- Track earnings and expenses

**Color Theme:** Green (#29CA8D)

### 🟠 Shipper (Farm Owner)
**Primary Actions:**
- Post loads for transport
- Review and accept hauler bids
- Track active shipments
- Manage delivery schedules
- Rate haulers

**Color Theme:** Orange (#F97316)

### ⚫ Stakeholder (Service Provider)
**Primary Actions:**
- Create service listings (washout, feed, vet)
- View and bid on job requests
- Manage service areas
- Track completed services

**Color Theme:** Gray (#6B7280)

### 🚗 Driver
**Primary Actions:**
- View assigned trips
- Update trip status
- Report incidents
- Track earnings

**Color Theme:** Inherits from hauler (Green)

### 🔵 Super Admin
**Primary Actions:**
- Monitor platform health
- Manage users and roles
- View analytics
- Handle disputes

**Color Theme:** Dark Blue (#172039)

---

## 📚 Documentation

### Comprehensive Guides
- [**DEPLOY.md**](./DEPLOY.md) - Complete deployment guide
- [**DEPLOYMENT_CHECKLIST.md**](./DEPLOYMENT_CHECKLIST.md) - Pre-deployment checklist
- [**PHASE_A_STATUS.md**](./PHASE_A_STATUS.md) - Detailed Phase A status (82% complete)
- [**PHASE_B_ROADMAP.md**](./PHASE_B_ROADMAP.md) - Upcoming features
- [**COMPLETE_APP_DOCUMENTATION.md**](./COMPLETE_APP_DOCUMENTATION.md) - Full app documentation
- [**TESTING_GUIDE.md**](./TESTING_GUIDE.md) - Testing instructions
- [**USER_STORIES_AUDIT.md**](./USER_STORIES_AUDIT.md) - User stories tracking

### Recent Updates
- [**ROUTING_FIX_NOV2.md**](./ROUTING_FIX_NOV2.md) - Latest routing improvements
- [**ALL_FIXES_NOV2_2025.md**](./ALL_FIXES_NOV2_2025.md) - All fixes summary
- [**SESSION_FIXES_COMPLETE.md**](./SESSION_FIXES_COMPLETE.md) - Authentication fixes

---

## 🗺️ Roadmap

### ✅ Phase A - Foundation (82% Complete)
- [x] Landing page & authentication
- [x] Role-based onboarding
- [x] 5 functional dashboards
- [x] PostTruckDialog (haulers)
- [x] PostLoadDialog (shippers)
- [x] Basic fleet management
- [x] Mobile responsive design
- [ ] Complete remaining 7 user stories

### 🔄 Phase B - Bidding System (Next, ~18 hours)
- [ ] Real-time bidding system
- [ ] Supabase backend integration
- [ ] Load matching algorithm
- [ ] Bid notifications
- [ ] Acceptance/rejection flows
- [ ] Bid history tracking

### 📅 Phase C - Payment & Tracking (~22 hours)
- [ ] Stripe payment integration
- [ ] Escrow system
- [ ] GPS tracking integration
- [ ] Real-time location updates
- [ ] Payment release triggers

### 🚀 Phase D - Advanced Features (~30 hours)
- [ ] Document management (BOL, insurance)
- [ ] Trip chat system
- [ ] Push notifications
- [ ] Analytics dashboard
- [ ] Rating & review system
- [ ] Advanced filtering

---

## 🧪 Testing

### Manual Testing
```bash
# Run development server
npm run dev

# Test each role:
# 1. Hauler flow → green theme
# 2. Shipper flow → orange theme
# 3. Stakeholder flow → gray theme
# 4. Driver flow
# 5. Admin flow → blue theme
```

### User Flow Testing
See [TESTING_GUIDE.md](./TESTING_GUIDE.md) for comprehensive test scenarios.

### Browser Compatibility
- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+
- ✅ Mobile Safari (iOS 14+)
- ✅ Mobile Chrome (Android 8+)

---

## 🐛 Known Issues & Limitations

### Phase A Intentional Limitations
- Mock data (no real database)
- Simulated authentication (LocalStorage only)
- No data persistence across devices
- No file uploads (UI only)
- No real-time updates

**These will be addressed in Phase B with Supabase integration.**

### Fixed Issues
- ✅ White screen after login - FIXED
- ✅ Routing not working properly - FIXED
- ✅ Role selection not persisting - FIXED
- ✅ Onboarding flow broken - FIXED
- ✅ Phone login verification - FIXED

---

## 🤝 Contributing

This is a proprietary project. For internal development:

1. Create a feature branch (`git checkout -b feature/amazing-feature`)
2. Commit changes (`git commit -m 'Add amazing feature'`)
3. Push to branch (`git push origin feature/amazing-feature`)
4. Open a Pull Request

---

## 📞 Support

### Internal Team
- Technical Issues: Check [QUICK_FIX_REFERENCE.md](./QUICK_FIX_REFERENCE.md)
- Deployment Help: See [DEPLOY.md](./DEPLOY.md)
- Testing Help: See [TESTING_GUIDE.md](./TESTING_GUIDE.md)

### Troubleshooting
- Build fails? → `rm -rf node_modules dist && npm install && npm run build`
- White screen? → Check browser console for errors
- Routes not working? → Verify `vercel.json` rewrites

---

## 📄 License

**Proprietary** - LivestockWay TMS Phase 1  
© 2025 LivestockWay. All rights reserved.

---

## 🎉 Acknowledgments

Built with modern web technologies:
- React Team for React 18
- Vercel for hosting & build platform
- shadcn for the amazing component library
- Radix UI for accessible primitives
- Tailwind Labs for Tailwind CSS

See [Attributions.md](./Attributions.md) for full credits.

---

## 📊 Stats

- **Components:** 45+
- **Routes:** 45
- **User Stories:** 31/38 complete (82%)
- **Lines of Code:** ~15,000+
- **Build Size:** ~500KB (gzipped)
- **Lighthouse Score:** 95+ (Performance, Accessibility, Best Practices)

---

**Ready to deploy?** Follow the [deployment guide](./DEPLOY.md) and launch in minutes! 🚀

**Questions?** Check the comprehensive [documentation](./COMPLETE_APP_DOCUMENTATION.md).

---

Made with ❤️ for the livestock transportation industry
