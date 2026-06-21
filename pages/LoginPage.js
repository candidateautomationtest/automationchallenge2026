const BasePage = require("./BasePage");

class LoginPage extends BasePage {
  constructor(page) {
    super(page);
    this.username = "#user-name";
    this.password = "#password";
    this.loginButton = "#login-button";
  }

  async login(username, password) {
    await this.ui.type(this.username, username);
    await this.ui.type(this.password, password);
    await this.ui.click(this.loginButton);
  }
}

module.exports = LoginPage;
