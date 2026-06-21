const { Given, When, Then } = require("@cucumber/cucumber");
const { expect } = require("chai");
const LoginPage = require("../../pages/LoginPage");
const ProductsPage = require("../../pages/ProductsPage");
const CartPage = require("../../pages/CartPage");
const CheckoutPage = require("../../pages/CheckoutPage");

const BASE_URL = "https://www.saucedemo.com/";

function getPages(world) {
  return {
    login: new LoginPage(world.page),
    products: new ProductsPage(world.page),
    cart: new CartPage(world.page),
    checkout: new CheckoutPage(world.page),
  };
}

Given("I open the Sauce Demo website", async function () {
  await this.page.goto(BASE_URL, { waitUntil: "domcontentloaded" });
});

When(
  "I login with username {string} and password {string}",
  async function (username, password) {
    const { login } = getPages(this);
    await login.login(username, password);
  }
);

When("I add the product {string} to the cart", async function (productName) {
  const { products } = getPages(this);
  await products.addToCartByName(productName);
});

When("I go to the cart", async function () {
  const { products } = getPages(this);
  await products.openCart();
});

When(
  "I checkout with first name {string}, last name {string}, and postal code {string}",
  async function (first, last, postal) {
    const { cart, checkout } = getPages(this);
    await cart.checkout();
    await checkout.fillInformation(first, last, postal);
    await checkout.continue();
    await checkout.finish();
  }
);

Then("I should see the products page", async function () {
  const { products } = getPages(this);
  const isVisible = await products.isOnProductsPage();
  expect(isVisible).to.be.true;
});

Then(
  "I should see the order confirmation {string}",
  async function (expectedText) {
    const { checkout } = getPages(this);
    const header = await checkout.getConfirmationHeader();
    expect(header).to.equal(expectedText);
  }
);
