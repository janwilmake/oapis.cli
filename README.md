# oapis cli

A simple command-line tool to install OpenAPI SDKs with a single command.

## Installation

```bash
npm install -g oapis
```

## Usage

Install an OpenAPI SDK for any domain:

```bash
oapis install example.com
```

Or install a specific operation:

```bash
oapis install example.com__getUsers
```

Short form is also supported:

```bash
oapis i example.com
```

## How It Works

The `oapis` tool:

1. Configures npm to use the OpenAPI SDK registry (`https://npm.oapis.org`) for `@oapis` packages
2. Installs the requested SDK package

This eliminates the need to run multiple commands manually.

## Programmatic Usage

You can also use oapis programmatically in your Node.js projects:

```javascript
const oapis = require("oapis");

// Install an OpenAPI SDK
oapis
  .install("example.com")
  .then(() => console.log("SDK installed!"))
  .catch((err) => console.error("Failed to install SDK:", err));
```

## About oapis

This package is part of the oapis ecosystem, a package manager for auto-generated OpenAPI SDKs. The system automatically generates client libraries for any domain that has an `openapi.json` file available.

### Features

- Auto-generates SDKs on-demand
- Always in sync with the latest OpenAPI spec
- Simple installation with a single command
- Support for specific operations via the `domain__operationId` syntax
