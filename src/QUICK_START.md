# ⚡ LivestockWay TMS - Quick Start Guide

**Get up and running in 5 minutes!**

---

## 🚀 Deploy Now (3 Steps)

### **1. Install Dependencies**
```bash
npm install
```

### **2. Test Locally**
```bash
npm run dev
# Open http://localhost:5173
```

### **3. Deploy to Vercel**
```bash
# Push to GitHub
git add .
git commit -m "Ready to deploy"
git push origin main

# Then connect on Vercel
# → vercel.com → Import → Select repo → Deploy
```

**Done! Your app is live in ~3 minutes** ✅

---

## 🧪 Quick Test (2 Minutes)

### **Test Hauler Flow:**
1. Click "Hauler" card (green)
2. Signup: `test@hauler.com` / `password`
3. Complete 3-step wizard
4. Click "Post Truck" button
5. ✅ Green dashboard working!

### **Test Shipper Flow:**
1. Click "Shipper" card (orange)
2. Signup: `test@shipper.com` / `password`
3. Complete 3-step wizard
4. Click "Post Load" button
5. ✅ Orange dashboard working!

### **Test Stakeholder Flow:**
1. Click "Stakeholder" card (gray)
2. Signup: `test@stakeholder.com` / `password`
3. Complete 3-step wizard
4. View marketplace and jobs
5. ✅ Gray dashboard working!

**OTP Code when asked:** `123456`

---

## 📁 Key Files

| File | Purpose |
|------|---------|
| `App.tsx` | Main app with routing |
| `components/LandingPage.tsx` | Role selection |
| `components/SignupLogin.tsx` | Auth flow |
| `components/OnboardingWizard.tsx` | 3-step wizards |
| `components/HaulerDashboard.tsx` | Hauler dashboard |
| `components/ShipperDashboard.tsx` | Shipper dashboard |
| `components/StakeholderDashboard.tsx` | Stakeholder dashboard |
| `components/PostTruckDialog.tsx` | Post truck form |
| `components/PostLoadDialog.tsx` | Post load form |

---

## 🎨 Role Colors

```css
Hauler:       #29CA8D (Green)   - Truck owners
Shipper:      #F97316 (Orange)  - Farm owners  
Stakeholder:  #6B7280 (Gray)    - Service providers
Admin:        #172039 (Blue)    - Platform admins
```

---

## 📊 What's Built

- ✅ Landing page with 3 roles
- ✅ Signup/Login flow
- ✅ Email verification
- ✅ Password recovery
- ✅ 3-step onboarding wizards
- ✅ 5 complete dashboards
- ✅ Post truck/load dialogs
- ✅ Mobile responsive
- ✅ Dark mode

**Progress: 25% of MVP**

---

## 🔗 Documentation

- **[README.md](./README.md)** - Full overview
- **[DEPLOY.md](./DEPLOY.md)** - Deployment guide
- **[PHASE_A_STATUS.md](./PHASE_A_STATUS.md)** - Detailed status
- **[DEPLOYMENT_CHECKLIST.md](./DEPLOYMENT_CHECKLIST.md)** - Pre-deploy checklist

---

## ⚡ Commands

```bash
npm install          # Install dependencies
npm run dev          # Start dev server
npm run build        # Build for production
npm run preview      # Preview production build
vercel --prod        # Deploy to Vercel
```

---

## 🐛 Troubleshooting

**White screen?**
- Clear browser cache
- Check console for errors
- Ensure all dependencies installed

**Build fails?**
```bash
rm -rf node_modules dist
npm install
npm run build
```

**Vercel deployment fails?**
- Check `vercel.json` is present
- Verify Node version (18+)
- Check build logs

---

## 📞 Quick Links

- **Live Demo:** [Add your Vercel URL]
- **GitHub:** [Add your repo URL]
- **Vercel Dashboard:** [vercel.com/dashboard](https://vercel.com/dashboard)

---

## ✅ Checklist Before Sharing

- [ ] Test all 3 roles
- [ ] Test on mobile
- [ ] No console errors
- [ ] Fast loading
- [ ] Professional appearance

---

**That's it! You're ready to go!** 🎉

Need more details? Check [README.md](./README.md)
