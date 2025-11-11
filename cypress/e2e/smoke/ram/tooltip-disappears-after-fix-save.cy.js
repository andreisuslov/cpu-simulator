describe('RAM Validation Tooltip - Disappears After Fix And Save', () => {
  it('flows: remove row 7 -> invalid save -> tooltip appears -> fix row 1 to 6 -> save -> tooltip disappears', () => {
    cy.visit('/');

    // Enter edit mode
    cy.get('#modeToggle').click();
    cy.wait(200);

    // Remove row with address #7
    cy.get('#ram-table tbody tr').eq(7).find('.remove-row-btn').click();

    // Validation should run and create an error on row with address #1 (was ADD 7)
    cy.wait(300);
    cy.get('#ram-table tbody tr').eq(1)
      .should('have.class', 'validation-error')
      .and('have.attr', 'data-error')
      .and('include', 'out of bounds');

    // Try to save changes - expect failure (button disabled)
    cy.get('#saveAllButton').should('exist').should('be.disabled');
    // Attempt click explicitly to mirror user action
    cy.get('#saveAllButton').click({ force: true });

    // Show the validation tooltip and capture its state
    cy.get('#ram-table tbody tr').eq(1).find('td').first().trigger('mouseover');
    cy.wait(400);

    cy.get('.validation-tooltip')
      .should('exist')
      .should('have.class', 'show')
      .invoke('text')
      .then(text => {
        expect(text).to.include('out of bounds');
      });

    // Capture tooltip coordinates for reference
    cy.get('.validation-tooltip').then($el => {
      const rect = $el[0].getBoundingClientRect();
      // Store as alias (not asserted here, but recorded as part of the flow)
      cy.wrap({ left: rect.left, top: rect.top }).as('tooltipCoords');
    });

    // Fix the value reference to address #6 in row with address #1
    cy.get('#ram-table tbody tr').eq(1).within(() => {
      cy.get('td').eq(2).find('input').clear().type('6');
    });

    cy.wait(300);

    // Save the changes (should be enabled now)
    cy.get('#saveAllButton').should('not.be.disabled').click();

    // Tooltip should disappear after the fix + save
    cy.get('.validation-tooltip')
      .should('exist')
      .should('not.have.class', 'show')
      .and($el => {
        const display = getComputedStyle($el[0]).display;
        // This is the expected state; current implementation likely fails here before the fix
        expect(display, 'validation tooltip should be hidden after saving valid state').to.equal('none');
      });

    // Assert edit affordances are not available after save
    cy.get('.add-row-btn').should('not.exist');
    cy.get('.edit-column').should('have.class', 'hidden');
    cy.get('#ram-table tbody td.actions-cell').should('not.exist');
  });
});
