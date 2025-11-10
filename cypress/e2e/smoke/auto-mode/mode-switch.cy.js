describe('Smoke Test: Auto Mode Switch', () => {
  beforeEach(() => {
    cy.visit('/index.html')
  })

  it('should start in manual mode', () => {
    cy.get('.pill-button-selection_manual').should('have.class', 'pill-button-selection_active')
    cy.get('#manualControls').should('not.have.class', 'hidden')
  })

  it('should switch to auto mode', () => {
    cy.get('.pill-button-selection_auto').click()
    cy.get('.pill-button-selection_auto').should('have.class', 'pill-button-selection_active')
  })

  it('should show auto controls when in auto mode', () => {
    cy.get('.pill-button-selection_auto').click()
    cy.get('#autoControls').should('not.have.class', 'hidden')
  })

  it('should hide manual controls when in auto mode', () => {
    cy.get('.pill-button-selection_auto').click()
    cy.get('#manualControls').should('have.class', 'hidden')
  })

  it('should switch back to manual mode', () => {
    cy.get('.pill-button-selection_auto').click()
    cy.get('.pill-button-selection_manual').click()
    cy.get('.pill-button-selection_manual').should('have.class', 'pill-button-selection_active')
  })
})
