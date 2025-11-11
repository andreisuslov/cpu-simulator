describe('RAM Validation Tooltip - Hides on Exit From Edit Mode', () => {
  beforeEach(() => {
    cy.visit('/');
    // Enter edit mode
    cy.get('#modeToggle').click();
    cy.wait(300);
  });

  it('should hide the validation tooltip after exiting edit mode via Cancel', () => {
    const rowIndex = 4; // Default data row in seed RAM

    // Ensure row is Data and trigger a validation error
    cy.get('#ram-table tbody tr').eq(rowIndex).within(() => {
      cy.get('td').eq(1).find('select').select('data');
      cy.get('td').eq(2).find('input').clear();
    });

    // Wait for validation and show tooltip via hover (mouseover is what the app listens for)
    cy.wait(300);
    cy.get('#ram-table tbody tr').eq(rowIndex)
      .should('have.class', 'validation-error')
      .find('td').first().trigger('mouseover');

    // Tooltip should appear (JS adds class 'show' with delay)
    cy.wait(400);
    cy.get('.validation-tooltip')
      .should('exist')
      .should('have.class', 'show')
      .and('have.css', 'visibility', 'visible')
      .and('have.css', 'opacity', '1');

    // Exit edit mode using Cancel (discads changes + exits edit mode)
    cy.get('#cancelButton').click();

    // Verify tooltip is fully hidden and cannot reappear in display mode
    cy.wait(100);
    cy.get('.validation-tooltip')
      .should('exist')
      .should('not.have.class', 'show')
      .and($el => {
        // Ensure hard-hide to prevent delayed timers from re-showing it
        const display = getComputedStyle($el[0]).display;
        expect(display).to.equal('none');
      });

    // No validation error rows should remain
    cy.get('.validation-error').should('not.exist');

    // Confirm we are back in display mode
    cy.get('#modeToggle #modeText').should('contain', 'Modify');
  });
});
