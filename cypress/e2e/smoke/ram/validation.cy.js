describe('RAM Table Validation', () => {
  beforeEach(() => {
    cy.visit('/');
    // Switch to edit mode
    cy.get('#modeToggle').click();
  });

  describe('Input Placeholders', () => {
    it('should show "Number" placeholder for data value inputs', () => {
      // Find a data type row
      cy.get('#ram-table tbody tr').eq(4).within(() => {
        cy.get('td').eq(1).find('select').select('data');
      });
      
      // Check placeholder
      cy.get('#ram-table tbody tr').eq(4).within(() => {
        cy.get('td').eq(2).find('input').should('have.attr', 'placeholder', 'Number');
      });
    });

    it('should show "Address" placeholder for instruction operand inputs', () => {
      // Find an instruction type row
      cy.get('#ram-table tbody tr').eq(0).within(() => {
        cy.get('td').eq(1).find('select').select('instruction');
      });
      
      // Check placeholder on operand input
      cy.get('#ram-table tbody tr').eq(0).within(() => {
        cy.get('td').eq(2).find('input').should('have.attr', 'placeholder', 'Address');
      });
    });
  });

  describe('Data Value Validation', () => {
    it('should accept valid integer numbers', () => {
      // Test positive number
      cy.get('#ram-table tbody tr').eq(4).within(() => {
        cy.get('td').eq(1).find('select').select('data');
        cy.get('td').eq(2).find('input').clear().type('42');
      });
      
      cy.get('#ram-table tbody tr').eq(4).should('not.have.class', 'validation-error');
    });

    it('should accept negative integer numbers', () => {
      cy.get('#ram-table tbody tr').eq(4).within(() => {
        cy.get('td').eq(1).find('select').select('data');
        cy.get('td').eq(2).find('input').clear().type('-5');
      });
      
      cy.get('#ram-table tbody tr').eq(4).should('not.have.class', 'validation-error');
    });

    it('should accept zero', () => {
      cy.get('#ram-table tbody tr').eq(4).within(() => {
        cy.get('td').eq(1).find('select').select('data');
        cy.get('td').eq(2).find('input').clear().type('0');
      });
      
      cy.get('#ram-table tbody tr').eq(4).should('not.have.class', 'validation-error');
    });

    it('should reject text input', () => {
      cy.get('#ram-table tbody tr').eq(4).within(() => {
        cy.get('td').eq(1).find('select').select('data');
        cy.get('td').eq(2).find('input').clear().type('abc');
      });
      
      cy.get('#ram-table tbody tr').eq(4).should('have.class', 'validation-error');
      cy.get('#ram-table tbody tr').eq(4).should('have.attr', 'data-error').and('include', 'integer');
    });

    it('should reject boolean values', () => {
      cy.get('#ram-table tbody tr').eq(4).within(() => {
        cy.get('td').eq(1).find('select').select('data');
        cy.get('td').eq(2).find('input').clear().type('true');
      });
      
      cy.get('#ram-table tbody tr').eq(4).should('have.class', 'validation-error');
    });

    it('should reject decimal numbers', () => {
      cy.get('#ram-table tbody tr').eq(4).within(() => {
        cy.get('td').eq(1).find('select').select('data');
        cy.get('td').eq(2).find('input').clear().type('3.14');
      });
      
      cy.get('#ram-table tbody tr').eq(4).should('have.class', 'validation-error');
    });

    it('should reject empty values', () => {
      cy.get('#ram-table tbody tr').eq(4).within(() => {
        cy.get('td').eq(1).find('select').select('data');
        cy.get('td').eq(2).find('input').clear();
      });
      
      cy.get('#ram-table tbody tr').eq(4).should('have.class', 'validation-error');
      cy.get('#ram-table tbody tr').eq(4).should('have.attr', 'data-error').and('include', 'integer');
    });

    it('should reject special characters', () => {
      cy.get('#ram-table tbody tr').eq(4).within(() => {
        cy.get('td').eq(1).find('select').select('data');
        cy.get('td').eq(2).find('input').clear().type('$#@');
      });
      
      cy.get('#ram-table tbody tr').eq(4).should('have.class', 'validation-error');
    });
  });

  describe('Instruction Operand Validation', () => {
    it('should accept valid address within bounds', () => {
      cy.get('#ram-table tbody tr').eq(0).within(() => {
        cy.get('td').eq(1).find('select').select('instruction');
        cy.get('td').eq(2).find('input').clear().type('3');
      });
      
      cy.get('#ram-table tbody tr').eq(0).should('not.have.class', 'validation-error');
    });

    it('should reject non-numeric operand', () => {
      cy.get('#ram-table tbody tr').eq(0).within(() => {
        cy.get('td').eq(1).find('select').select('instruction');
        cy.get('td').eq(2).find('input').clear().type('abc');
      });
      
      cy.get('#ram-table tbody tr').eq(0).should('have.class', 'validation-error');
      cy.get('#ram-table tbody tr').eq(0).should('have.attr', 'data-error').and('include', 'integer');
    });

    it('should reject empty operand', () => {
      cy.get('#ram-table tbody tr').eq(0).within(() => {
        cy.get('td').eq(1).find('select').select('instruction');
        cy.get('td').eq(2).find('input').clear();
      });
      
      cy.get('#ram-table tbody tr').eq(0).should('have.class', 'validation-error');
      cy.get('#ram-table tbody tr').eq(0).should('have.attr', 'data-error').and('include', 'requires');
    });

    it('should reject out-of-bounds address (negative)', () => {
      cy.get('#ram-table tbody tr').eq(0).within(() => {
        cy.get('td').eq(1).find('select').select('instruction');
        cy.get('td').eq(2).find('input').clear().type('-1');
      });
      
      cy.get('#ram-table tbody tr').eq(0).should('have.class', 'validation-error');
      cy.get('#ram-table tbody tr').eq(0).should('have.attr', 'data-error').and('include', 'out of bounds');
    });

    it('should reject out-of-bounds address (too high)', () => {
      cy.get('#ram-table tbody tr').eq(0).within(() => {
        cy.get('td').eq(1).find('select').select('instruction');
        cy.get('td').eq(2).find('input').clear().type('999');
      });
      
      cy.get('#ram-table tbody tr').eq(0).should('have.class', 'validation-error');
      cy.get('#ram-table tbody tr').eq(0).should('have.attr', 'data-error').and('include', 'out of bounds');
    });

    it('should validate address bounds when RAM size changes', () => {
      // Initially set a valid address
      cy.get('#ram-table tbody tr').eq(0).within(() => {
        cy.get('td').eq(1).find('select').select('instruction');
        cy.get('td').eq(2).find('input').clear().type('7');
      });
      
      cy.get('#ram-table tbody tr').eq(0).should('not.have.class', 'validation-error');
      
      // Remove rows to make the address out of bounds
      cy.get('#ram-table tbody tr').eq(7).find('.remove-row-btn').click();
      cy.get('#ram-table tbody tr').eq(6).find('.remove-row-btn').click();
      
      // Trigger validation by typing in the input
      cy.get('#ram-table tbody tr').eq(0).within(() => {
        cy.get('td').eq(2).find('input').clear().type('7');
      });
      
      cy.wait(300);
      
      // Now address 7 should be invalid (only 6 rows remain: 0-5)
      cy.get('#ram-table tbody tr').eq(0).should('have.class', 'validation-error');
      cy.get('#ram-table tbody tr').eq(0).should('have.attr', 'data-error').and('include', 'out of bounds');
    });
  });

  describe('Visual Error Highlighting', () => {
    it('should highlight row with validation error', () => {
      cy.get('#ram-table tbody tr').eq(4).within(() => {
        cy.get('td').eq(1).find('select').select('data');
        cy.get('td').eq(2).find('input').clear().type('invalid');
      });
      
      cy.get('#ram-table tbody tr').eq(4)
        .should('have.class', 'validation-error');
      
      // Check that td cells have error background
      cy.get('#ram-table tbody tr').eq(4).find('td').eq(0)
        .should('have.css', 'background-color')
        .and('not.equal', 'rgba(0, 0, 0, 0)');
    });

    it('should apply error styling to input fields', () => {
      cy.get('#ram-table tbody tr').eq(4).within(() => {
        cy.get('td').eq(1).find('select').select('data');
        cy.get('td').eq(2).find('input').clear().type('invalid');
      });
      
      cy.get('#ram-table tbody tr').eq(4).find('input')
        .should('have.css', 'border-color')
        .and('include', 'rgb');
    });

    it('should remove error highlighting when fixed', () => {
      // Create error
      cy.get('#ram-table tbody tr').eq(4).within(() => {
        cy.get('td').eq(1).find('select').select('data');
        cy.get('td').eq(2).find('input').clear().type('invalid');
      });
      
      cy.get('#ram-table tbody tr').eq(4).should('have.class', 'validation-error');
      
      // Fix error
      cy.get('#ram-table tbody tr').eq(4).within(() => {
        cy.get('td').eq(2).find('input').clear().type('42');
      });
      
      cy.get('#ram-table tbody tr').eq(4).should('not.have.class', 'validation-error');
    });
  });

  describe('Error Tooltips', () => {
    it('should display error message on hover (desktop)', () => {
      cy.get('#ram-table tbody tr').eq(4).within(() => {
        cy.get('td').eq(1).find('select').select('data');
        cy.get('td').eq(2).find('input').clear().type('abc');
      });
      
      cy.get('#ram-table tbody tr').eq(4)
        .should('have.attr', 'data-error')
        .and('include', 'integer');
    });

    it('should show detailed error for invalid instruction operand', () => {
      cy.get('#ram-table tbody tr').eq(0).within(() => {
        cy.get('td').eq(1).find('select').select('instruction');
        cy.get('td').eq(2).find('input').clear().type('999');
      });
      
      cy.get('#ram-table tbody tr').eq(0)
        .should('have.attr', 'data-error')
        .and('include', 'out of bounds');
    });
  });

  describe('Save Button Behavior', () => {
    it('should disable save button when validation errors exist', () => {
      // Make an invalid change
      cy.get('#ram-table tbody tr').eq(4).within(() => {
        cy.get('td').eq(1).find('select').select('data');
        cy.get('td').eq(2).find('input').clear().type('invalid');
      });
      
      // Wait for validation
      cy.wait(200);
      
      // Save button should be disabled with error message
      cy.get('#saveAllButton').should('be.disabled');
      cy.get('#saveAllButton').should('have.attr', 'title').and('include', 'Cannot save');
      cy.get('#saveAllButton').should('have.css', 'opacity', '0.5');
    });

    it('should enable save button when all errors are fixed', () => {
      // Create an error
      cy.get('#ram-table tbody tr').eq(4).within(() => {
        cy.get('td').eq(1).find('select').select('data');
        cy.get('td').eq(2).find('input').clear().type('invalid');
      });
      
      // Should be disabled
      cy.get('#saveAllButton').should('be.disabled');
      cy.get('#saveAllButton').should('have.attr', 'title').and('include', 'Cannot save');
      
      // Fix the error
      cy.get('#ram-table tbody tr').eq(4).within(() => {
        cy.get('td').eq(2).find('input').clear().type('42');
      });
      
      cy.wait(200);
      
      // Save button should be enabled without error message
      cy.get('#saveAllButton').should('not.be.disabled');
      cy.get('#saveAllButton').should('have.attr', 'title', '');
      cy.get('#saveAllButton').should('have.css', 'opacity', '1');
    });

    it('should prevent saving with validation errors', () => {
      // Create an error
      cy.get('#ram-table tbody tr').eq(4).within(() => {
        cy.get('td').eq(1).find('select').select('data');
        cy.get('td').eq(2).find('input').clear().type('invalid');
      });
      
      // Save button should be disabled
      cy.get('#saveAllButton').should('be.disabled');
      cy.get('#saveAllButton').should('have.attr', 'title').and('include', 'Cannot save');
      
      // Button should remain in edit mode with changes
      cy.get('#modeToggle').should('contain', 'View');
      cy.get('#saveAllButton').should('exist');
    });

    it('should allow saving when all values are valid', () => {
      // Modify a value correctly
      cy.get('#ram-table tbody tr').eq(4).within(() => {
        cy.get('td').eq(1).find('select').select('data');
        cy.get('td').eq(2).find('input').clear().type('100');
      });
      
      cy.wait(200);
      
      // Save should work and be enabled
      cy.get('#saveAllButton').should('not.be.disabled').click();
      
      // After saving, the save button should disappear (no changes to save)
      cy.get('#saveAllButton').should('not.exist');
      
      // Should still be in edit mode with View button visible
      cy.get('#modeToggle').find('#modeText').should('contain', 'View');
    });
  });

  describe('Multiple Validation Errors', () => {
    it('should track multiple errors across different rows', () => {
      // Create error in row 1
      cy.get('#ram-table tbody tr').eq(0).within(() => {
        cy.get('td').eq(1).find('select').select('instruction');
        cy.get('td').eq(2).find('input').clear().type('abc');
      });
      
      // Create error in row 2
      cy.get('#ram-table tbody tr').eq(4).within(() => {
        cy.get('td').eq(1).find('select').select('data');
        cy.get('td').eq(2).find('input').clear().type('xyz');
      });
      
      cy.wait(200);
      
      // Both should be highlighted
      cy.get('#ram-table tbody tr').eq(0).should('have.class', 'validation-error');
      cy.get('#ram-table tbody tr').eq(4).should('have.class', 'validation-error');
      
      // Save button should be disabled
      cy.get('#saveAllButton').should('be.disabled');
      cy.get('#saveAllButton').should('have.attr', 'title').and('include', 'Cannot save');
    });

    it('should remove warning only when all errors are fixed', () => {
      // Create multiple errors
      cy.get('#ram-table tbody tr').eq(0).within(() => {
        cy.get('td').eq(1).find('select').select('instruction');
        cy.get('td').eq(2).find('input').clear().type('abc');
      });
      
      cy.get('#ram-table tbody tr').eq(4).within(() => {
        cy.get('td').eq(1).find('select').select('data');
        cy.get('td').eq(2).find('input').clear().type('xyz');
      });
      
      cy.wait(200);
      // Should be disabled
      cy.get('#saveAllButton').should('be.disabled');
      cy.get('#saveAllButton').should('have.attr', 'title').and('include', 'Cannot save');
      
      // Fix first error
      cy.get('#ram-table tbody tr').eq(0).within(() => {
        cy.get('td').eq(2).find('input').clear().type('3');
      });
      
      cy.wait(200);
      // Still disabled because second error exists
      cy.get('#saveAllButton').should('be.disabled');
      cy.get('#saveAllButton').should('have.attr', 'title').and('include', 'Cannot save');
      
      // Fix second error
      cy.get('#ram-table tbody tr').eq(4).within(() => {
        cy.get('td').eq(2).find('input').clear().type('42');
      });
      
      cy.wait(200);
      // Now should be enabled without error message
      cy.get('#saveAllButton').should('not.be.disabled');
      cy.get('#saveAllButton').should('have.attr', 'title', '');
      cy.get('#saveAllButton').should('have.css', 'opacity', '1');
    });
  });

  describe('Edge Cases', () => {
    it('should validate newly added rows', () => {
      // Add a new row
      cy.get('.add-row-btn').click();
      
      // The new row should have default valid value
      cy.get('#ram-table tbody tr').should('have.length.at.least', 8);
      
      // Modify it to be invalid
      cy.get('#ram-table tbody tr').eq(8).within(() => {
        cy.get('td').eq(1).find('select').select('data');
        cy.get('td').eq(2).find('input').clear().type('invalid');
      });
      
      cy.get('#ram-table tbody tr').eq(8).should('have.class', 'validation-error');
    });

    it('should clear validation errors when switching to display mode', () => {
      // Create an error
      cy.get('#ram-table tbody tr').eq(4).within(() => {
        cy.get('td').eq(1).find('select').select('data');
        cy.get('td').eq(2).find('input').clear().type('invalid');
      });
      
      cy.get('#ram-table tbody tr').eq(4).should('have.class', 'validation-error');
      
      // Cancel changes (returns to display mode)
      cy.get('#cancelButton').click();
      
      // No validation errors should exist
      cy.get('.validation-error').should('not.exist');
    });

    it('should handle type switching with validation', () => {
      // Set as data with valid value
      cy.get('#ram-table tbody tr').eq(0).within(() => {
        cy.get('td').eq(1).find('select').select('data');
        cy.get('td').eq(2).find('input').clear().type('42');
      });
      
      cy.get('#ram-table tbody tr').eq(0).should('not.have.class', 'validation-error');
      
      // Switch to instruction
      cy.get('#ram-table tbody tr').eq(0).within(() => {
        cy.get('td').eq(1).find('select').select('instruction');
      });
      
      // Should now validate as instruction (42 might be out of bounds)
      cy.wait(200);
    });
  });

  describe('Placeholder Visibility', () => {
    it('should show placeholder when field is empty', () => {
      cy.get('#ram-table tbody tr').eq(4).within(() => {
        cy.get('td').eq(1).find('select').select('data');
        cy.get('td').eq(2).find('input').clear();
      });
      
      cy.get('#ram-table tbody tr').eq(4).find('td').eq(2).find('input')
        .should('have.attr', 'placeholder', 'Number')
        .invoke('attr', 'placeholder')
        .should('not.be.empty');
    });

    it('should hide placeholder when user types', () => {
      cy.get('#ram-table tbody tr').eq(4).within(() => {
        cy.get('td').eq(1).find('select').select('data');
        cy.get('td').eq(2).find('input').clear().type('5');
      });
      
      cy.get('#ram-table tbody tr').eq(4).find('td').eq(2).find('input')
        .should('have.value', '5');
    });
  });
});
