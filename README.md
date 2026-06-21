# Playwright Cucumber BDD

> UI + API + Accessibility tests

## 🚀 Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:

- [Git](https://git-scm.com/)
- [Node.js](https://nodejs.org/) (v18+)

### Setup Steps

**Clone the Repository**

```bash
git clone https://github.com/candidateautomationtest/automationchallenge2026.git
```

**Install Dependencies**

```bash
npm install
```

---

## Scenarios

**UI** - Purchase one item successfully

**API** - Homepage returns 200 and contains "Swag Labs" text

**Accessibility** - Login page has no serious/critical issues

Auto **screenshots** + **video** per scenario, linked in **HTML report**

## 🧪 Running Tests

You can run tests using the following commands:

**Run UI, API & Accessibility Test**

```bash
npm run test:ui
npm run test:api
npm run test:accessibility              # headless
```

**Note:** These scripts are defined in the `package.json` file:

```json
"scripts": {
    "test": "node run-tests.js",
    "test:ui": "node run-tests.js --tags @ui",
    "test:api": "node run-tests.js --tags @api",
    "test:accessibility": "node run-tests.js --tags @accessibility",
    "report": "start test-results/cucumber_report.html"
}
```

**View HTML Test Report**

Open the generated HTML report after a test run. Use one of the commands below for your OS, or the convenience npm script.

- use the npm script (cross-platform):

```bash
npm run report
```

## 🛠️ Project Structure

```bash
├─ features/
│  ├─ saucedemo.feature
│  └─ step_definitions/
│     ├─ ui.steps.js
│     ├─ api.steps.js
│     └─ accessibility.steps.js
├─ pages/
│  ├─ BasePage.js
│  ├─ LoginPage.js
│  ├─ ProductsPage.js
│  ├─ CartPage.js
│  └─ CheckoutPage.js
├─ utils/
│  └─ UiActions.js
├─ support/
│  ├─ world.js
│  └─ hooks.js
├─ test-results/
├─ reporter.js
├─ cucumber.js
├─ package.json
└─ README.md
```

## 🐞 Debugging Tests

Playwright provides several powerful ways to debug your tests:

**Add `await page.pause()` in Your Test**

This will pause the test and open the Inspector at that line:

```javascript
await page.pause();
```

For more debugging tips, see the [Playwright Debugging Docs](https://playwright.dev/docs/debug).

---

## 📝 Notes

Update the repo URL in the clone command as needed.

- For more Playwright commands and options, see the [Playwright docs](https://playwright.dev/docs/cli).

### Useful Playwright Links

- [Playwright Official Documentation](https://playwright.dev/docs/intro)
- [Playwright Debugging Guide](https://playwright.dev/docs/debug)
- [Playwright Test Reporters](https://playwright.dev/docs/test-reporters)

---
"# automationchallenge2026" 
"# automationchallenge2026" 
"# automationchallenge2026" 
