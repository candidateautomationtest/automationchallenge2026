const { Before, After } = require("@cucumber/cucumber");
const fs = require("fs");
const path = require("path");

Before(async function (scenario) {
  await this.init(scenario);
});

After(async function (scenario) {
  try {
    if (this.page) {
      const screenshotRel = path.join(
        "screenshots",
        `${this.scenarioName}.png`
      );
      const screenshotAbs = path.join(this.resultsDir, screenshotRel);
      const buffer = await this.page.screenshot({
        path: screenshotAbs,
        fullPage: true,
      });
      await this.attach(buffer, "image/png");
    }
  } catch (err) {
    console.error("Error capturing screenshot:", err);
  }

  try {
    if (this.page && this.context) {
      const video = this.page.video();
      await this.page.close();
      await this.context.close();

      if (video) {
        const videoPath = await video.path();
        const videoRel = path.join("videos", `${this.scenarioName}.webm`);
        const finalAbs = path.join(this.resultsDir, videoRel);
        try {
          await fs.promises.rename(videoPath, finalAbs);
        } catch {
          await fs.promises.copyFile(videoPath, finalAbs);
        }
        await this.attach(
          `<p><strong>Video:</strong> <a href="${videoRel}">${videoRel}</a></p>`,
          "text/html"
        );
      }
    }
  } catch (err) {
    console.error("Error finalizing video:", err);
  }

  try {
    if (this.api) await this.api.dispose();
    if (this.browser) await this.browser.close();
  } catch (err) {
    console.error("Error closing browser:", err);
  }
});
