import { test, expect } from "@playwright/test";

test("Create, update and delete", async ({ page }) => {
  const jarButton = (jarName: string) =>
    page.locator("a", { hasText: jarName });

  await page.goto("/jars");

  // Create
  await page.getByText("+", { exact: true }).click();

  const jarName = "New Car";
  await page.locator("input").fill(jarName);
  await page.getByText("Save").click();

  await expect(jarButton(jarName)).toBeVisible();

  //  Update
  await jarButton(jarName).click();

  const newJarName = "House Bills";
  await page.locator("input").fill(newJarName);
  await page.getByText("Save").click();

  await expect(jarButton(newJarName)).toBeVisible();

  //  Delete
  await jarButton(newJarName).click();
  await page.getByText("Delete").click();
  await expect(page.getByText("+", { exact: true })).toBeVisible();
  await expect(jarButton(newJarName)).not.toBeVisible();
});
