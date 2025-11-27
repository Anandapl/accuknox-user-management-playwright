// pages/loginPage.js
class LoginPage {
  constructor(page) {
    this.page = page;
    this.username = page.locator("input[name='username']");
    this.password = page.locator("input[name='password']");
    this.loginBtn = page.locator("button[type='submit']");
  }

  async login(username, password) {
    await this.page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    await this.page.waitForSelector("input[name='username']");

    await this.username.fill(username);
    await this.password.fill(password);
    await this.loginBtn.click();
  }
}

module.exports = { LoginPage };
