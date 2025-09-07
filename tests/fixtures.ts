import { test as base, Page } from "@playwright/test";
import { faker } from "@faker-js/faker";

const createTransactionsPage = ({ page }: { page: Page }) => {
  const navigate = () => page.goto("/");
  const createButton = page.getByText("+", { exact: true });
  return { navigate, createButton };
};

const createTransactionFormPage = ({ page }: { page: Page }) => {
  const selectJar = async (jarName: string) => {
    await page.getByText("Jar", { exact: true }).click();
    await page.locator("span").and(page.getByText(jarName)).click();
  };
  const selectAccount = async (accountName: string) => {
    await page.getByText("Account", { exact: true }).click();
    await page.locator("span").and(page.getByText(accountName)).click();
  };
  const amountInput = page.getByPlaceholder("Amount");
  const saveButton = page.getByText("Save");
  return { selectJar, selectAccount, amountInput, saveButton };
};

export const test = base.extend<{
  createJar: () => Promise<{ name: string }>;
  createAccount: () => Promise<{ name: string }>;
  transactionsPage: ReturnType<typeof createTransactionsPage>;
  transactionFormPage: ReturnType<typeof createTransactionFormPage>;
}>({
  createJar: async ({ page }, provide) => {
    await provide(async (name?: string) => {
      await page.goto("/jars");

      await page.getByText("+", { exact: true }).click();

      const jarName = name || faker.food.dish();
      await page.locator("input").fill(jarName);
      await page.getByText("Save").click();

      return { name: jarName };
    });
  },

  createAccount: async ({ page }, provide) => {
    await provide(async (name?: string) => {
      await page.goto("/accounts");

      await page.getByText("+", { exact: true }).click();

      const accountName = name || faker.food.ingredient();
      await page.locator("input").fill(accountName);
      await page.getByText("Save").click();

      return { name: accountName };
    });
  },

  transactionsPage: async ({ page }, provide) => {
    await provide(createTransactionsPage({ page }));
  },

  transactionFormPage: async ({ page }, provide) => {
    await provide(createTransactionFormPage({ page }));
  },
});
