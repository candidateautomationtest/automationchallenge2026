#!/usr/bin/env node

const { spawn } = require("child_process");
const path = require("path");

async function runTests(args) {
  return new Promise((resolve) => {
    const cucumberArgs = [
      "--format",
      "json:test-results/cucumber_report.json",
      ...args,
    ];
    const cucumber = spawn("npx", ["cucumber-js", ...cucumberArgs], {
      stdio: "inherit",
      shell: true,
      cwd: process.cwd(),
    });

    cucumber.on("close", (code) => {
      // Always resolve regardless of exit code
      // The reporter will run regardless
      resolve(code);
    });

    cucumber.on("error", (err) => {
      console.error("Error running cucumber:", err);
      resolve(1);
    });
  });
}

async function generateReport() {
  return new Promise((resolve) => {
    const reporter = spawn("node", ["reporter.js"], {
      stdio: "inherit",
      shell: true,
      cwd: process.cwd(),
    });

    reporter.on("close", (code) => {
      resolve(code);
    });

    reporter.on("error", (err) => {
      console.error("Error running reporter:", err);
      resolve(1);
    });
  });
}

async function main() {
  const args = process.argv.slice(2);
  console.log("Running tests with args:", args);

  const testExitCode = await runTests(args);
  console.log(`\nTests completed with exit code: ${testExitCode}`);

  console.log("\nGenerating report...");
  await generateReport();

  console.log("\nTest run complete!");
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
