describe('RAM Row Position Stability', () => {
  it('should maintain row #1 position after removing row, fixing validation, and executing code', () => {
    // Step 1: Open the page of the app
    cy.visit('/');
    
    // Step 2: Enter edit mode
    cy.get('#modeToggle').click();
    cy.wait(500);
    
    // Step 3: Capture the coordinates of row at address #1, save them
    let initialRow1Positions = {};
    
    cy.get('#ram-table tbody tr').eq(1).then($row => {
      const addressCell = $row.find('td').eq(0)[0];
      const typeSelect = $row.find('td').eq(1).find('select')[0];
      const valueCell = $row.find('td').eq(2)[0];
      
      initialRow1Positions.address = addressCell.getBoundingClientRect();
      initialRow1Positions.typeSelect = typeSelect.getBoundingClientRect();
      initialRow1Positions.valueCell = valueCell.getBoundingClientRect();
    });
    
    // Step 4: Remove row at address #7
    cy.get('#ram-table tbody tr').eq(7).find('.remove-row-btn').click();
    cy.wait(200);
    
    // Step 5: Try to save changes - should see validation errors
    cy.wait(300);
    
    // Address 1 has "ADD 7" which is now out of bounds, should have validation error
    cy.get('#ram-table tbody tr').eq(1).should('have.class', 'validation-error');
    
    // Step 6: Fix the error by adding a new row and setting data to it, with value '1'
    cy.get('.add-row-btn').click();
    cy.wait(200);
    
    // The new row should be at address #7 (the last row) - set it to data with value '1'
    cy.get('#ram-table tbody tr').eq(7).within(() => {
      cy.get('td').eq(1).find('select').select('data');
      cy.get('td').eq(2).find('input').clear().type('1');
    });
    
    cy.wait(300);
    
    // Validation error should now be gone
    cy.get('#ram-table tbody tr').eq(1).should('not.have.class', 'validation-error');
    
    // Step 7: Save the changes
    cy.get('#saveAllButton').should('not.be.disabled').click();
    cy.wait(200);
    
    // Exit edit mode
    cy.get('#modeToggle').click();
    cy.wait(200);
    
    // Step 8: Enter auto mode  
    cy.get('.pill-button-selection_auto').click();
    cy.wait(200);
    
    // Step 9: Create a runtime error scenario
    // Go back to manual mode and edit
    cy.get('.pill-button-selection_manual').click();
    cy.wait(200);
    cy.get('#modeToggle').click();
    cy.wait(300);
    
    // Change row 3 (JUMP 1) to JUMP 99 to cause runtime error
    cy.get('#ram-table tbody tr').eq(3).within(() => {
      cy.get('td').eq(2).find('input').clear().type('99');
    });
    
    cy.wait(300);
    
    // Save with validation warning (button should be enabled even with validation error)
    cy.get('#saveAllButton').should('not.be.disabled').click();
    cy.wait(200);
    
    // Exit edit mode
    cy.get('#modeToggle').click();
    cy.wait(200);
    
    // Enter auto mode and start
    cy.get('.pill-button-selection_auto').click();
    cy.wait(200);
    cy.get('#startBtn').click();
    
    // Wait for error to appear - JUMP 99 will cause out of bounds error
    cy.get('#executionError', { timeout: 10000 }).should('not.be.empty').should('be.visible');
    cy.wait(500);
    
    // Step 10: Click edit table button
    cy.get('#modeToggle').click();
    cy.wait(500);
    
    // Step 11: Compare the coordinates of the row at address #1
    cy.get('#ram-table tbody tr').eq(1).then($row => {
      const addressCell = $row.find('td').eq(0)[0];
      const typeSelect = $row.find('td').eq(1).find('select')[0];
      const valueCell = $row.find('td').eq(2)[0];
      
      const addressRect = addressCell.getBoundingClientRect();
      const typeSelectRect = typeSelect.getBoundingClientRect();
      const valueCellRect = valueCell.getBoundingClientRect();
      
      // Critical: NO horizontal shifting
      expect(Math.abs(addressRect.left - initialRow1Positions.address.left)).to.be.lessThan(1);
      expect(Math.abs(typeSelectRect.left - initialRow1Positions.typeSelect.left)).to.be.lessThan(1);
      expect(Math.abs(valueCellRect.left - initialRow1Positions.valueCell.left)).to.be.lessThan(1);
      
      // NO vertical shifting
      expect(Math.abs(addressRect.top - initialRow1Positions.address.top)).to.be.lessThan(5);
      expect(Math.abs(typeSelectRect.top - initialRow1Positions.typeSelect.top)).to.be.lessThan(5);
      expect(Math.abs(valueCellRect.top - initialRow1Positions.valueCell.top)).to.be.lessThan(5);
    });
  });
});
