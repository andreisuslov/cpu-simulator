describe('Smoke Test: Execution Phases', () => {
  beforeEach(() => {
    cy.visit('/index.html')
  })

  it('should start in Fetch phase', () => {
    cy.get('[data-phase="Fetch"]').should('have.class', 'active-phase')
  })

  it('should progress from Fetch to Decode', () => {
    cy.get('#clockTick').click()
    cy.get('[data-phase="Decode"]').should('have.class', 'active-phase')
  })

  it('should progress from Decode to Execute', () => {
    cy.get('#clockTick').click() // Fetch
    cy.get('#clockTick').click() // Decode
    cy.get('[data-phase="Execute"]').should('have.class', 'active-phase')
  })

  it('should cycle back to Fetch after Execute', () => {
    cy.get('#clockTick').click() // Fetch
    cy.get('#clockTick').click() // Decode
    cy.get('#clockTick').click() // Execute
    cy.get('[data-phase="Fetch"]').should('have.class', 'active-phase')
  })
})
