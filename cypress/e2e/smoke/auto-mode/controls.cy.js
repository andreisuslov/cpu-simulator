describe('Smoke Test: Auto Mode Controls', () => {
  beforeEach(() => {
    cy.visit('/index.html')
    cy.get('.pill-button-selection_auto').click() // Switch to auto mode
  })

  it('should display interval input', () => {
    cy.get('#intervalInput').should('be.visible')
    cy.get('#intervalInput').should('have.value', '100')
  })

  it('should display start button', () => {
    cy.get('#startBtn').should('be.visible')
    cy.get('#startBtn').should('contain', 'Start')
  })

  it('should have reset button in auto mode', () => {
    cy.get('#autoResetBtn').should('be.visible')
  })

  it('should allow changing interval value', () => {
    cy.get('#intervalInput').clear().type('200')
    cy.get('#intervalInput').should('have.value', '200')
  })

  it('should start auto execution', () => {
    cy.get('#startBtn').click()
    cy.get('#runningControls').should('not.have.class', 'hidden')
  })
})
