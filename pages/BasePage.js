const UiActions = require("../utils/UiActions");

class BasePage {
  constructor(page) {
    this.page = page;
    this.ui = new UiActions(page);
  }
}

module.exports = BasePage;
