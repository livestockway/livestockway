# ⚡ Quick Deploy - LivestockWay TMS

**3-Step Deployment** - Your app is ready to go live!

---

## 🚀 Deploy in 3 Steps

### Method 1: Automated Script (Easiest!)

```bash
chmod +x deploy.sh
./deploy.sh
```

Follow the interactive prompts. Done! ✅

---

### Method 2: Vercel CLI (Fastest!)

```bash
npm install -g vercel
vercel login
vercel --prod
```

Your app will be live in 2 minutes! ✅

---

### Method 3: GitHub + Vercel (Recommended!)

```bash
# Step 1: Git setup
git init
git add .
git commit -m "🚀 Production ready"
git branch -M main

# Step 2: Create GitHub repo
# Go to: https://github.com/new
# Name: livestockway-tms

# Step 3: Push to GitHub
git remote add origin https://github.com/YOUR_USERNAME/livestockway-tms.git
git push -u origin main

# Step 4: Deploy on Vercel
# Go to: https://vercel.com
# Click "Add New Project"
# Import your GitHub repository
# Click "Deploy"
```

Your app will be live in 5 minutes! ✅

---

## ✅ Pre-Deploy Checklist

```bash
# 1. Install dependencies
npm install

# 2. Build (should succeed)
npm run build

# 3. Preview
npm run preview

# 4. Test at http://localhost:4173
# - Test all 3 roles
# - Test mobile responsive
# - Check console for errors
```

---

## 🧪 Test Credentials

Use these to test your deployed app:

```
Email: test@hauler.com (or any email)
Password: password123 (or anything)
OTP Code: 123456
```

---

## 📱 What to Test After Deploy

### Test Each Role:

**🟢 Hauler (Green Theme):**
1. Landing → Select Hauler
2. Signup → Complete onboarding (3 steps)
3. Dashboard loads with green theme
4. Click "Post Truck" → Complete 3-step form
5. Test all tabs (Loadboard, Fleet, Trips, Wallet, Profile)

**🟠 Shipper (Orange Theme):**
1. Landing → Select Shipper
2. Signup → Complete onboarding (3 steps)
3. Dashboard loads with orange theme
4. Click "Post Load" → Complete form
5. Test Quick Actions & bottom navigation

**⚫ Stakeholder (Gray Theme):**
1. Landing → Select Stakeholder
2. Signup → Complete onboarding (3 steps)
3. Dashboard loads with gray theme
4. Test all 4 tabs (Services, Marketplace, Jobs, Documents)

### Test Mobile:
- Open Chrome DevTools (F12)
- Toggle device toolbar (Cmd+Shift+M)
- Test iPhone 12 Pro
- Test iPad

---

## 🎯 Success Criteria

Your deployment is successful if:

- ✅ All 3 role flows work
- ✅ No console errors
- ✅ Mobile responsive
- ✅ Fast loading (<3s)
- ✅ All forms work

---

## 🐛 Troubleshooting

### Build fails?
```bash
rm -rf node_modules dist
npm install
npm run build
```

### White screen after deploy?
- Check browser console for errors
- Hard refresh: Cmd+Shift+R (Mac) or Ctrl+Shift+R (Windows)
- Clear LocalStorage: DevTools → Application → Storage → Clear All

### Routes show 404?
- Already fixed! Your `vercel.json` has correct SPA routing
- Redeploy if needed

---

## 📚 Full Documentation

- **DEPLOYMENT_SUMMARY.md** - What's been done
- **VERCEL_DEPLOY.md** - Detailed Vercel guide
- **TROUBLESHOOTING.md** - Common issues
- **PRODUCTION_READY.md** - Complete checklist
- **README.md** - Main documentation

---

## 📞 Quick Help

**Issue:** Build fails  
**Fix:** See TROUBLESHOOTING.md

**Issue:** Can't login after deploy  
**Fix:** Clear browser cache & LocalStorage

**Issue:** Mobile not responsive  
**Fix:** Already responsive! Test with real device

---

## 🎊 That's It!

Your LivestockWay TMS is now:
- ✅ Configured
- ✅ Optimized
- ✅ Documented
- ✅ Ready to deploy

**Choose a method above and deploy!** 🚀

---

**Deployment Time:** 2-5 minutes  
**Support:** Full documentation available  
**Version:** v0.1.0-phase-a  

---

Made with ❤️ and ready to launch! ⚡
