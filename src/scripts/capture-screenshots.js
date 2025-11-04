/**
 * Automated Screenshot Capture Script
 * Captures all 45 pages of LivestockWay TMS
 * 
 * Setup:
 * 1. npm install -D playwright
 * 2. npx playwright install
 * 3. npm run dev (in separate terminal)
 * 4. node scripts/capture-screenshots.js
 */

const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

// Create screenshots directory
const SCREENSHOTS_DIR = path.join(__dirname, '../screenshots');
if (!fs.existsSync(SCREENSHOTS_DIR)) {
  fs.mkdirSync(SCREENSHOTS_DIR, { recursive: true });
}

// Define all pages to capture
const PAGES = [
  // Public Pages
  { path: '/', name: '01-landing-page', waitFor: 3000 },
  { path: '/login', name: '02-login-page', waitFor: 2000 },
  { path: '/verification', name: '03-verification-page', waitFor: 2000 },
  { path: '/forgot-password', name: '04-forgot-password', waitFor: 2000 },
  { path: '/onboarding', name: '05-onboarding-wizard', waitFor: 2000, requiresAuth: true },
  
  // Hauler Pages (Green Theme)
  { path: '/hauler/dashboard', name: '06-hauler-dashboard', waitFor: 3000, requiresAuth: true, role: 'hauler' },
  { path: '/hauler/loadboard', name: '07-hauler-loadboard', waitFor: 3000, requiresAuth: true, role: 'hauler' },
  { path: '/hauler/fleet', name: '08-hauler-fleet', waitFor: 2000, requiresAuth: true, role: 'hauler' },
  { path: '/hauler/trips', name: '09-hauler-trips', waitFor: 2000, requiresAuth: true, role: 'hauler' },
  { path: '/hauler/earnings', name: '10-hauler-earnings', waitFor: 2000, requiresAuth: true, role: 'hauler' },
  { path: '/hauler/team', name: '11-hauler-team', waitFor: 2000, requiresAuth: true, role: 'hauler' },
  { path: '/hauler/marketplace', name: '12-hauler-marketplace', waitFor: 2000, requiresAuth: true, role: 'hauler' },
  { path: '/hauler/documents', name: '13-hauler-documents', waitFor: 2000, requiresAuth: true, role: 'hauler' },
  { path: '/hauler/settings', name: '14-hauler-settings', waitFor: 2000, requiresAuth: true, role: 'hauler' },
  { path: '/hauler/support', name: '15-hauler-support', waitFor: 2000, requiresAuth: true, role: 'hauler' },
  
  // Shipper Pages (Orange Theme)
  { path: '/shipper/dashboard', name: '16-shipper-dashboard', waitFor: 3000, requiresAuth: true, role: 'shipper' },
  { path: '/shipper/loads', name: '17-shipper-loads', waitFor: 2000, requiresAuth: true, role: 'shipper' },
  { path: '/shipper/loadboard', name: '18-shipper-loadboard', waitFor: 2000, requiresAuth: true, role: 'shipper' },
  { path: '/shipper/trips', name: '19-shipper-trips', waitFor: 2000, requiresAuth: true, role: 'shipper' },
  { path: '/shipper/payments', name: '20-shipper-payments', waitFor: 2000, requiresAuth: true, role: 'shipper' },
  { path: '/shipper/documents', name: '21-shipper-documents', waitFor: 2000, requiresAuth: true, role: 'shipper' },
  { path: '/shipper/marketplace', name: '22-shipper-marketplace', waitFor: 2000, requiresAuth: true, role: 'shipper' },
  { path: '/shipper/settings', name: '23-shipper-settings', waitFor: 2000, requiresAuth: true, role: 'shipper' },
  { path: '/shipper/support', name: '24-shipper-support', waitFor: 2000, requiresAuth: true, role: 'shipper' },
  
  // Driver Pages (Green Theme)
  { path: '/driver/dashboard', name: '25-driver-dashboard', waitFor: 3000, requiresAuth: true, role: 'driver' },
  { path: '/driver/trips', name: '26-driver-trips', waitFor: 2000, requiresAuth: true, role: 'driver' },
  { path: '/driver/expenses', name: '27-driver-expenses', waitFor: 2000, requiresAuth: true, role: 'driver' },
  { path: '/driver/documents', name: '28-driver-documents', waitFor: 2000, requiresAuth: true, role: 'driver' },
  { path: '/driver/settings', name: '29-driver-settings', waitFor: 2000, requiresAuth: true, role: 'driver' },
  { path: '/driver/support', name: '30-driver-support', waitFor: 2000, requiresAuth: true, role: 'driver' },
  
  // Stakeholder Pages (Gray Theme)
  { path: '/stakeholder/dashboard', name: '31-stakeholder-dashboard', waitFor: 3000, requiresAuth: true, role: 'stakeholder' },
  { path: '/stakeholder/marketplace', name: '32-stakeholder-marketplace', waitFor: 2000, requiresAuth: true, role: 'stakeholder' },
  { path: '/stakeholder/earnings', name: '33-stakeholder-earnings', waitFor: 2000, requiresAuth: true, role: 'stakeholder' },
  { path: '/stakeholder/documents', name: '34-stakeholder-documents', waitFor: 2000, requiresAuth: true, role: 'stakeholder' },
  { path: '/stakeholder/settings', name: '35-stakeholder-settings', waitFor: 2000, requiresAuth: true, role: 'stakeholder' },
  { path: '/stakeholder/support', name: '36-stakeholder-support', waitFor: 2000, requiresAuth: true, role: 'stakeholder' },
  
  // Super Admin Pages (Dark Blue Theme)
  { path: '/admin/dashboard', name: '37-admin-dashboard', waitFor: 3000, requiresAuth: true, role: 'super_admin' },
  { path: '/admin/marketplace', name: '38-admin-marketplace', waitFor: 2000, requiresAuth: true, role: 'super_admin' },
  { path: '/admin/support', name: '39-admin-support', waitFor: 2000, requiresAuth: true, role: 'super_admin' },
  { path: '/admin/settings', name: '40-admin-settings', waitFor: 2000, requiresAuth: true, role: 'super_admin' },
];

// Viewport sizes
const VIEWPORTS = [
  { name: 'desktop', width: 1920, height: 1080 },
  { name: 'tablet', width: 768, height: 1024 },
  { name: 'mobile', width: 375, height: 812 },
];

async function captureScreenshots() {
  console.log('🚀 Starting screenshot capture...\n');
  
  const browser = await chromium.launch({ headless: true });
  
  for (const viewport of VIEWPORTS) {
    console.log(`📱 Capturing ${viewport.name} screenshots (${viewport.width}x${viewport.height})`);
    
    const context = await browser.newContext({
      viewport: { width: viewport.width, height: viewport.height },
      deviceScaleFactor: 2, // Retina quality
    });
    
    const page = await context.newPage();
    
    // Set localStorage for authenticated pages
    await page.goto('http://localhost:5173');
    
    for (const pageConfig of PAGES) {
      try {
        console.log(`  📸 Capturing: ${pageConfig.name}`);
        
        // Set auth if needed
        if (pageConfig.requiresAuth && pageConfig.role) {
          await page.evaluate((role) => {
            localStorage.setItem('userRole', role);
            localStorage.setItem('isAuthenticated', 'true');
            localStorage.setItem('userEmail', `demo@${role}.com`);
            localStorage.setItem('welcomeDismissed', 'true');
          }, pageConfig.role);
        }
        
        // Navigate to page
        await page.goto(`http://localhost:5173${pageConfig.path}`, {
          waitUntil: 'networkidle',
          timeout: 30000,
        });
        
        // Wait for page to settle
        await page.waitForTimeout(pageConfig.waitFor || 2000);
        
        // Hide scrollbars for cleaner screenshots
        await page.addStyleTag({
          content: `
            * { scrollbar-width: none; }
            *::-webkit-scrollbar { display: none; }
          `
        });
        
        // Take screenshot
        const filename = `${pageConfig.name}-${viewport.name}.png`;
        await page.screenshot({
          path: path.join(SCREENSHOTS_DIR, filename),
          fullPage: false, // Capture viewport only
        });
        
        console.log(`    ✅ Saved: ${filename}`);
        
      } catch (error) {
        console.error(`    ❌ Failed to capture ${pageConfig.name}: ${error.message}`);
      }
    }
    
    await context.close();
    console.log(`\n✅ Completed ${viewport.name} screenshots\n`);
  }
  
  await browser.close();
  
  console.log(`\n🎉 Screenshot capture complete!`);
  console.log(`📁 Screenshots saved to: ${SCREENSHOTS_DIR}`);
  console.log(`📊 Total screenshots: ${PAGES.length * VIEWPORTS.length}`);
}

// Run the script
captureScreenshots().catch(error => {
  console.error('Fatal error:', error);
  process.exit(1);
});
