const BasePage = require("./BasePage");

class ProductsPage extends BasePage {
  constructor(page) {
    super(page);
    this.title = ".title";
    this.cartLink = "a.shopping_cart_link";
    this.sortDropdown = ".product_sort_container";
  }

  async isOnProductsPage() {
    await this.page.waitForSelector(this.title);
    const text = await this.ui.getText(this.title);
    return text === "Products";
  }

  async addToCartByName(name) {
    const item = this.page.locator(".inventory_item").filter({ hasText: name });
    await this.ui.click(item.locator('button:has-text("Add to cart")'));
  }

  async openCart() {
    await this.ui.click(this.cartLink);
  }
}

module.exports = ProductsPage;
