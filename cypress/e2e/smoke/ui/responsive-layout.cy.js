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
    cy.get('.container').should('have.css', 'max-height', '900px')
  })

  it('should have scrollable RAM table', () => {
    cy.get('.ram-table-container').should('exist')
  })

  it('should display "Address" on desktop and "#" on mobile', () => {
    // Desktop viewport - should show "Address"
    cy.viewport(1280, 720)
    cy.get('th .address-full').should('exist').and('contain.text', 'Address')
      .and('not.have.css', 'display', 'none')
    cy.get('th .address-short').should('exist')
      .and('have.css', 'display', 'none')

    // Mobile viewport - should show "#"
    cy.viewport(375, 667)
    cy.get('th .address-short').should('exist').and('contain.text', '#')
      .and('not.have.css', 'display', 'none')
    cy.get('th .address-full').should('exist')
      .and('have.css', 'display', 'none')
  })
})
