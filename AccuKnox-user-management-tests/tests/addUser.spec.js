

const { test, expect } = require("@playwright/test");
const { LoginPage } = require("../pages/loginPage");
const { AdminPage } = require("../pages/adminPage");

let username = "";
const password = "Password123!";

test.describe("User Management Automation", () => {

  test.beforeAll(async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();

    const login = new LoginPage(page);
    const admin = new AdminPage(page);

    await page.goto("https://opensource-demo.orangehrmlive.com/");
    await login.login("Admin", "admin123");
    await admin.openAdminModule();

    username = "user" + Math.floor(Math.random() * 10000);
    await admin.addUser(username, password);

    await context.close();
  });

  test("1️⃣ Add new user (validated by beforeAll)", async ({ page }) => {
    const login = new LoginPage(page);
    const admin = new AdminPage(page);

    await page.goto("https://opensource-demo.orangehrmlive.com/");
    await login.login("Admin", "admin123");
    await admin.openAdminModule();

    const exists = await admin.isUserPresent(username);
    expect(exists).toBeTruthy();
  });

  test("2️⃣ Search newly created user", async ({ page }) => {
    const login = new LoginPage(page);
    const admin = new AdminPage(page);

    await page.goto("https://opensource-demo.orangehrmlive.com/");
    await login.login("Admin", "admin123");
    await admin.openAdminModule();

    await admin.searchUser(username);
    await expect(page.getByText(username)).toBeVisible();
  });

  test("3️⃣ Edit user details", async ({ page }) => {
    const login = new LoginPage(page);
    const admin = new AdminPage(page);

    await page.goto("https://opensource-demo.orangehrmlive.com/");
    await login.login("Admin", "admin123");
    await admin.openAdminModule();

    await admin.editUser(username, "Disabled");
  });

  test("4️⃣ Validate updated details", async ({ page }) => {
    const login = new LoginPage(page);
    const admin = new AdminPage(page);

    await page.goto("https://opensource-demo.orangehrmlive.com/");
    await login.login("Admin", "admin123");
    await admin.openAdminModule();

    await admin.searchUser(username);
    await expect(page.getByText("Disabled")).toBeVisible();
  });

  test("5️⃣ Delete user", async ({ page }) => {
    const login = new LoginPage(page);
    const admin = new AdminPage(page);

    await page.goto("https://opensource-demo.orangehrmlive.com/");
    await login.login("Admin", "admin123");
    await admin.openAdminModule();

    await admin.deleteUser(username);
  });

});
