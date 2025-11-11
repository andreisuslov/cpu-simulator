# Regression Tests

This folder contains regression tests for the CPU Simulator application.

## Prerequisites

Before running these tests, ensure you have the following installed:

- **Node.js** (v14 or higher)
- **npm** (comes with Node.js)
- **Cypress** (installed via npm)

## Setup

1. Install dependencies from the project root:
   ```bash
   npm install
   ```

2. Start the local server (the application should be running on http://localhost:8000)

## Running Tests

### Run in Quiet Mode (Headless)
Execute tests in the background without opening the Cypress UI:
```bash
npx cypress run --spec "cypress/e2e/regression/**/*.cy.js"
```

### Run in Full Mode (Interactive)
Open Cypress Test Runner for interactive testing and debugging:
```bash
npx cypress open
```
Then navigate to the regression folder and select the tests to run.

## Test Coverage

- **container-edit-mode.cy.js**: Tests for container edit mode functionality

## Notes

- Tests run at 3840x2160 viewport resolution by default
- Screenshots are captured on test failures
- Video recording is disabled for performance