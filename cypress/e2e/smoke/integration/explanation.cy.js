describe('Smoke Test: Explanation Feature', () => {
  beforeEach(() => {
    cy.visit('/index.html')
  })

  it('should have explanation toggle button', () => {
    cy.get('#explanationToggle').should('be.visible')
    cy.get('#explanationToggle').should('contain', 'Show Explanation')
  })

  it('should show explanation when clicked', () => {
    cy.get('#explanationToggle').click()
    cy.get('#explanation').should('have.class', 'visible')
  })

  it('should update button text when showing explanation', () => {
    cy.get('#explanationToggle').click()
    cy.get('#explanationToggle').should('contain', 'Hide Explanation')
  })

  it('should hide explanation when clicked again', () => {
    cy.get('#explanationToggle').click()
    cy.get('#explanationToggle').click()
    cy.get('#explanation').should('not.have.class', 'visible')
  })

  it('should display explanation content', () => {
    cy.get('#explanationToggle').click()
    cy.get('#explanation h2').should('contain', 'What is this and how does it work?')
  })
})
