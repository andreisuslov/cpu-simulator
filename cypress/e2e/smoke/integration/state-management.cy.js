describe('Smoke Test: State Management', () => {
  beforeEach(() => {
    cy.visit('/index.html')
  })

  it('should preserve execution state across operations', () => {
    cy.get('#clockTick').click()
    cy.get('[data-phase="Decode"]').should('have.class', 'active-phase')
    cy.get('#modeToggle').click()
    cy.get('#modeToggle').click()
    cy.get('[data-phase="Decode"]').should('have.class', 'active-phase')
  })

  it('should reset state properly', () => {
    cy.get('#clockTick').click().click().click()
    cy.get('.reset-btn').first().click()
    cy.get('[data-phase="Fetch"]').should('have.class', 'active-phase')
    cy.get('#pc').should('have.text', '0')
  })

  it('should handle multiple resets', () => {
    cy.get('.reset-btn').first().click()
    cy.get('.reset-btn').first().click()
    cy.get('.reset-btn').first().click()
    cy.get('#pc').should('have.text', '0')
  })
})
