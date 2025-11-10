describe('Smoke Test: Basic Workflow', () => {
  beforeEach(() => {
    cy.visit('/index.html')
  })

  it('should complete a full instruction cycle', () => {
    cy.get('[data-phase="Fetch"]').should('have.class', 'active-phase')
    cy.get('#clockTick').click()
    cy.get('[data-phase="Decode"]').should('have.class', 'active-phase')
    cy.get('#clockTick').click()
    cy.get('[data-phase="Execute"]').should('have.class', 'active-phase')
    cy.get('#clockTick').click()
    cy.get('[data-phase="Fetch"]').should('have.class', 'active-phase')
  })

  it('should execute the default program', () => {
    // Execute multiple full cycles
    for (let i = 0; i < 12; i++) {
      cy.get('#clockTick').click()
    }
    cy.get('#accumulator').should('not.have.text', '0')
  })

  it('should maintain state across mode switches', () => {
    cy.get('#clockTick').click()
    cy.get('#clockTick').click()
    cy.get('#ir').invoke('text').then(irValue => {
      cy.get('.pill-button-selection_auto').click()
      cy.get('.pill-button-selection_manual').click()
      cy.get('#ir').should('have.text', irValue)
    })
  })
})
