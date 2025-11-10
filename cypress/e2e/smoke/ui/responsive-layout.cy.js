describe('Smoke Test: Responsive Layout', () => {
  beforeEach(() => {
    cy.visit('/index.html')
  })

  it('should display correctly on desktop viewport', () => {
    cy.viewport(1280, 720)
    cy.get('.cpu').should('be.visible')
    cy.get('.ram').should('be.visible')
  })

  it('should display correctly on tablet viewport', () => {
    cy.viewport(768, 1024)
    cy.get('.cpu').should('be.visible')
    cy.get('.ram').should('be.visible')
  })

  it('should maintain container max-height', () => {
    cy.get('.container').should('have.css', 'max-height')
  })

  it('should have scrollable RAM table', () => {
    cy.get('.ram-table-container').should('exist')
  })
})
