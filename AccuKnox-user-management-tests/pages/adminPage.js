const { expect } = require("@playwright/test");

class AdminPage {
  constructor(page) {
    this.page = page;

    // Navigation
    this.adminMenu = page.getByRole("link", { name: "Admin" });

    // Buttons
    this.addButton = page.getByRole("button", { name: "Add" });
    this.saveButton = page.getByRole("button", { name: "Save" });
    this.searchButton = page.getByRole("button", { name: "Search" });

    // Form fields
    this.employeeNameInput = page.getByPlaceholder("Type for hints...");
    this.usernameInput = page.locator("//label[text()='Username']/../following-sibling::div/input");
    this.passwordInputs = page.locator("input[type='password']");
    this.statusDropdown = page.locator("//label[text()='Status']/../following-sibling::div");
    this.userRoleDropdown = page.locator("//label[text()='User Role']/../following-sibling::div");

    // Search input
    this.searchUsernameInput = page.locator("(//label[text()='Username']/../following-sibling::div/input)[1]");

    // Table
    this.tableBody = page.locator(".oxd-table-body");
  }

  async openAdminModule() {
    await this.adminMenu.click();
    await expect(this.addButton).toBeVisible();
  }

  // Smart employee selection
  async selectEmployee() {
    await this.employeeNameInput.fill("a");

    const listbox = this.page.locator("div[role='listbox']");
    await expect(listbox).toBeVisible({ timeout: 10000 });

    const options = listbox.locator("div[role='option']")
      .filter({ hasNotText: "Searching" })
      .filter({ hasNotText: "No Records Found" });

    await expect(options.first()).toBeVisible();
    await options.first().click();
  }

  async addUser(username, password, role = "Admin", status = "Enabled") {
    await this.addButton.click();
    await expect(this.page.getByRole("heading", { name: "Add User" })).toBeVisible();

    await this.userRoleDropdown.click();
    await this.page.getByRole("option", { name: role }).click();

    await this.selectEmployee();

    await this.usernameInput.fill(username);

    await this.statusDropdown.click();
    await this.page.getByRole("option", { name: status }).click();

    await this.passwordInputs.nth(0).fill(password);
    await this.passwordInputs.nth(1).fill(password);

    await this.saveButton.click();

    await expect(this.page.locator("text=Successfully Saved")).toBeVisible({ timeout: 10000 });
    await expect(this.tableBody).toBeVisible();
  }

  async searchUser(username) {
    await this.searchUsernameInput.fill(username);
    await this.searchButton.click();
    await expect(this.tableBody).toBeVisible({ timeout: 10000 });
  }

  async isUserPresent(username) {
    await this.searchUser(username);
    return this.page.locator(`.oxd-table-cell:has-text("${username}")`).isVisible();
  }


  async openUserForEdit(username) {
    await this.searchUser(username);

    const row = this.page.locator(`div[role="row"]:has-text("${username}")`);
    await expect(row).toBeVisible();

    const editBtn = row.locator('button i[class*="bi-pencil"]');
    await editBtn.click();

    await expect(this.page.getByRole("heading", { name: "Edit User" })).toBeVisible();
  }

  async editUser(username, newStatus = "Disabled") {
    await this.openUserForEdit(username);

    await this.statusDropdown.click();
    await this.page.getByRole("option", { name: newStatus }).click();

    await this.saveButton.click();

    await expect(this.page.locator("text=Successfully Updated")).toBeVisible({
      timeout: 10000,
    });

    await expect(this.tableBody).toBeVisible();
  }

  async deleteUser(username) {
    await this.searchUser(username);

    const row = this.page.locator(`div[role="row"]:has-text("${username}")`);
    await expect(row).toBeVisible();

    const deleteBtn = row.locator('button i[class*="bi-trash"]');
    await deleteBtn.click();

    const confirmBtn = this.page.getByRole("button", { name: "Yes, Delete" });
    await expect(confirmBtn).toBeVisible();
    await confirmBtn.click();

    await expect(this.page.locator("text=Successfully Deleted")).toBeVisible({
      timeout: 10000,
    });
  }
}

module.exports = { AdminPage };
