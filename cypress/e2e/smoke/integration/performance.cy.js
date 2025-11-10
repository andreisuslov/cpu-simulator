describe('Smoke Test: Performance', () => {
  beforeEach(() => {
    cy.visit('/index.html')
  })

  it('should load within reasonable time', () => {
    const start = Date.now()
    cy.visit('/index.html')
    cy.get('.container').should('be.visible').then(() => {
      const loadTime = Date.now() - start
      expect(loadTime).to.be.lessThan(3000)
    })
  })

  it('should execute instructions quickly', () => {
    const start = Date.now()
    for (let i = 0; i < 10; i++) {
      cy.get('#clockTick').click()
    }
    cy.then(() => {
      const execTime = Date.now() - start
      expect(execTime).to.be.lessThan(2000)
    })
  })

  it('should handle rapid mode switches', () => {
    cy.get('.pill-button-selection_auto').click()
    cy.get('.pill-button-selection_manual').click()
    cy.get('.pill-button-selection_auto').click()
    cy.get('.pill-button-selection_manual').click()
    cy.get('.container').should('be.visible')
  })
})
