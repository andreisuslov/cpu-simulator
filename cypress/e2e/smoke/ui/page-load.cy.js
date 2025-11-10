describe('Smoke Test: Page Load', () => {
  it('should load the page successfully', () => {
    cy.visit('/index.html')
    cy.get('.container').should('exist')
  })

  it('should display the page title', () => {
    cy.visit('/index.html')
    cy.title().should('eq', 'Simple CPU Simulator')
  })

  it('should load without console errors', () => {
    cy.visit('/index.html', {
      onBeforeLoad(win) {
        cy.stub(win.console, 'error').as('consoleError')
      }
    })
    cy.get('@consoleError').should('not.be.called')
  })

  it('should have correct viewport', () => {
    cy.visit('/index.html')
    cy.viewport(1280, 720)
    cy.get('.container').should('be.visible')
  })
})
