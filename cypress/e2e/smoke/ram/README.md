# RAM Tests

This folder contains smoke tests for RAM table functionality and validation in the CPU Simulator.

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
Execute RAM tests in the background without opening the Cypress UI:
```bash
npx cypress run --spec "cypress/e2e/smoke/ram/**/*.cy.js"
```

### Run in Full Mode (Interactive)
Open Cypress Test Runner for interactive testing and debugging:
```bash
npx cypress open
```
Then navigate to e2e → smoke → ram and select the tests to run.

## Test Files

- **data-persistence.cy.js**: Tests for RAM data persistence across operations
- **edit-operations.cy.js**: Tests for RAM edit operations (add, modify, delete)
- **mode-toggle.cy.js**: Tests for toggling between RAM view/edit modes
- **row-position-after-error.cy.js**: Tests for maintaining row position after validation errors
- **table-display.cy.js**: Tests for RAM table display and rendering
- **tooltip-disappears-after-fix-save.cy.js**: Tests for tooltip behavior after fixing errors
- **validation-layout-stability.cy.js**: Tests for layout stability during validation
- **validation-tooltip-appears.cy.js**: Tests for validation tooltip appearance
- **validation-tooltip-comprehensive.cy.js**: Comprehensive validation tooltip tests
- **validation-tooltip-exit-mode.cy.js**: Tests for tooltip behavior when exiting edit mode
- **validation.cy.js**: General RAM validation tests

## Running Individual Tests

### Run a specific test file in quiet mode:
```bash
# Example: Run only data persistence tests
npx cypress run --spec "cypress/e2e/smoke/ram/data-persistence.cy.js"

# Example: Run only validation tests
npx cypress run --spec "cypress/e2e/smoke/ram/validation.cy.js"

# Example: Run only table display tests
npx cypress run --spec "cypress/e2e/smoke/ram/table-display.cy.js"
```

## Notes

- Tests run at 3840x2160 viewport resolution by default
- Screenshots are captured on test failures
- Video recording is disabled for performance
- These tests focus on RAM table operations, validation, and user interactions
- Validation tests ensure proper error handling and user feedback