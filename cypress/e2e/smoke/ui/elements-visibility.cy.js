describe('Smoke Test: UI Elements Visibility', () => {
  beforeEach(() => {
    cy.visit('/index.html')
  })

  it('should display CPU section', () => {
    cy.get('.cpu').should('be.visible')
    cy.contains('h2', 'CPU').should('be.visible')
  })

  it('should display RAM section', () => {
    cy.get('.ram').should('be.visible')
    cy.contains('h2', 'RAM').should('be.visible')
  })

  it('should display all registers', () => {
    cy.get('#pc').should('be.visible')
    cy.get('#ir').should('be.visible')
    cy.get('#accumulator').should('be.visible')
  })

  it('should display execution phases', () => {
    cy.get('#execution-phases').should('be.visible')
    cy.get('[data-phase="Fetch"]').should('be.visible')
    cy.get('[data-phase="Decode"]').should('be.visible')
    cy.get('[data-phase="Execute"]').should('be.visible')
  })

  it('should display mode toggle buttons', () => {
    cy.get('#pillButtonInput').should('exist')
    cy.get('.pill-button-selection_manual').should('be.visible')
    cy.get('.pill-button-selection_auto').should('be.visible')
  })
})
