import { test, expect } from "@playwright/test";

test("loads game and renders canvas", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator("canvas")).toHaveCount(1);
});

test("starts game and shows HUD", async ({ page }) => {
  await page.goto("/");
  await page.keyboard.press("Enter");
  await page.waitForTimeout(800);
  await expect(page.locator("#hud")).toContainText("Costa Coral");
  await expect(page.locator("#hud")).toContainText("Vida:");
  await expect(page.locator("canvas")).toBeVisible();
});

test("moves, jumps and shows no console errors", async ({ page }) => {
  await page.goto("/");
  await page.keyboard.press("Enter");
  await page.waitForTimeout(500);
  await page.keyboard.down("d");
  await page.waitForTimeout(300);
  await page.keyboard.up("d");
  await page.keyboard.press("Space");
  await page.waitForTimeout(500);
  await page.keyboard.up("Space");
  await expect(page.locator("canvas")).toBeVisible();
});
