const reporter = require('cucumber-html-reporter');
const path = require('path');
const fs = require('fs');

const resultsDir = path.join(__dirname, 'test-results');
if (!fs.existsSync(resultsDir)) fs.mkdirSync(resultsDir, { recursive: true });

const options = {
  theme: 'bootstrap',
  jsonFile: path.join(resultsDir, 'cucumber_report.json'),
  output: path.join(resultsDir, 'cucumber_report.html'),
  reportSuiteAsScenarios: true,
  launchReport: false,
  metadata: {
    "App Version":"1.0.0",
    "Test Environment": process.env.HEADLESS === 'false' ? "Headed" : "Headless",
    "Browser": "Chromium",
    "Platform": process.platform,
    "Executed": "chrome browser"
  }
};

reporter.generate(options);
console.log('HTML report generated at:', options.output);
