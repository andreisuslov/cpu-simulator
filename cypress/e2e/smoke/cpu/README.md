# CPU Tests

This folder contains smoke tests for CPU-related functionality of the CPU Simulator.

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
Execute CPU tests in the background without opening the Cypress UI:
```bash
npx cypress run --spec "cypress/e2e/smoke/cpu/**/*.cy.js"
```

### Run in Full Mode (Interactive)
Open Cypress Test Runner for interactive testing and debugging:
```bash
npx cypress open
```
Then navigate to e2e → smoke → cpu and select the tests to run.

## Test Files

- **clock-tick.cy.js**: Tests for CPU clock tick functionality
- **execution-phases.cy.js**: Tests for CPU execution phases (fetch, decode, execute)
- **registers.cy.js**: Tests for CPU register operations and display
- **reset.cy.js**: Tests for CPU reset functionality
- **tooltips.cy.js**: Tests for CPU-related tooltip displays

## Running Individual Tests

### Run a specific test file in quiet mode:
```bash
# Example: Run only clock tick tests
npx cypress run --spec "cypress/e2e/smoke/cpu/clock-tick.cy.js"

# Example: Run only register tests
npx cypress run --spec "cypress/e2e/smoke/cpu/registers.cy.js"

# Example: Run only execution phase tests
npx cypress run --spec "cypress/e2e/smoke/cpu/execution-phases.cy.js"
```

## Notes

- Tests run at 3840x2160 viewport resolution by default
- Screenshots are captured on test failures
- Video recording is disabled for performance
- These tests focus on core CPU simulation features including registers, clock cycles, and execution phases