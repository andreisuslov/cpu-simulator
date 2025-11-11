# Auto Mode Tests

This folder contains smoke tests for the automatic execution mode functionality of the CPU Simulator.

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
Execute auto-mode tests in the background without opening the Cypress UI:
```bash
npx cypress run --spec "cypress/e2e/smoke/auto-mode/**/*.cy.js"
```

### Run in Full Mode (Interactive)
Open Cypress Test Runner for interactive testing and debugging:
```bash
npx cypress open
```
Then navigate to e2e → smoke → auto-mode and select the tests to run.

## Test Files

- **controls.cy.js**: Tests for auto-mode control buttons and their states
- **execution.cy.js**: Tests for automatic program execution flow
- **mode-switch.cy.js**: Tests for switching between manual and auto modes
- **pill-button-toggle.cy.js**: Tests for pill button toggle functionality

## Running Individual Tests

### Run a specific test file in quiet mode:
```bash
# Example: Run only controls tests
npx cypress run --spec "cypress/e2e/smoke/auto-mode/controls.cy.js"

# Example: Run only execution tests
npx cypress run --spec "cypress/e2e/smoke/auto-mode/execution.cy.js"
```

## Notes

- Tests run at 3840x2160 viewport resolution by default
- Screenshots are captured on test failures
- Video recording is disabled for performance
- These tests focus on the automatic execution features of the CPU simulator