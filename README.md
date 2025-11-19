# CPU Simulator

A web-based CPU simulator that provides an interactive environment for understanding computer architecture and assembly language programming. This educational tool simulates CPU operations including registers, RAM, and instruction execution cycles.

## Overview

The CPU Simulator allows users to:
- Write and execute assembly-like instructions
- Visualize CPU registers and their values
- Interact with simulated RAM
- Step through program execution manually or automatically
- Understand fetch-decode-execute cycles
- Fix their custom instructions with helpful error messages

## Technologies

- **Frontend**: HTML5, CSS3, JavaScript (Vanilla)
- **Testing**: Cypress (v13.6.0)

## Project Structure

```
cpu-simulator/
├── index.html               # Main application HTML
├── script.js                # Core application logic
├── styles/                  # CSS stylesheets
│   ├── base.css             # Base styles
│   ├── components-*.css     # Component-specific styles
│   ├── layout.css           # Layout styles
│   ├── responsive.css       # Responsive design
│   ├── tooltips.css         # Tooltip styles
│   └── validation.css       # Validation styles
├── cypress/                 # Test suite
│   └── e2e/                 # End-to-end tests
│       ├── regression/      # Regression tests
│       └── smoke/           # Smoke tests
│           ├── auto-mode/   # Auto execution tests
│           ├── cpu/         # CPU functionality tests
│           ├── integration/ # Integration tests
│           ├── ram/         # RAM operations tests
│           └── ui/          # UI/UX tests
└── package.json             # Node.js dependencies
```

## Installation and running

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start a local web server in the project directory:

   ```bash
   python3 -m http.server 8000
   ```

3. Navigate to:
   ```
   http://localhost:8000
   ```

## Tests

The project uses Cypress for comprehensive end-to-end testing. Tests are organized into smoke tests (quick validation) and regression tests (thorough testing).

### Headless and interactive modes

Execute all tests without opening the Cypress UI:
```bash
npm run cypress:run
```

Or run specific test suites:
```bash
# Run all smoke tests
npx cypress run --spec "cypress/e2e/smoke/**/*.cy.js"

# Run all regression tests
npx cypress run --spec "cypress/e2e/regression/**/*.cy.js"
```

Open Cypress Test Runner for interactive testing and debugging:
```bash
npm run cypress:open
```

### Run specific test suites

```bash
# CPU tests only
npx cypress run --spec "cypress/e2e/smoke/cpu/**/*.cy.js"

# RAM tests only
npx cypress run --spec "cypress/e2e/smoke/ram/**/*.cy.js"

# UI tests only
npx cypress run --spec "cypress/e2e/smoke/ui/**/*.cy.js"

# Integration tests only
npx cypress run --spec "cypress/e2e/smoke/integration/**/*.cy.js"

# Auto-mode tests only
npx cypress run --spec "cypress/e2e/smoke/auto-mode/**/*.cy.js"
```

## Features

### CPU Simulation
- 8-bit registers (A, B, C, D)
- Program Counter (PC)
- Instruction Register (IR)
- Flags Register
- Clock cycle simulation

### RAM Management
- Interactive RAM table
- Edit mode for modifying memory values
- Validation with error tooltips
- Data persistence during execution

### Instruction set (TODO: implement sub, load, store, jmp, jz, jnz, halt, nop)
- Basic arithmetic operations (ADD, SUB)
- Data movement (MOV, LOAD, STORE)
- Control flow (JMP, JZ, JNZ)
- System operations (HALT, NOP)

### Modes
- **Manual mode**: step through instructions one at a time
- **Auto mode**: automatic execution with adjustable speed
- Visual feedback for current execution phase

## License

No rights reserved.

## Support

Always welcome.
