# 🧪 LivestockWay TMS - Testing Guide

**Phase A - Production Ready**  
**Last Updated:** November 2, 2025

---

## 🚀 Quick Start Testing

### **Step 1: Reset Everything**

Before testing, clear your browser:

1. Click **"Reset Demo"** button (top right, red text)
2. OR manually clear:
   - Press `F12` → Application tab → Local Storage → Clear
   - Hard refresh: `Ctrl+Shift+R` (Windows) or `Cmd+Shift+R` (Mac)

---

## 📱 Test All 5 User Roles

### **1. Hauler (Truck Owner) - Green Theme**

**Email Login:**
```
1. Landing page → Click "Hauler" card (green)
2. Sign In tab
3. Email tab (default)
4. Email: test@hauler.com
5. Password: anything
6. Click "Sign In"
7. ✅ See Onboarding Wizard (3 steps)
8. ✅ Complete → Green Hauler Dashboard
```

**Phone Login:**
```
1. Landing page → Click "Hauler" card
2. Sign In tab
3. Phone tab
4. Phone: +1 555 000 0000
5. Click "Send OTP"
6. ✅ See "Logging in as: hauler"
7. Enter OTP: 123456
8. Click "Verify"
9. ✅ See Onboarding Wizard
10. ✅ Complete → Green Hauler Dashboard
```

**Key Features to Test:**
- ✅ Post Truck Dialog (Quick Actions)
- ✅ Active Loads tab
- ✅ Available Loads tab (bid on loads)
- ✅ Fleet Management
- ✅ Wallet/earnings
- ✅ Green color theme throughout

---

### **2. Shipper (Farm Owner) - Orange Theme**

**Email Login:**
```
1. Landing page → Click "Shipper" card (orange)
2. Sign In tab
3. Email: test@shipper.com
4. Password: anything
5. Sign In
6. ✅ Onboarding Wizard
7. ✅ Orange Shipper Dashboard
```

**Phone Login:**
```
1. Landing → Shipper card
2. Sign In → Phone tab
3. Phone: +1 555 111 1111
4. Send OTP → See "Logging in as: shipper"
5. OTP: 123456 → Verify
6. ✅ Onboarding → Orange Dashboard
```

**Key Features to Test:**
- ✅ Post Load Dialog (Quick Actions)
- ✅ My Loads tab (loads you posted)
- ✅ Active Shipments
- ✅ Browse hauler bids
- ✅ Accept/reject bids
- ✅ Orange color theme

---

### **3. Stakeholder (Service Provider) - Gray Theme**

**Email Login:**
```
1. Landing → "Stakeholder" card (gray/wrench icon)
2. Sign In tab
3. Email: test@stakeholder.com
4. Password: anything
5. Sign In
6. ✅ Onboarding Wizard
7. ✅ Gray Stakeholder Dashboard
```

**Phone Login:**
```
1. Landing → Stakeholder card
2. Sign In → Phone tab
3. Phone: +1 555 222 2222
4. Send OTP → See "Logging in as: stakeholder"
5. OTP: 123456
6. ✅ Wizard → Gray Dashboard
```

**Key Features to Test:**
- ✅ Marketplace tab (browse jobs)
- ✅ My Services tab
- ✅ Post service listings
- ✅ Job listings (washout, vet, feed)
- ✅ Gray/neutral theme

---

### **4. Driver - Green Theme (No Wizard)**

**Login (Direct to Dashboard):**
```
1. Landing → "Already have an account?"
2. Sign In tab
3. Select "Driver" from role dropdown ⭐
4. Email: test@driver.com
5. Password: anything
6. Sign In
7. ✅ Skip wizard → Direct to Driver Dashboard
```

**Key Features to Test:**
- ✅ No onboarding wizard (goes straight to dashboard)
- ✅ Active trips view
- ✅ Trip tracking/GPS
- ✅ Trip chat
- ✅ Expense tracking
- ✅ Green theme (driver = hauler employee)

---

### **5. Super Admin - Dark Blue Theme (No Wizard)**

**Login (Direct to Dashboard):**
```
1. Landing → "Already have an account?"
2. Sign In tab
3. Select "Super Admin" from role dropdown ⭐
4. Email: admin@livestock.com
5. Password: anything
6. Sign In
7. ✅ Skip wizard → Direct to Admin Dashboard
```

**Key Features to Test:**
- ✅ No onboarding wizard
- ✅ System analytics
- ✅ User management
- ✅ Platform overview
- ✅ Dark blue (#172039) theme

---

## 🔄 Role Switching

Only **Shipper** and **Driver** can switch roles:

**Test Role Switch:**
```
1. Log in as Shipper
2. Top bar → Click dropdown with name/role
3. Select "Switch to Driver"
4. ✅ Dashboard changes to Driver view
5. Switch back to Shipper
6. ✅ Returns to Shipper dashboard
```

**Note:** Haulers, Stakeholders, and Admins cannot switch roles.

---

## 🎯 Critical Flows to Test

### **Flow 1: Hauler Bids on Shipper Load**

**As Shipper:**
```
1. Login as Shipper
2. Click "Post Load" (Quick Actions)
3. Fill in: Houston, TX → Dallas, TX
4. 50 cattle, Pickup: Today
5. Submit load
6. ✅ Load appears in "My Loads" tab
```

**As Hauler:**
```
1. Logout → Login as Hauler
2. "Available Loads" tab
3. Find the load you posted
4. Click "Place Bid"
5. Enter bid amount: $500
6. Submit bid
7. ✅ Load moves to "Active Loads" (pending)
```

**Back to Shipper:**
```
1. Logout → Login as Shipper
2. "My Loads" tab
3. Find your load
4. See bid from hauler
5. Click "Accept Bid"
6. ✅ Load status → Active
```

---

### **Flow 2: Driver Tracks Trip**

**As Driver:**
```
1. Login as Driver
2. Active Trips tab
3. Click on a trip
4. ✅ See trip details
5. ✅ See GPS tracking map
6. ✅ Open chat with shipper
7. ✅ Add expense (fuel, tolls)
8. ✅ Mark checkpoints complete
```

---

### **Flow 3: Stakeholder Posts Service**

**As Stakeholder:**
```
1. Login as Stakeholder
2. "My Services" tab
3. Click "Add New Service"
4. Service: Livestock Washout
5. Location: Kansas City, MO
6. Price: $200
7. Submit
8. ✅ Service appears in marketplace
```

---

## 🎨 Theme Verification

### Color Codes to Verify:

- **Hauler:** `#29CA8D` (Green)
  - Buttons, highlights, CTAs
  
- **Shipper:** `#F97316` (Orange)
  - Buttons, highlights, CTAs
  
- **Stakeholder:** `#6B7280` (Gray)
  - Buttons, highlights, neutral
  
- **Driver:** `#29CA8D` (Green, same as Hauler)
  - Drivers work for haulers
  
- **Admin:** `#172039` (Dark Blue)
  - Admin dashboard theme

---

## 🐛 Known Issues & Solutions

### Issue: White Screen After Login

**Solution:**
1. Click "Reset Demo" (top right)
2. Clear localStorage (F12 → Application)
3. Hard refresh (Ctrl+Shift+R)
4. Make sure you **SELECT A ROLE** before signing in

---

### Issue: "No Role Selected" Error

**Solution:**
1. Click "Back to Login" button on error screen
2. OR click "Reset Everything"
3. Select a role from dropdown before signing in
4. Both email and phone login require role selection

---

### Issue: Can't Reset Demo

**Solution:**
- "Reset Demo" button is always visible (top right, red text)
- If stuck, manually clear localStorage:
  - F12 → Application → Local Storage → Clear
  - Refresh page

---

## 📊 Feature Checklist

### All Roles:
- [ ] Landing page loads
- [ ] Role cards clickable
- [ ] Login with email works
- [ ] Login with phone OTP works
- [ ] Logout works
- [ ] Reset Demo works
- [ ] Theme toggle (dark mode)
- [ ] Notifications center
- [ ] Profile settings

### Hauler:
- [ ] Onboarding wizard (3 steps)
- [ ] Green theme
- [ ] Post Truck dialog
- [ ] Active Loads tab
- [ ] Available Loads tab
- [ ] Place bids on loads
- [ ] Fleet management
- [ ] Wallet/earnings

### Shipper:
- [ ] Onboarding wizard (3 steps)
- [ ] Orange theme
- [ ] Post Load dialog
- [ ] My Loads tab
- [ ] Active Shipments tab
- [ ] View bids
- [ ] Accept/reject bids
- [ ] Role switch to Driver

### Stakeholder:
- [ ] Onboarding wizard (3 steps)
- [ ] Gray theme
- [ ] Marketplace tab
- [ ] My Services tab
- [ ] Post services
- [ ] Browse job listings

### Driver:
- [ ] No wizard (direct to dashboard)
- [ ] Green theme
- [ ] Active trips view
- [ ] Trip tracking
- [ ] GPS map
- [ ] Trip chat
- [ ] Expense tracking
- [ ] Role switch to Shipper

### Super Admin:
- [ ] No wizard (direct to dashboard)
- [ ] Dark blue theme
- [ ] Analytics dashboard
- [ ] User management
- [ ] System overview

---

## 🔍 Console Debugging

Open console (F12) to see:

```
🔐 Login: hauler
📱 Need verification - contact: +1555... role: shipper
✅ Verification complete - applying pending role: stakeholder
```

These emoji logs help debug the auth flow!

---

## ✅ Success Criteria

**Phase A is working if:**

1. ✅ All 5 roles can log in (email + phone)
2. ✅ Correct dashboards load for each role
3. ✅ Onboarding wizards show for Hauler/Shipper/Stakeholder
4. ✅ No wizards for Driver/Admin
5. ✅ Color themes match specifications
6. ✅ Role switching works (Shipper ↔ Driver)
7. ✅ Post Load/Truck dialogs work
8. ✅ Bidding system works
9. ✅ Reset Demo always works
10. ✅ No white screen bugs

---

## 🎉 You're Done!

If all the above tests pass, **Phase A is production ready!**

**Next Steps:**
- Deploy to Vercel (see DEPLOY.md)
- Run full QA suite
- Gather user feedback
- Plan Phase B features

---

**Questions?** Check:
- `README.md` - Project overview
- `FEATURES.md` - Complete feature list
- `BUGFIX_*.md` - Recent bug fixes
- `DEPLOY.md` - Deployment guide

---

**Happy Testing! 🚀**
