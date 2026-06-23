import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  // Capture console logs and errors
  const logs = [];
  page.on('console', msg => logs.push(`[console.${msg.type()}] ${msg.text()}`));
  page.on('pageerror', err => logs.push(`[pageerror] ${err.message}`));
  page.on('requestfailed', req => logs.push(`[requestfailed] ${req.url()} - ${req.failure()?.errorMessage || ''}`));

  try {
    console.log('Navigating to login page...');
    await page.goto('http://localhost:3000/login', { waitUntil: 'networkidle' });

    // Check the page title and form
    const title = await page.title();
    console.log(`Page title: ${title}`);

    const emailInput = await page.locator('input[type="email"]').first();
    if (await emailInput.isVisible()) {
      console.log('Email input found');
    }

    // Fill in a test email and submit
    const testEmail = `test-${Date.now()}@example.com`;
    console.log(`Submitting email: ${testEmail}`);
    await emailInput.fill(testEmail);
    await page.locator('button[type="submit"]').first().click();

    // Wait for either success or error state (up to 10s)
    await page.waitForTimeout(3000);

    const pageText = await page.locator('body').innerText();
    console.log('--- Page text after submit ---');
    console.log(pageText.slice(0, 2000));

    const screenshotPath = `/Users/crazy/X/AIweb/login-test-${Date.now()}.png`;
    await page.screenshot({ path: screenshotPath, fullPage: true });
    console.log(`Screenshot saved to: ${screenshotPath}`);

    console.log('--- Browser logs ---');
    logs.forEach(log => console.log(log));

  } catch (err) {
    console.error('Test error:', err.message);
    await page.screenshot({ path: '/Users/crazy/X/AIweb/login-test-error.png', fullPage: true });
  } finally {
    await browser.close();
  }
})();
