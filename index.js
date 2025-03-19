// This file provides programmatic access to the oapis functionality
// It allows users to import the package and use it in their code

/**
 * Configure npm for oapis packages and install a domain SDK
 * @param {string} domain - Domain name or domain__operationId
 * @returns {Promise<void>}
 */
async function install(domain) {
  const { execSync } = require("child_process");

  // Don't modify if already has @oapis/ prefix
  const packageName = domain.startsWith("@oapis/")
    ? domain
    : `@oapis/${domain}`;

  try {
    // Configure npm for oapis packages
    execSync("npm config set @oapis:registry https://npm.oapis.org", {
      stdio: "inherit",
    });

    // Install the package
    execSync(`npm install ${packageName}`, {
      stdio: "inherit",
    });

    return true;
  } catch (error) {
    console.error(`Error installing ${packageName}:`, error.message);
    throw error;
  }
}

module.exports = {
  install,
};
