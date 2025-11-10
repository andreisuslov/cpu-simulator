describe('Smoke Test: CPU Reset', () => {
  beforeEach(() => {
    cy.visit('/index.html')
  })

  it('should have reset button visible', () => {
    cy.get('.reset-btn').should('be.visible')
  })

  it('should reset CPU to initial state', () => {
    // Execute some instructions
    cy.get('#clockTick').click()
    cy.get('#clockTick').click()
    cy.get('#clockTick').click()
    
    // Reset
    cy.get('.reset-btn').first().click()
    
    // Verify reset
    cy.get('#pc').should('have.text', '0')
    cy.get('#ir').should('have.text', 'NIL')
    cy.get('#accumulator').should('have.text', '0')
    cy.get('[data-phase="Fetch"]').should('have.class', 'active-phase')
  })

  it('should clear any execution errors on reset', () => {
    cy.get('.reset-btn').first().click()
    cy.get('#executionError').should('have.text', '')
  })
})
