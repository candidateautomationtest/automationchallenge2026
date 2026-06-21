const { setWorldConstructor, setDefaultTimeout, World } = require('@cucumber/cucumber');
const { chromium, request } = require('playwright');
const fs = require('fs');
const path = require('path');

function slugify(text) {
  return text
    .replace(/[^\w\d]+/g, '_')
    .replace(/^_+|_+$/g, '')
    .toLowerCase()
    .substring(0, 120);
}

class CustomWorld extends World {
  constructor(options) {
    super(options);
    this.browser = null;
    this.context = null;
    this.page = null;
    this.api = null;
    this.apiResponse = null;
    this.scenarioName = 'scenario';
    this.resultsDir = path.join(process.cwd(), 'test-results');
    this.screensDir = path.join(this.resultsDir, 'screenshots');
    this.videosDir = path.join(this.resultsDir, 'videos');
  }

  async init(scenario) {
    this.scenarioName = slugify(scenario.pickle.name);
    for (const d of [this.resultsDir, this.screensDir, this.videosDir]) {
      if (!fs.existsSync(d)) fs.mkdirSync(d, { recursive: true });
    }
    const headless = process.env.HEADLESS === 'false' ? false : true;
    this.browser = await chromium.launch({ headless: true, slowMo: 50 }); // browser mode use { headless: false }
    this.context = await this.browser.newContext({
      viewport: { width: 1280, height: 720 },
      recordVideo: { dir: this.videosDir, size: { width: 1280, height: 720 } }
    });
    this.page = await this.context.newPage();

    // API client for saucedemo
    this.api = await request.newContext({
      baseURL: 'https://www.saucedemo.com',
      extraHTTPHeaders: {
        'Accept': '*/*',
        'User-Agent': 'playwright-bdd-saucedemo/1.0'
      }
    });
  }
}

setDefaultTimeout(90 * 1000);
setWorldConstructor(CustomWorld);
module.exports = { CustomWorld };
