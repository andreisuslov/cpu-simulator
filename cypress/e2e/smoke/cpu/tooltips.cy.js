describe('Smoke Test: CPU Tooltips', () => {
  beforeEach(() => {
    cy.visit('/index.html')
  })

  it('should have PC tooltip element', () => {
    cy.get('.pc-tooltip').should('exist')
  })

  it('should have IR tooltip element', () => {
    cy.get('.ir-tooltip').should('exist')
  })

  it('should have accumulator tooltip element', () => {
    cy.get('.accumulator-tooltip').should('exist')
  })

  it('should have phase tooltips', () => {
    cy.get('.phase-tooltip').should('have.length', 3)
  })
})
