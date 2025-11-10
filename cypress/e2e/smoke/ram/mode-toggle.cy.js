describe('Smoke Test: RAM Mode Toggle', () => {
  beforeEach(() => {
    cy.visit('/index.html')
  })

  it('should start in display mode', () => {
    cy.get('#modeText').should('have.text', 'Modify')
  })

  it('should toggle to edit mode', () => {
    cy.get('#modeToggle').click()
    cy.get('#modeText').should('have.text', 'View')
  })

  it('should toggle back to display mode', () => {
    cy.get('#modeToggle').click()
    cy.get('#modeText').should('have.text', 'View')
    cy.get('#modeToggle').click()
    cy.get('#modeText').should('have.text', 'Modify')
  })

  it('should show edit column in edit mode', () => {
    cy.get('#modeToggle').click()
    cy.get('.edit-column').should('not.have.class', 'hidden')
  })

  it('should hide edit column in display mode', () => {
    cy.get('.edit-column').should('have.class', 'hidden')
  })
})
