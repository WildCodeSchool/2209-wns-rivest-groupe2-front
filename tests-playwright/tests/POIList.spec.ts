import { test, expect } from '@playwright/test';

test('homepage has select modal & go to POIList page', async ({ page }) => {
  await page.goto('https://rivest2.wns.wilders.dev/');
  await expect(page.locator('id=select a city')).toHaveValue('ville');
  await page.locator('id=select a city').click();
  await page.locator('id=select a city').selectOption('Paris');
  await expect(page).toHaveURL('http://localhost:3000/point-of-interest/list');
});

test.describe('POIList Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://rivest2.wns.wilders.dev/');
    await page.locator('id=select a city').click();
    await page.locator('id=select a city').selectOption('Paris');
  });
  test('should have a list of POI in the select city equals to the text result', async ({
    page,
  }) => {
    const POIList = page.locator('id=poi-list');
    const POICount = await POIList.getByRole('link').count();
    await expect(page.locator('id=results-number')).toContainText(
      `${POICount}`
    );
  });
  test('should display a map', async ({ page }) => {
    await expect(page.locator('id=map-container')).toBeVisible();
  });
  test('should display a map with the right number of marker(s)', async ({
    page,
  }) => {
    await expect(page.locator('id=map-container')).toBeVisible();
    const POIList = page.locator('id=poi-list');
    const POICount = await POIList.getByRole('link').count();
    await expect(page.locator('div.map-marker')).toHaveCount(POICount);
  });
});
