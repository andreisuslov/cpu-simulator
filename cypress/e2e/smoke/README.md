# Smoke Tests

This folder contains smoke tests for the CPU Simulator application, organized by feature area.

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

### Run All Smoke Tests in Quiet Mode (Headless)
Execute all smoke tests in the background without opening the Cypress UI:
```bash
npx cypress run --spec "cypress/e2e/smoke/**/*.cy.js"
```

### Run All Smoke Tests in Full Mode (Interactive)
Open Cypress Test Runner for interactive testing and debugging:
```bash
npx cypress open
```
Then navigate to the smoke folder and select the tests to run.

## Test Suites

- **auto-mode/**: Tests for automatic execution mode functionality
- **cpu/**: Tests for CPU operations (registers, clock, execution phases)
- **integration/**: End-to-end integration tests
- **ram/**: Tests for RAM table operations and validation
- **ui/**: Tests for user interface and responsive design

## Running Specific Test Suites

### Run a specific subfolder in quiet mode:
```bash
# Example: Run only CPU tests
npx cypress run --spec "cypress/e2e/smoke/cpu/**/*.cy.js"

# Example: Run only RAM tests
npx cypress run --spec "cypress/e2e/smoke/ram/**/*.cy.js"
```

### Run a specific test file:
```bash
# Example: Run a single test file
npx cypress run --spec "cypress/e2e/smoke/cpu/clock-tick.cy.js"
```

## Notes

- Tests run at 3840x2160 viewport resolution by default
- Screenshots are captured on test failures
- Video recording is disabled for performance
- Each subfolder contains its own README with specific test details