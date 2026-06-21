const { When, Then } = require("@cucumber/cucumber");
const { expect } = require("chai");
const { injectAxe } = require("axe-playwright");

When("I run an accessibility scan on the current page", async function () {
  await injectAxe(this.page);
  const violations = await this.page.evaluate(async () => {
    return await new Promise((resolve) => {
      window.axe.run((err, results) => {
        if (err) throw err;
        resolve(results.violations);
      });
    });
  });
  await this.attach(JSON.stringify(violations, null, 2), "application/json");
  this.a11yViolations = violations.filter((v) =>
    ["serious", "critical"].includes(v.impact)
  );
});

Then(
  "I should have no serious or critical accessibility violations",
  async function () {
    if (this.a11yViolations && this.a11yViolations.length > 0) {
      await this.attach(
        "Serious/Critical violations found: " +
          JSON.stringify(this.a11yViolations, null, 2),
        "text/plain"
      );
    }
    expect(this.a11yViolations.length).to.equal(0);
  }
);
