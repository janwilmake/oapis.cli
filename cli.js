#!/usr/bin/env node

const { execSync } = require("child_process");

// Command line args (skip node and script name)
const args = process.argv.slice(2);

// Function to execute commands and display output
function runCommand(command) {
  try {
    console.log(`> ${command}`);
    const output = execSync(command, { stdio: "inherit" });
    return output;
  } catch (error) {
    console.error(`Error executing command: ${command}`);
    process.exit(1);
  }
}

// Function to check if a string looks like an oapis package
function isOapisPackage(packageName) {
  return packageName.startsWith("@oapis/");
}

// Main function to handle installation
function install() {
  // Check for help command
  if (args.includes("-h") || args.includes("--help")) {
    console.log(`
oapis - OpenAPI SDK installer

Usage:
  oapis install <domain>[__operationId]
  oapis i <domain>[__operationId]

Examples:
  oapis install example.com
  oapis i example.com__getUserProfile

This will:
1. Configure npm to use the oapis registry for @oapis packages
2. Install the requested OpenAPI SDK
`);
    return;
  }

  // Handle the install command variations
  const isInstallCommand = args[0] === "install" || args[0] === "i";
  if (!isInstallCommand || args.length < 2) {
    console.error("Usage: oapis install <domain>[__operationId]");
    process.exit(1);
  }

  // Get the package name(s) - all args after the install command
  const packageArgs = args.slice(1);
  const packageNames = [];

  // Process each package argument
  for (const arg of packageArgs) {
    if (arg.startsWith("-")) continue; // Skip flags

    // If it looks like a domain or domain__operation, convert to proper format
    if (!arg.startsWith("@oapis/")) {
      // Add the @oapis/ prefix
      packageNames.push(`@oapis/${arg}`);
    } else {
      packageNames.push(arg);
    }
  }

  if (packageNames.length === 0) {
    console.error("Please specify a domain to install");
    process.exit(1);
  }

  // Step 1: Configure npm to use the oapis registry
  runCommand("npm config set @oapis:registry https://npm.oapis.org");

  // Step 2: Install the requested package(s)
  const installCommand = `npm install ${packageNames.join(" ")}`;
  runCommand(installCommand);

  console.log("\n✨ OpenAPI SDK(s) installed successfully!");
}

// Run the installation
install();
