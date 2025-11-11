describe('RAM Save Button - Disabled with Validation Errors', () => {
  beforeEach(() => {
    cy.visit('http://localhost:8000');
  });

  it('should disable save button when validation errors exist', () => {
    // Enter edit mode
    cy.get('#modeToggle').click();
    cy.get('#ram-table').should('exist');

    // Create a validation error - invalid data value
    cy.get('#ram-table tbody tr').eq(5).within(() => {
      cy.get('input[data-validate="data"]').clear().type('invalid');
    });

    // Wait for validation to process
    cy.wait(200);

    // Verify row has validation error
    cy.get('#ram-table tbody tr').eq(5).should('have.class', 'validation-error');

    // Verify save button is disabled
    cy.get('#saveAllButton')
      .should('exist')
      .should('be.disabled')
      .should('have.css', 'cursor', 'not-allowed')
      .should('have.css', 'opacity', '0.5')
      .should('have.attr', 'title', 'Cannot save: Fix validation errors first');

    // Cancel button should still be enabled
    cy.get('#cancelButton')
      .should('exist')
      .should('not.be.disabled');
  });

  it('should enable save button when errors are fixed', () => {
    // Enter edit mode
    cy.get('#modeToggle').click();

    // Create validation error
    cy.get('#ram-table tbody tr').eq(4).within(() => {
      cy.get('input[data-validate="data"]').clear().type('not-a-number');
    });

    cy.wait(200);

    // Save button should be disabled
    cy.get('#saveAllButton').should('be.disabled');

    // Fix the error
    cy.get('#ram-table tbody tr').eq(4).within(() => {
      cy.get('input[data-validate="data"]').clear().type('42');
    });

    cy.wait(200);

    // Save button should be enabled
    cy.get('#saveAllButton')
      .should('not.be.disabled')
      .should('have.css', 'cursor', 'pointer')
      .should('have.css', 'opacity', '1')
      .should('have.attr', 'title', '');
  });

  it('should prevent saving when clicking disabled save button', () => {
    // Enter edit mode
    cy.get('#modeToggle').click();

    // Create validation error
    cy.get('#ram-table tbody tr').eq(3).within(() => {
      cy.get('input[data-validate="operand"]').clear().type('999');
    });

    cy.wait(200);

    // Try to click the disabled save button - it should not save
    cy.get('#saveAllButton').should('be.disabled');
    
    // Force click on disabled button (simulating programmatic bypass)
    cy.get('#saveAllButton').click({ force: true });

    // Should still be in edit mode (save didn't happen)
    cy.get('#modeToggle').should('contain', 'View');
    cy.get('#saveAllButton').should('exist');
    cy.get('#cancelButton').should('exist');

    // Error should still exist
    cy.get('#ram-table tbody tr').eq(3).should('have.class', 'validation-error');
  });

  it('should disable save with multiple validation errors', () => {
    // Enter edit mode
    cy.get('#modeToggle').click();

    // Create multiple validation errors
    // Error 1: Invalid data value
    cy.get('#ram-table tbody tr').eq(6).within(() => {
      cy.get('input[data-validate="data"]').clear().type('abc');
    });

    // Error 2: Out of bounds operand
    cy.get('#ram-table tbody tr').eq(1).within(() => {
      cy.get('input[data-validate="operand"]').clear().type('50');
    });

    // Error 3: Empty operand
    cy.get('#ram-table tbody tr').eq(2).within(() => {
      cy.get('input[data-validate="operand"]').clear();
    });

    cy.wait(300);

    // Verify multiple rows have errors
    cy.get('#ram-table tbody tr.validation-error').should('have.length.at.least', 3);

    // Save button should be disabled
    cy.get('#saveAllButton')
      .should('be.disabled')
      .should('have.attr', 'title', 'Cannot save: Fix validation errors first');

    // Fix one error
    cy.get('#ram-table tbody tr').eq(6).within(() => {
      cy.get('input[data-validate="data"]').clear().type('10');
    });

    cy.wait(200);

    // Save button should still be disabled (other errors remain)
    cy.get('#saveAllButton').should('be.disabled');

    // Fix second error
    cy.get('#ram-table tbody tr').eq(1).within(() => {
      cy.get('input[data-validate="operand"]').clear().type('5');
    });

    cy.wait(200);

    // Save button should still be disabled (one error remains)
    cy.get('#saveAllButton').should('be.disabled');

    // Fix last error
    cy.get('#ram-table tbody tr').eq(2).within(() => {
      cy.get('input[data-validate="operand"]').clear().type('3');
    });

    cy.wait(200);

    // Now save button should be enabled
    cy.get('#saveAllButton').should('not.be.disabled');
  });

  it('should allow cancel even with validation errors', () => {
    // Enter edit mode
    cy.get('#modeToggle').click();

    // Make a valid change first
    cy.get('#ram-table tbody tr').eq(5).within(() => {
      cy.get('input[data-validate="data"]').clear().type('99');
    });

    // Then create validation error
    cy.get('#ram-table tbody tr').eq(3).within(() => {
      cy.get('input[data-validate="operand"]').clear().type('invalid');
    });

    cy.wait(200);

    // Save button should be disabled
    cy.get('#saveAllButton').should('be.disabled');

    // But cancel button should be enabled
    cy.get('#cancelButton').should('not.be.disabled');

    // Click cancel
    cy.get('#cancelButton').click();

    // Should return to view mode
    cy.get('#modeToggle').should('contain', 'Modify');

    // Changes should be reverted (check the valid change was reverted)
    cy.get('#ram-table tbody tr').eq(5).find('td').eq(2).should('contain', '0');
  });
});
