describe('RAM Validation Tooltip - Appears on Invalid Data', () => {
  beforeEach(() => {
    cy.visit('http://localhost:8000');
  });

  it('should show validation tooltip when hovering over row with invalid data value', () => {
    // Enter edit mode
    cy.get('#modeToggle').click();
    cy.get('#ram-table').should('exist');

    // Select row 6 (data type, value '1')
    // Change it to invalid data (non-numeric)
    cy.get('#ram-table tbody tr').eq(6).within(() => {
      cy.get('input[data-validate="data"]').clear().type('abc');
    });

    // Wait for validation to trigger
    cy.wait(200);

    // Row should have validation-error class
    cy.get('#ram-table tbody tr').eq(6)
      .should('have.class', 'validation-error')
      .should('have.attr', 'data-error');

    // Hover over the error row to trigger tooltip
    cy.get('#ram-table tbody tr').eq(6).trigger('mouseover');

    // Wait for tooltip to appear (300ms delay in code)
    cy.wait(400);

    // Tooltip should be visible with error message
    cy.get('.validation-tooltip')
      .should('exist')
      .should('have.class', 'show')
      .should('have.css', 'visibility', 'visible')
      .should('have.css', 'opacity', '1')
      .invoke('text')
      .should('include', 'Data value must be a valid integer');
  });

  it('should show validation tooltip when hovering over row with invalid instruction operand', () => {
    // Enter edit mode
    cy.get('#modeToggle').click();

    // Select row 0 (instruction: 'LOAD 6')
    // Change operand to invalid (out of bounds)
    cy.get('#ram-table tbody tr').eq(0).within(() => {
      cy.get('input[data-validate="operand"]').clear().type('99');
    });

    // Wait for validation to trigger
    cy.wait(200);

    // Row should have validation-error class
    cy.get('#ram-table tbody tr').eq(0)
      .should('have.class', 'validation-error')
      .should('have.attr', 'data-error');

    // Hover over the error row
    cy.get('#ram-table tbody tr').eq(0).trigger('mouseover');

    // Wait for tooltip
    cy.wait(400);

    // Tooltip should be visible
    cy.get('.validation-tooltip')
      .should('exist')
      .should('have.class', 'show')
      .should('have.css', 'visibility', 'visible')
      .invoke('text')
      .should('include', 'out of bounds');
  });

  it('should show validation tooltip when hovering over row with empty operand', () => {
    // Enter edit mode
    cy.get('#modeToggle').click();

    // Select row 1 (instruction: 'ADD 7')
    // Clear the operand
    cy.get('#ram-table tbody tr').eq(1).within(() => {
      cy.get('input[data-validate="operand"]').clear();
    });

    // Wait for validation
    cy.wait(200);

    // Row should have validation-error class
    cy.get('#ram-table tbody tr').eq(1)
      .should('have.class', 'validation-error');

    // Hover over the error row
    cy.get('#ram-table tbody tr').eq(1).trigger('mouseover');

    // Wait for tooltip
    cy.wait(400);

    // Tooltip should be visible
    cy.get('.validation-tooltip')
      .should('exist')
      .should('have.class', 'show')
      .should('have.css', 'visibility', 'visible')
      .invoke('text')
      .should('include', 'requires an address operand');
  });

  it('should hide tooltip when moving mouse away from error row', () => {
    // Enter edit mode
    cy.get('#modeToggle').click();

    // Create validation error
    cy.get('#ram-table tbody tr').eq(6).within(() => {
      cy.get('input[data-validate="data"]').clear().type('invalid');
    });

    cy.wait(200);

    // Hover to show tooltip
    cy.get('#ram-table tbody tr').eq(6).trigger('mouseover');
    cy.wait(400);

    // Verify tooltip is visible
    cy.get('.validation-tooltip').should('have.class', 'show');

    // Move mouse away
    cy.get('#ram-table tbody tr').eq(6).trigger('mouseout');
    cy.wait(100);

    // Tooltip should hide
    cy.get('.validation-tooltip').should('not.have.class', 'show');
  });
});
