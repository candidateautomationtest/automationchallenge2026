const { Given, When, Then } = require("@cucumber/cucumber");
const { expect } = require("chai");

Given("I prepare an API client for SauceDemo", async function () {
  expect(this.api).to.exist;
});

When("I GET request to {string}", async function (path) {
  this.apiResponse = await this.api.get(path);
  const text = await this.apiResponse.text();
  await this.attach(
    `GET ${path} -> ${this.apiResponse.status()} bytes=${text.length}`,
    "text/plain"
  );
  this._lastResponseText = text;
});

Then("the API response status should be {int}", async function (status) {
  expect(this.apiResponse.status()).to.equal(status);
});

Then("the API response body should contain {string}", async function (needle) {
  const text = this._lastResponseText ?? (await this.apiResponse.text());
  expect(text).to.include(needle);
});
