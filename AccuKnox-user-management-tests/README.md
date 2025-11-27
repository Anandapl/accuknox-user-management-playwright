# AccuKnox User Management Automation Tests

This repository contains automated end-to-end test cases for the OrangeHRM User Management module.  
The framework is built using **Playwright** with **JavaScript** following the **Page Object Model (POM)** design pattern.

---

## Project Setup

### 1. Clone the repository
```bash
git clone https://github.com/Anandapl/accuknox-user-management-playwright.git
cd accuknox-user-management-playwright
```
### 2. Install project dependencies
```bash
npm install
```
### 3. Install Playwright browsers
```bash
npx playwright install
```
### 4. Running the Test Cases
```bash
npx playwright test --ui
```

<ul>
<li>Test Scenarios Covered</li>

<li>Navigate to the Admin Module</li>

<li>Add a New User</li>

<li>Search the Newly Created User</li>

<li>Edit User Details</li>

<li>Validate Updated Details</li>

<li>Delete the User</li>
</ul>

All scenarios follow the Page Object Model structure and are automated using Playwright.

### Project Structure

accuknox-user-management-playwright/
```bash
│
├── pages/
│   ├── loginPage.js
│   ├── adminPage.js
│
├── tests/
│   ├── addUser.spec.js
│
├── playwright.config.js
├── package.json
└── README.md
```
### Application Under Test (AUT)
<ul>
  <li>URL: https://opensource-demo.orangehrmlive.com</li>
  <li>Username: Admin</li>
  <li>Password: admin123</li>
</ul>

### Playwright Version
To check the installed Playwright version:
```bash
npx playwright --version
```
### Manual Test Cases
A total of 10 manual test cases are included, covering:
<ul>
<li>Admin module navigation</li>

<li>User creation</li>

<li>Search functionality</li>

<li>Editing user details</li>

<li>Validating updates</li>

<li>Deleting user accounts</li>

<li>Negative scenarios and validation checks</li>
</ul>

### Author

Automation suite created by Anand L.







