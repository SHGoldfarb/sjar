import { test, expect } from "@playwright/test";

test("Create, update and delete", async ({ page }) => {
  const accountButton = (accountName: string) =>
    page.locator("a", { hasText: accountName });

  await page.goto("/accounts");

  // Create
  await page.getByText("+", { exact: true }).click();

  const accountName = "Checking Account";
  await page.locator("input").fill(accountName);
  await page.getByText("Save").click();

  await expect(accountButton(accountName)).toBeVisible();

  //  Update
  await accountButton(accountName).click();

  const newAccountName = "Wallet";
  await page.locator("input").fill(newAccountName);
  await page.getByText("Save").click();

  await expect(accountButton(newAccountName)).toBeVisible();

  //  Delete
  await accountButton(newAccountName).click();
  await page.getByText("Delete").click();
  await expect(page.getByText("+", { exact: true })).toBeVisible();
  await expect(accountButton(newAccountName)).not.toBeVisible();
});
