describe('Smoke Test: Error Handling', () => {
  beforeEach(() => {
    cy.visit('/index.html')
  })

  it('should have error display element', () => {
    cy.get('#executionError').should('exist')
  })

  it('should start with no errors', () => {
    cy.get('#executionError').should('have.text', '')
  })

  it('should not break when clicking multiple times rapidly', () => {
    cy.get('#clockTick').click().click().click().click()
    cy.get('.container').should('be.visible')
  })

  it('should handle mode switches during execution', () => {
    cy.get('#clockTick').click()
    cy.get('.pill-button-selection_auto').click()
    cy.get('.pill-button-selection_manual').click()
    cy.get('.container').should('be.visible')
  })
})
