class UiActions {
  constructor(page) {
    this.page = page;
  }

  async goto(url, waitUntil = "domcontentloaded") {
    await this.page.goto(url, { waitUntil });
  }

  async click(selectorOrLocator) {
    const locator = this._toLocator(selectorOrLocator);
    await locator.waitFor({ state: "visible" });
    await locator.click();
  }

  async type(selectorOrLocator, text, options = {}) {
    const locator = this._toLocator(selectorOrLocator);
    await locator.waitFor({ state: "visible" });
    await locator.fill("");
    if (text !== undefined) await locator.type(text, options);
  }

  async getText(selectorOrLocator) {
    const locator = this._toLocator(selectorOrLocator);
    await locator.waitFor();
    return (await locator.innerText()).trim();
  }

  async isVisible(selectorOrLocator) {
    const locator = this.page.locator(selectorOrLocator);
    return await locator.isVisible();
  }

  _toLocator(selectorOrLocator) {
    return typeof selectorOrLocator === "string"
      ? this.page.locator(selectorOrLocator)
      : selectorOrLocator;
  }
}

module.exports = UiActions;
