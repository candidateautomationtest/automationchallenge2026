const BasePage = require("./BasePage");

class CartPage extends BasePage {
  constructor(page) {
    super(page);
    this.checkoutBtn = "#checkout";
  }

  async checkout() {
    await this.ui.click(this.checkoutBtn);
  }
}

module.exports = CartPage;
