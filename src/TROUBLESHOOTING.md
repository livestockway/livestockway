# 🔧 Troubleshooting Guide - LivestockWay TMS

Quick fixes for common issues during development and deployment.

---

## 🚨 Critical Issues

### Issue: White Screen After Login

**Symptoms:**
- User logs in successfully
- Screen goes blank/white
- No error messages
- Browser console may show routing errors

**Cause:**
- Role without onboarding wizard tries to access `/onboarding`
- Router can't find dashboard route
- Missing dashboard component

**Solution:**
✅ **Already Fixed in Current Version!**

The AppRouter now properly handles roles:
- Roles with wizards (hauler, shipper, stakeholder) → Onboarding
- Roles without wizards (driver, super-admin) → Direct to dashboard

If you still see this:
1. Clear LocalStorage: Open DevTools → Application → Storage → Clear All
2. Hard refresh: `Cmd+Shift+R` (Mac) or `Ctrl+Shift+R` (Windows)
3. Verify you're using the latest code

---

### Issue: Routes Not Working / 404 Errors

**Symptoms:**
- Direct navigation to `/dashboard` shows 404
- Refresh on any route except `/` shows 404
- "Page not found" error

**Cause:**
- Missing SPA routing configuration
- Server trying to find physical files

**Solution:**
✅ **Already Fixed!**

Your `vercel.json` has the correct configuration:
```json
"rewrites": [
  {
    "source": "/(.*)",
    "destination": "/index.html"
  }
]
```

This redirects all routes to `index.html`, letting React Router handle routing.

**If still broken:**
1. Verify `vercel.json` exists in project root
2. Check if you're testing locally (use `npm run dev`, not `open index.html`)
3. Redeploy to Vercel

---

### Issue: Role Selection Not Persisting

**Symptoms:**
- User selects role on landing page
- After login, role is forgotten
- User sent back to role selection

**Cause:**
- LocalStorage not being set
- Race condition in state management
- Browser blocking LocalStorage (private mode)

**Solution:**
✅ **Already Fixed!**

The current implementation properly saves role:
```typescript
storage.set(STORAGE_KEYS.USER_ROLE, selectedRole);
storage.set(STORAGE_KEYS.USER_EMAIL, email);
```

**If still broken:**
1. Check if browser allows LocalStorage: `typeof localStorage !== 'undefined'`
2. Disable private/incognito mode
3. Clear LocalStorage and try again
4. Check browser console for errors

---

## 🐛 Build & Development Issues

### Issue: npm install Fails

**Error:**
```
npm ERR! code ERESOLVE
npm ERR! ERESOLVE unable to resolve dependency tree
```

**Solution:**
```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and lock file
rm -rf node_modules package-lock.json

# Reinstall
npm install

# If still fails, try legacy peer deps
npm install --legacy-peer-deps
```

---

### Issue: Build Fails with TypeScript Errors

**Error:**
```
src/components/Dashboard.tsx:45:10 - error TS2741:
Property 'id' is missing in type...
```

**Solution:**
```bash
# Check TypeScript errors
npm run type-check

# Fix type errors in the reported files
# Common fixes:
# 1. Add missing properties
# 2. Make properties optional with `?`
# 3. Add `any` type temporarily (not recommended)

# Test build again
npm run build
```

**Quick bypass (not recommended for production):**
```typescript
// tsconfig.json
{
  "compilerOptions": {
    "strict": false, // Temporarily disable strict mode
  }
}
```

---

### Issue: Vite Dev Server Won't Start

**Error:**
```
Error: Cannot find module 'vite'
```

**Solution:**
```bash
# Ensure vite is installed
npm install vite --save-dev

# Start dev server
npm run dev

# If port 5173 is in use
npm run dev -- --port 3000
```

---

### Issue: Hot Module Replacement (HMR) Not Working

**Symptoms:**
- Changes don't reflect without manual refresh
- Vite says "HMR update failed"

**Solution:**
```bash
# Stop dev server (Ctrl+C)
# Clear cache
rm -rf node_modules/.vite

# Restart
npm run dev
```

In `vite.config.ts`, ensure:
```typescript
server: {
  hmr: {
    overlay: true,
  },
},
```

---

## 🎨 UI & Styling Issues

### Issue: Tailwind Classes Not Working

**Symptoms:**
- Classes like `bg-blue-500` have no effect
- Styles appear unstyled
- Console shows no errors

**Cause:**
- Tailwind not properly configured
- CSS not imported
- Purge/content path wrong

**Solution:**

1. Verify `styles/globals.css` is imported in `main.tsx`:
```typescript
import '../styles/globals.css';
```

2. Check `tailwind.config.js` (if using Tailwind 3.x):
```javascript
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
};
```

3. For Tailwind 4.0 (current project):
   - No config needed!
   - Import Tailwind in CSS: `@import "tailwindcss";`

4. Restart dev server

---

### Issue: Dark Mode Not Working

**Symptoms:**
- Toggle doesn't switch theme
- Theme reverts on refresh
- System preference not detected

**Solution:**

1. Check `lib/theme.ts` exists and is properly implemented
2. Verify `initializeTheme()` is called in `App.tsx`:
```typescript
useEffect(() => {
  initializeTheme();
}, []);
```

3. Check if `dark` class is added to `<html>` element:
```typescript
// Open DevTools, check:
document.documentElement.classList.contains('dark'); // should be true in dark mode
```

4. Verify `globals.css` has dark mode styles:
```css
.dark {
  --background: 222.2 84% 4.9%;
  --foreground: 210 40% 98%;
  /* ... */
}
```

---

### Issue: Icons Not Showing

**Symptoms:**
- Lucide icons don't render
- Console error: "Cannot find module 'lucide-react'"

**Solution:**
```bash
# Install lucide-react
npm install lucide-react

# Import correctly
import { Truck, Package, Users } from 'lucide-react';

# Use in JSX
<Truck className="w-5 h-5" />
```

---

## 📱 Mobile & Responsive Issues

### Issue: Layout Broken on Mobile

**Symptoms:**
- Content overflows screen
- Buttons too small to tap
- Text too small to read

**Solution:**

1. Add viewport meta tag to `index.html`:
```html
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
```

2. Use responsive Tailwind classes:
```typescript
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
  {/* Content */}
</div>
```

3. Ensure touch targets are ≥48px:
```typescript
<button className="min-h-[48px] min-w-[48px]">
```

4. Test with Chrome DevTools device toolbar (Cmd+Shift+M)

---

### Issue: Scrolling Issues on iOS Safari

**Symptoms:**
- Page won't scroll
- Rubber band effect broken
- Fixed elements don't stay fixed

**Solution:**

1. Avoid `position: fixed` on iOS (use sticky instead)
2. Add `-webkit-overflow-scrolling: touch`
3. Ensure body has proper height:
```css
html, body, #root {
  height: 100%;
  overflow-y: auto;
}
```

---

## 🔐 Authentication Issues

### Issue: Login Doesn't Work

**Symptoms:**
- Submit button does nothing
- Error message not shown
- Console shows form validation errors

**Solution:**

1. Check form validation in `Login.tsx`:
```typescript
const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault(); // IMPORTANT!
  // ... rest of logic
};
```

2. Verify email/password fields have proper `name` attributes
3. Check if `storage.set()` is being called:
```typescript
storage.set(STORAGE_KEYS.USER_EMAIL, email);
storage.set(STORAGE_KEYS.USER_ROLE, role);
```

4. Open DevTools → Application → LocalStorage → verify data is saved

---

### Issue: OTP Verification Always Fails

**Symptoms:**
- Entering `123456` doesn't work
- Stuck on verification screen
- No error message

**Cause:**
- Hardcoded OTP check wrong
- Input not reading values
- Form not submitting

**Solution:**

✅ **Current implementation accepts any 6-digit code!**

If broken, check `Verification.tsx`:
```typescript
const handleVerify = () => {
  if (code.length === 6) {
    // Accept any 6-digit code
    onVerified();
  }
};
```

For strict check (123456 only):
```typescript
if (code === '123456') {
  onVerified();
} else {
  toast.error('Invalid code');
}
```

---

### Issue: Logout Doesn't Work

**Symptoms:**
- Click logout, still on dashboard
- Refresh shows user still logged in

**Solution:**

Check `AppRouter.tsx` logout handler:
```typescript
const handleLogout = () => {
  storage.remove(STORAGE_KEYS.USER_ROLE);
  storage.remove(STORAGE_KEYS.USER_EMAIL);
  storage.set(STORAGE_KEYS.WELCOME_DISMISSED, false);
  setIsAuthenticated(false);
  setUserRole(null);
  navigate('/');
};
```

Ensure all storage keys are cleared!

---

## 🚀 Deployment Issues

### Issue: Vercel Build Fails

**Error:**
```
Error: Build failed with exit code 1
```

**Solution:**

1. Check build logs on Vercel dashboard
2. Test build locally first:
```bash
npm run build
```

3. Common causes:
   - TypeScript errors → Fix or disable strict mode temporarily
   - Missing dependencies → Check `package.json`
   - Environment variables → Add to Vercel settings

4. Ensure `vercel.json` is correct (should be, but verify)

---

### Issue: Deployed App Shows Blank Page

**Symptoms:**
- Local build works
- Vercel deployment shows white screen
- No console errors (or can't see them)

**Solution:**

1. Check Vercel function logs:
   - Go to project → Functions → View logs
   
2. Verify build output:
   - Check if `dist` folder contains files
   - Ensure `index.html` exists in `dist`

3. Check `index.html` script path:
```html
<script type="module" src="/src/main.tsx"></script>
```

4. Verify `vite.config.ts` output directory:
```typescript
build: {
  outDir: 'dist',
},
```

---

### Issue: Assets Not Loading on Vercel

**Symptoms:**
- Images/fonts 404
- SVGs don't show
- CSS not applied

**Solution:**

1. Ensure assets are in `/public` folder
2. Use absolute paths:
```typescript
<img src="/livestock-icon.svg" alt="Logo" />
```

NOT:
```typescript
<img src="./livestock-icon.svg" alt="Logo" />
```

3. Check Vercel asset path in build logs
4. Verify `base` in `vite.config.ts` (should not be set for Vercel)

---

## 💾 Data & Storage Issues

### Issue: Data Doesn't Persist

**Symptoms:**
- User logs in, data saved
- Refresh page, data gone
- Have to login again

**Cause:**
- LocalStorage not working
- Browser in private mode
- Storage quota exceeded

**Solution:**

1. Check if LocalStorage is available:
```typescript
if (typeof localStorage !== 'undefined') {
  localStorage.setItem('test', 'test');
}
```

2. Disable private/incognito mode
3. Clear storage if full:
```typescript
localStorage.clear();
```

4. Check storage usage:
```javascript
// In browser console
console.log(JSON.stringify(localStorage).length);
// If > 5MB, storage is almost full
```

---

### Issue: LocalStorage Quota Exceeded

**Error:**
```
QuotaExceededError: Failed to execute 'setItem' on 'Storage'
```

**Solution:**

1. Clear old data:
```typescript
const storage = {
  clear: () => {
    Object.keys(localStorage).forEach(key => {
      if (key.startsWith('livestockway_')) {
        localStorage.removeItem(key);
      }
    });
  },
};
```

2. Implement data compression (for Phase B)
3. Move to IndexedDB for large data
4. Use Supabase for cloud storage (Phase B)

---

## 🎯 Component-Specific Issues

### Issue: PostTruckDialog Won't Open

**Symptoms:**
- Click "Post Truck" button
- Nothing happens
- No console errors

**Solution:**

Check `HaulerDashboard.tsx`:
```typescript
const [showPostTruck, setShowPostTruck] = useState(false);

// Button should have:
<button onClick={() => setShowPostTruck(true)}>

// Dialog should have:
<PostTruckDialog 
  open={showPostTruck} 
  onClose={() => setShowPostTruck(false)} 
/>
```

---

### Issue: Loadboard Filters Don't Work

**Symptoms:**
- Apply filters, no results change
- Search doesn't filter
- Filters reset on click

**Solution:**

Check `Loadboard.tsx` filter logic:
```typescript
const filteredLoads = loads.filter(load => {
  // Check each filter
  if (filters.search && !load.route.includes(filters.search)) {
    return false;
  }
  if (filters.type && load.type !== filters.type) {
    return false;
  }
  return true;
});
```

Ensure filters are properly passed to filter function.

---

### Issue: Dashboard Not Showing Correct Role Theme

**Symptoms:**
- Hauler dashboard shows orange instead of green
- Colors don't match role
- Theme inconsistent

**Solution:**

Check role-based theme classes:
```typescript
// HaulerDashboard.tsx - should have:
<div className="bg-[#29CA8D]"> // Green

// ShipperDashboard.tsx - should have:
<div className="bg-[#F97316]"> // Orange

// StakeholderDashboard.tsx - should have:
<div className="bg-[#6B7280]"> // Gray
```

Verify role is correctly passed to dashboard components.

---

## 🔍 Debugging Tips

### Enable Verbose Logging

Add to `App.tsx`:
```typescript
if (import.meta.env.DEV) {
  console.log('Environment:', import.meta.env.MODE);
  console.log('User Role:', storage.get('USER_ROLE'));
  console.log('Is Authenticated:', !!storage.get('USER_ROLE'));
}
```

### React DevTools

Install React DevTools extension:
- Check component props
- View component tree
- Inspect hooks state

### Network Tab

Check Network tab in DevTools:
- Verify assets load (200 status)
- Check request/response
- Look for 404 errors

### Console Errors

Common console errors and fixes:

**Error:** `Uncaught TypeError: Cannot read property 'map' of undefined`
**Fix:** Add optional chaining: `data?.map(...)` or default value: `(data || []).map(...)`

**Error:** `Warning: Each child in a list should have a unique "key" prop`
**Fix:** Add key to mapped elements: `{items.map((item) => <div key={item.id}>)}`

**Error:** `Warning: Can't perform a React state update on an unmounted component`
**Fix:** Cancel async operations in useEffect cleanup:
```typescript
useEffect(() => {
  let cancelled = false;
  
  fetchData().then(data => {
    if (!cancelled) setState(data);
  });
  
  return () => { cancelled = true; };
}, []);
```

---

## 📞 Still Stuck?

### Quick Fixes to Try

1. **Nuclear Option:**
```bash
rm -rf node_modules dist .vite
npm install
npm run dev
```

2. **Clear Everything:**
```bash
# Browser: DevTools → Application → Clear All
# Terminal:
npm cache clean --force
rm -rf node_modules package-lock.json dist
npm install
```

3. **Reset Git:**
```bash
git stash
git pull origin main
npm install
npm run dev
```

### Check Documentation

- [QUICK_FIX_REFERENCE.md](./QUICK_FIX_REFERENCE.md) - Common fixes
- [TESTING_GUIDE.md](./TESTING_GUIDE.md) - Test scenarios
- [DEPLOY.md](./DEPLOY.md) - Deployment guide
- [PHASE_A_STATUS.md](./PHASE_A_STATUS.md) - Implementation status

### Community Support

- React: [react.dev/community](https://react.dev/community)
- Vite: [vitejs.dev/guide](https://vitejs.dev/guide)
- Vercel: [vercel.com/docs](https://vercel.com/docs)

---

## 🎉 Issue Resolved?

If you fixed an issue not listed here, please document it for the team!

---

**Last Updated:** November 3, 2025  
**Version:** Phase A (v0.1.0)
