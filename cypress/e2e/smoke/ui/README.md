# UI Tests

This folder contains smoke tests for user interface and responsive design of the CPU Simulator.

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
Execute UI tests in the background without opening the Cypress UI:
```bash
npx cypress run --spec "cypress/e2e/smoke/ui/**/*.cy.js"
```

### Run in Full Mode (Interactive)
Open Cypress Test Runner for interactive testing and debugging:
```bash
npx cypress open
```
Then navigate to e2e → smoke → ui and select the tests to run.

## Test Files

- **elements-visibility.cy.js**: Tests for UI element visibility and presence
- **page-load.cy.js**: Tests for page loading and initial state
- **responsive-layout.cy.js**: Tests for responsive design across different viewport sizes

## Running Individual Tests

### Run a specific test file in quiet mode:
```bash
# Example: Run only elements visibility tests
npx cypress run --spec "cypress/e2e/smoke/ui/elements-visibility.cy.js"

# Example: Run only page load tests
npx cypress run --spec "cypress/e2e/smoke/ui/page-load.cy.js"

# Example: Run only responsive layout tests
npx cypress run --spec "cypress/e2e/smoke/ui/responsive-layout.cy.js"
```

## Notes

- Tests run at 3840x2160 viewport resolution by default
- Responsive tests may change viewport sizes to test different screen dimensions
- Screenshots are captured on test failures
- Video recording is disabled for performance
- These tests ensure the UI is properly rendered and responsive across different devices