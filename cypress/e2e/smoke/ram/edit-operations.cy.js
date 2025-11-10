describe('Smoke Test: RAM Edit Operations', () => {
  beforeEach(() => {
    cy.visit('/index.html')
    cy.get('#modeToggle').click() // Enter edit mode
  })

  it('should show add row button in edit mode', () => {
    cy.get('.add-row-btn').should('be.visible')
    cy.get('.add-row-btn').should('contain', 'Add Row')
  })

  it('should add a new row', () => {
    cy.get('#ram-table tbody tr').its('length').then(initialLength => {
      cy.get('.add-row-btn').click()
      cy.get('#ram-table tbody tr').should('have.length', initialLength + 1)
    })
  })

  it('should show remove buttons in edit mode', () => {
    cy.get('.remove-row-btn').should('exist')
  })

  it('should show input fields for editing in edit mode', () => {
    cy.get('#ram-table tbody tr').first().find('select').should('exist')
  })

  it('should display type selectors in edit mode', () => {
    cy.get('#ram-table tbody tr').first().find('select').first().should('be.visible')
  })
})
