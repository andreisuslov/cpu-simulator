describe('RAM Table Validation - Layout Stability', () => {
  beforeEach(() => {
    cy.visit('/');
    // Switch to edit mode
    cy.get('#modeToggle').click();
    // Wait for edit mode to fully render and stabilize
    cy.wait(500);
  });

  describe('Row Position Stability', () => {
    it('should not shift row position when validation error appears', () => {
      const rowIndex = 4;
      
      // Get initial positions of key elements in the row
      let initialPositions = {};
      
      cy.get('#ram-table tbody tr').eq(rowIndex).then($row => {
        const addressCell = $row.find('td').eq(0)[0];
        const valueInput = $row.find('td').eq(2).find('input')[0];
        const removeButton = $row.find('td').eq(3).find('.remove-row-btn')[0];
        
        initialPositions.address = addressCell.getBoundingClientRect();
        initialPositions.valueInput = valueInput.getBoundingClientRect();
        initialPositions.removeButton = removeButton.getBoundingClientRect();
      });
      
      // Now erase the value to trigger validation error
      cy.get('#ram-table tbody tr').eq(rowIndex).within(() => {
        cy.get('td').eq(2).find('input').clear();
      });
      
      // Wait for validation to run
      cy.wait(300);
      
      // Verify error class is present
      cy.get('#ram-table tbody tr').eq(rowIndex).should('have.class', 'validation-error');
      
      // Check that positions remain stable (no shifting left/right/up/down)
      cy.get('#ram-table tbody tr').eq(rowIndex).then($row => {
        const addressCell = $row.find('td').eq(0)[0];
        const valueInput = $row.find('td').eq(2).find('input')[0];
        const removeButton = $row.find('td').eq(3).find('.remove-row-btn')[0];
        
        const addressRect = addressCell.getBoundingClientRect();
        const valueInputRect = valueInput.getBoundingClientRect();
        const removeButtonRect = removeButton.getBoundingClientRect();
        
        // Critical: NO horizontal shifting - addresses should stay at same X position
        expect(Math.abs(addressRect.left - initialPositions.address.left)).to.be.lessThan(1);
        expect(Math.abs(valueInputRect.left - initialPositions.valueInput.left)).to.be.lessThan(1);
        expect(Math.abs(removeButtonRect.left - initialPositions.removeButton.left)).to.be.lessThan(1);
        
        // Critical: NO vertical shifting - row should stay at same Y position  
        expect(Math.abs(addressRect.top - initialPositions.address.top)).to.be.lessThan(1);
        expect(Math.abs(valueInputRect.top - initialPositions.valueInput.top)).to.be.lessThan(1);
        expect(Math.abs(removeButtonRect.top - initialPositions.removeButton.top)).to.be.lessThan(1);
        
        // Width should remain stable
        expect(Math.abs(addressRect.width - initialPositions.address.width)).to.be.lessThan(1);
        expect(Math.abs(valueInputRect.width - initialPositions.valueInput.width)).to.be.lessThan(1);
      });
    });

    it('should keep tooltip above row without blocking input', () => {
      const rowIndex = 4;
      
      // Erase value to trigger error
      cy.get('#ram-table tbody tr').eq(rowIndex).within(() => {
        cy.get('td').eq(2).find('input').clear();
      });
      
      cy.wait(300);
      
      // Verify input is still accessible
      cy.get('#ram-table tbody tr').eq(rowIndex).within(() => {
        cy.get('td').eq(2).find('input').should('be.visible').should('not.be.disabled');
      });
      
      // Hover to show tooltip and verify it doesn't block input
      cy.get('#ram-table tbody tr').eq(rowIndex).trigger('mouseenter');
      cy.wait(400);
      
      // Input should still be visible and accessible
      cy.get('#ram-table tbody tr').eq(rowIndex).within(() => {
        cy.get('td').eq(2).find('input').should('be.visible').should('not.be.disabled');
      });
    });

    it('should maintain row height when error appears', () => {
      const rowIndex = 4;
      
      // Get initial row height
      let initialHeight;
      cy.get('#ram-table tbody tr').eq(rowIndex).then($el => {
        initialHeight = $el[0].getBoundingClientRect().height;
      });
      
      // Trigger error
      cy.get('#ram-table tbody tr').eq(rowIndex).within(() => {
        cy.get('td').eq(2).find('input').clear();
      });
      
      cy.wait(300);
      
      // Check height hasn't changed
      cy.get('#ram-table tbody tr').eq(rowIndex).then($el => {
        const newHeight = $el[0].getBoundingClientRect().height;
        expect(newHeight).to.equal(initialHeight);
      });
    });

    it('should not affect other rows when error appears', () => {
      const errorRowIndex = 4;
      const adjacentRowIndex = 5;
      
      // Get initial position of adjacent row
      let initialAdjacentPosition;
      cy.get('#ram-table tbody tr').eq(adjacentRowIndex).then($el => {
        const rect = $el[0].getBoundingClientRect();
        initialAdjacentPosition = { left: rect.left, top: rect.top };
      });
      
      // Trigger error in row 4
      cy.get('#ram-table tbody tr').eq(errorRowIndex).within(() => {
        cy.get('td').eq(2).find('input').clear();
      });
      
      cy.wait(300);
      
      // Check adjacent row hasn't moved
      cy.get('#ram-table tbody tr').eq(adjacentRowIndex).then($el => {
        const rect = $el[0].getBoundingClientRect();
        expect(rect.left).to.equal(initialAdjacentPosition.left);
        expect(rect.top).to.equal(initialAdjacentPosition.top);
      });
    });

    it('should allow typing in error field without layout shifts', () => {
      const rowIndex = 4;
      
      // Erase to trigger error
      cy.get('#ram-table tbody tr').eq(rowIndex).within(() => {
        cy.get('td').eq(2).find('input').clear();
      });
      
      cy.wait(300);
      
      // Get position before typing
      let positionBeforeTyping;
      cy.get('#ram-table tbody tr').eq(rowIndex).find('td').eq(2).find('input').then($el => {
        positionBeforeTyping = $el[0].getBoundingClientRect();
      });
      
      // Type some text (still invalid)
      cy.get('#ram-table tbody tr').eq(rowIndex).within(() => {
        cy.get('td').eq(2).find('input').type('abc');
      });
      
      cy.wait(200);
      
      // Position should remain exactly the same (no shifts)
      cy.get('#ram-table tbody tr').eq(rowIndex).find('td').eq(2).find('input').then($el => {
        const rect = $el[0].getBoundingClientRect();
        expect(Math.abs(rect.left - positionBeforeTyping.left)).to.be.lessThan(1);
        expect(Math.abs(rect.top - positionBeforeTyping.top)).to.be.lessThan(1);
        expect(Math.abs(rect.width - positionBeforeTyping.width)).to.be.lessThan(1);
      });
    });

    it('should keep row stable when error is fixed', () => {
      const rowIndex = 4;
      
      // Trigger error first
      cy.get('#ram-table tbody tr').eq(rowIndex).within(() => {
        cy.get('td').eq(2).find('input').clear();
      });
      
      cy.wait(300);
      
      // Get positions with error
      let positionsWithError = {};
      cy.get('#ram-table tbody tr').eq(rowIndex).then($row => {
        const addressCell = $row.find('td').eq(0)[0];
        const valueInput = $row.find('td').eq(2).find('input')[0];
        
        positionsWithError.address = addressCell.getBoundingClientRect();
        positionsWithError.valueInput = valueInput.getBoundingClientRect();
      });
      
      // Fix the error
      cy.get('#ram-table tbody tr').eq(rowIndex).within(() => {
        cy.get('td').eq(2).find('input').type('42');
      });
      
      cy.wait(300);
      
      // Positions should remain stable after fixing (no shifts)
      cy.get('#ram-table tbody tr').eq(rowIndex).then($row => {
        const addressCell = $row.find('td').eq(0)[0];
        const valueInput = $row.find('td').eq(2).find('input')[0];
        
        const addressRect = addressCell.getBoundingClientRect();
        const valueInputRect = valueInput.getBoundingClientRect();
        
        // Both horizontal and vertical positions should remain stable
        expect(Math.abs(addressRect.left - positionsWithError.address.left)).to.be.lessThan(1);
        expect(Math.abs(addressRect.top - positionsWithError.address.top)).to.be.lessThan(1);
        expect(Math.abs(valueInputRect.left - positionsWithError.valueInput.left)).to.be.lessThan(1);
        expect(Math.abs(valueInputRect.top - positionsWithError.valueInput.top)).to.be.lessThan(1);
      });
    });

    it('should position tooltip above the row without overlapping', () => {
      const rowIndex = 4;
      
      // Trigger error
      cy.get('#ram-table tbody tr').eq(rowIndex).within(() => {
        cy.get('td').eq(2).find('input').clear();
      });
      
      cy.wait(300);
      
      // Verify error row exists with data-error attribute
      cy.get('#ram-table tbody tr').eq(rowIndex)
        .should('have.class', 'validation-error')
        .should('have.attr', 'data-error')
        .and('not.be.empty');
      
      // Trigger tooltip display
      cy.get('#ram-table tbody tr').eq(rowIndex).trigger('mouseenter');
      cy.wait(400);
      
      // Verify the row and input remain visible and accessible
      cy.get('#ram-table tbody tr').eq(rowIndex).should('be.visible');
      cy.get('#ram-table tbody tr').eq(rowIndex).within(() => {
        cy.get('td').eq(2).find('input').should('be.visible');
      });
    });
  });
});
