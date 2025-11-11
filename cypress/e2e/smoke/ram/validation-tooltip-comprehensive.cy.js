describe('RAM Validation Tooltip - Comprehensive Flow', () => {
  beforeEach(() => {
    cy.visit('http://localhost:8000');
  });

  it('should show tooltip immediately when hovering over a newly created validation error', () => {
    // 1. Enter edit mode
    cy.get('#modeToggle').click();
    cy.wait(100);

    // 2. Create a validation error by entering invalid data
    cy.get('#ram-table tbody tr').eq(4).within(() => {
      cy.get('input[data-validate="data"]').clear().type('not-a-number');
    });

    // 3. Wait for validation to process
    cy.wait(200);

    // 4. Verify the row has validation error styling
    cy.get('#ram-table tbody tr').eq(4).should('have.class', 'validation-error');

    // 5. Hover over the error row
    cy.get('#ram-table tbody tr').eq(4).trigger('mouseover');

    // 6. Wait for tooltip delay
    cy.wait(400);

    // 7. Tooltip should be visible
    cy.get('.validation-tooltip')
      .should('exist')
      .should('have.class', 'show')
      .should('have.css', 'visibility', 'visible')
      .should('have.css', 'opacity', '1')
      .invoke('text')
      .should('include', 'Data value must be a valid integer');
  });

  it('should show tooltip when row already has validation error and user hovers', () => {
    // Enter edit mode
    cy.get('#modeToggle').click();

    // Create validation error
    cy.get('#ram-table tbody tr').eq(3).within(() => {
      cy.get('input[data-validate="operand"]').clear().type('999');
    });

    cy.wait(200);

    // Verify error exists
    cy.get('#ram-table tbody tr').eq(3).should('have.class', 'validation-error');

    // Click elsewhere to lose focus
    cy.get('body').click(0, 0);

    // Now hover over the error row again
    cy.get('#ram-table tbody tr').eq(3).trigger('mouseover');
    cy.wait(400);

    // Tooltip should appear
    cy.get('.validation-tooltip')
      .should('exist')
      .should('have.class', 'show')
      .should('have.css', 'visibility', 'visible')
      .should('have.css', 'opacity', '1');
  });

  it('should show tooltip for multiple different error types', () => {
    cy.get('#modeToggle').click();

    // Test 1: Invalid data value
    cy.get('#ram-table tbody tr').eq(5).within(() => {
      cy.get('input[data-validate="data"]').clear().type('xyz');
    });
    cy.wait(200);

    cy.get('#ram-table tbody tr').eq(5).trigger('mouseover');
    cy.wait(400);
    cy.get('.validation-tooltip')
      .should('have.class', 'show')
      .invoke('text')
      .should('include', 'integer');

    // Move away to hide tooltip
    cy.get('#ram-table tbody tr').eq(5).trigger('mouseout');
    cy.wait(100);

    // Test 2: Empty operand
    cy.get('#ram-table tbody tr').eq(2).within(() => {
      cy.get('input[data-validate="operand"]').clear();
    });
    cy.wait(200);

    cy.get('#ram-table tbody tr').eq(2).trigger('mouseover');
    cy.wait(400);
    cy.get('.validation-tooltip')
      .should('have.class', 'show')
      .invoke('text')
      .should('include', 'requires an address operand');

    // Move away
    cy.get('#ram-table tbody tr').eq(2).trigger('mouseout');
    cy.wait(100);

    // Test 3: Out of bounds operand
    cy.get('#ram-table tbody tr').eq(1).within(() => {
      cy.get('input[data-validate="operand"]').clear().type('50');
    });
    cy.wait(200);

    cy.get('#ram-table tbody tr').eq(1).trigger('mouseover');
    cy.wait(400);
    cy.get('.validation-tooltip')
      .should('have.class', 'show')
      .invoke('text')
      .should('include', 'out of bounds');
  });

  it('should maintain tooltip visibility when moving within the same error row', () => {
    cy.get('#modeToggle').click();

    // Create error
    cy.get('#ram-table tbody tr').eq(6).within(() => {
      cy.get('input[data-validate="data"]').clear().type('invalid');
    });
    cy.wait(200);

    // Hover over first cell
    cy.get('#ram-table tbody tr').eq(6).find('td').first().trigger('mouseover');
    cy.wait(400);
    cy.get('.validation-tooltip').should('have.class', 'show');

    // Move to another cell in same row - tooltip should stay
    cy.get('#ram-table tbody tr').eq(6).find('td').eq(1).trigger('mouseover');
    cy.wait(100);
    cy.get('.validation-tooltip').should('have.class', 'show');
  });

  it('should show tooltip for non-numeric data value error', () => {
    cy.get('#modeToggle').click();

    // Create error with non-numeric string in data field
    cy.get('#ram-table tbody tr').eq(7).within(() => {
      cy.get('input[data-validate="data"]').clear().type('hello world');
    });
    cy.wait(200);

    // Verify error state
    cy.get('#ram-table tbody tr').eq(7).should('have.class', 'validation-error');

    // Hover to show tooltip
    cy.get('#ram-table tbody tr').eq(7).trigger('mouseover');
    cy.wait(400);

    cy.get('.validation-tooltip')
      .should('exist')
      .should('have.class', 'show')
      .should('have.css', 'visibility', 'visible')
      .should('have.css', 'opacity', '1')
      .invoke('text')
      .should('include', 'Data value must be a valid integer');
  });
});
