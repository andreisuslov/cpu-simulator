describe('Smoke Test: Pill Button Toggle', () => {
  beforeEach(() => {
    cy.visit('/index.html')
  })

  it('switches to auto mode with a single click anywhere on the pill', () => {
    cy.get('.pill-button-selection_manual').should('have.class', 'pill-button-selection_active')

    cy.get('.pill-button').click('center')

    cy.get('.pill-button-selection_auto').should('have.class', 'pill-button-selection_active')
    cy.get('#autoControls').should('not.have.class', 'hidden')
    cy.get('#manualControls').should('have.class', 'hidden')
  })

  it('toggles back and forth on subsequent clicks', () => {
    cy.get('.pill-button').click('center')
    cy.get('.pill-button-selection_auto').should('have.class', 'pill-button-selection_active')

    cy.get('.pill-button').click('center')
    cy.get('.pill-button-selection_manual').should('have.class', 'pill-button-selection_active')
  })

  it('works when clicking at various positions on the pill', () => {
    cy.get('.pill-button').click('left')
    cy.get('.pill-button-selection_auto').should('have.class', 'pill-button-selection_active')

    cy.get('.pill-button').click('right')
    cy.get('.pill-button-selection_manual').should('have.class', 'pill-button-selection_active')

    cy.get('.pill-button').click('top')
    cy.get('.pill-button-selection_auto').should('have.class', 'pill-button-selection_active')
  })
})
