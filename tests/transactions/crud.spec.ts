import { expect } from "@playwright/test";
import { test } from "../fixtures";
import { CLP } from "@/app/page/components/amount/currency";

test("Create, read, update and delete transaction", async ({
  page,
  createJar,
  createAccount,
  transactionsPage,
  transactionFormPage,
}) => {
  const { name: jarName } = await createJar();
  const { name: accountName } = await createAccount();
  const amount = 3000;

  // Create
  await transactionsPage.navigate();
  await transactionsPage.createButton.click();
  await transactionFormPage.selectJar(jarName);
  await transactionFormPage.selectAccount(accountName);
  await transactionFormPage.amountInput.fill(amount.toString());
  await transactionFormPage.saveButton.click();

  //Read

  // TODO: date
  await expect(transactionsPage.createButton).toBeVisible();
  await expect(page.getByText(jarName)).toBeVisible();
  await expect(page.getByText(accountName)).toBeVisible();
  await expect(page.getByText(CLP(0))).toBeVisible(); // total income
  expect(await page.getByText(CLP(amount)).all()).toHaveLength(2); // Transaction and total expense

  //  Update

  //  Delete
});
