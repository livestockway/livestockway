# 🔧 Screenshot Tools Installation

## Quick Install (Copy & Paste)

```bash
# Install Playwright for automated screenshots
npm install -D playwright @playwright/test

# Install browsers
npx playwright install chromium

# Install html2canvas for manual capture
npm install html2canvas

# Create screenshots directory
mkdir -p screenshots
```

## Verify Installation

```bash
# Check if Playwright is installed
npx playwright --version

# Should output: Version 1.x.x
```

## Usage

### Automated (Recommended):

```bash
# Terminal 1: Start dev server
npm run dev

# Terminal 2: Run screenshot script
node scripts/capture-screenshots.js
```

### Manual (Browser-based):

1. Add to `App.tsx`:

```tsx
import { ScreenshotCapture } from './components/ScreenshotCapture';

function App() {
  return (
    <>
      {/* Your existing code */}
      
      {/* Screenshot tool (development only) */}
      {import.meta.env.DEV && <ScreenshotCapture enabled={true} />}
    </>
  );
}
```

2. Run dev server:
```bash
npm run dev
```

3. Navigate to each page and click "Capture" button

## Expected Output

After running the automated script:

```
screenshots/
├── 01-landing-page-desktop.png
├── 01-landing-page-tablet.png
├── 01-landing-page-mobile.png
├── 02-login-page-desktop.png
├── 02-login-page-tablet.png
├── 02-login-page-mobile.png
├── ... (120 total files)
```

## File Sizes

- Desktop screenshots: ~300-500 KB each
- Tablet screenshots: ~200-400 KB each
- Mobile screenshots: ~100-200 KB each
- **Total: ~40-60 MB** for all 120 screenshots

## Troubleshooting

### Error: "Cannot find module 'playwright'"

```bash
npm install -D playwright
npx playwright install chromium
```

### Error: "html2canvas is not defined"

```bash
npm install html2canvas
```

### Error: "ECONNREFUSED localhost:5173"

Make sure dev server is running:
```bash
npm run dev
```

### Screenshots are blank/white

Wait longer before capturing. Increase `waitFor` in script:

```javascript
{ path: '/hauler/dashboard', waitFor: 5000 } // Wait 5 seconds
```

## Alternative: Use Chrome DevTools

No installation needed!

1. Open page in Chrome
2. Press `Cmd+Shift+P` (Mac) or `Ctrl+Shift+P` (Windows)
3. Type "screenshot"
4. Select "Capture full size screenshot"
5. Save the PNG file

Repeat for all 45 pages.

## Cleaning Up

To remove screenshots:

```bash
rm -rf screenshots/
```

To uninstall tools:

```bash
npm uninstall playwright @playwright/test html2canvas
```

---

**You're ready to generate screenshots! 🚀**
