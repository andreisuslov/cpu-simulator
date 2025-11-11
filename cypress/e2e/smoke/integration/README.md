# Integration Tests

This folder contains end-to-end integration tests for the CPU Simulator application.

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
Execute integration tests in the background without opening the Cypress UI:
```bash
npx cypress run --spec "cypress/e2e/smoke/integration/**/*.cy.js"
```

### Run in Full Mode (Interactive)
Open Cypress Test Runner for interactive testing and debugging:
```bash
npx cypress open
```
Then navigate to e2e → smoke → integration and select the tests to run.

## Test Files

- **basic-workflow.cy.js**: Tests for basic application workflow and user interactions
- **error-handling.cy.js**: Tests for error handling and recovery scenarios
- **explanation.cy.js**: Tests for instruction explanation features
- **performance.cy.js**: Tests for application performance and responsiveness
- **state-management.cy.js**: Tests for application state management and persistence

## Running Individual Tests

### Run a specific test file in quiet mode:
```bash
# Example: Run only basic workflow tests
npx cypress run --spec "cypress/e2e/smoke/integration/basic-workflow.cy.js"

# Example: Run only error handling tests
npx cypress run --spec "cypress/e2e/smoke/integration/error-handling.cy.js"

# Example: Run only performance tests
npx cypress run --spec "cypress/e2e/smoke/integration/performance.cy.js"
```

## Notes

- Tests run at 3840x2160 viewport resolution by default
- Screenshots are captured on test failures
- Video recording is disabled for performance
- These tests verify complete user workflows and integration between different components
- Performance tests may take longer to run as they test application responsiveness under various conditions