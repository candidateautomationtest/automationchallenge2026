const BasePage = require("./BasePage");

class CheckoutPage extends BasePage {
  constructor(page) {
    super(page);
    this.first = "#first-name";
    this.last = "#last-name";
    this.postal = "#postal-code";
    this.continueBtn = "#continue";
    this.finishBtn = "#finish";
    this.completeHeader = ".complete-header";
  }

  async fillInformation(first, last, postal) {
    await this.ui.type(this.first, first);
    await this.ui.type(this.last, last);
    if (postal !== undefined) {
      await this.ui.type(this.postal, postal);
    }
  }

  async continue() {
    await this.ui.click(this.continueBtn);
  }

  async finish() {
    await this.ui.click(this.finishBtn);
  }

  async getConfirmationHeader() {
    await this.page.waitForSelector(this.completeHeader);
    return await this.ui.getText(this.completeHeader);
  }
}

module.exports = CheckoutPage;
