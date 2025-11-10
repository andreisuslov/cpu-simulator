describe('Smoke Test: Auto Mode Execution', () => {
  beforeEach(() => {
    cy.visit('/index.html')
    cy.get('.pill-button-selection_auto').click() // Switch to auto mode
  })

  it('should show pause and stop buttons after starting', () => {
    cy.get('#startBtn').click()
    cy.get('#pauseBtn').should('be.visible')
    cy.get('#stopBtn').should('be.visible')
  })

  it('should execute instructions automatically', () => {
    cy.get('#pc').invoke('text').then(initialPC => {
      cy.get('#startBtn').click()
      cy.wait(500)
      cy.get('#pc').invoke('text').should('not.equal', initialPC)
    })
  })

  it('should stop execution', () => {
    cy.get('#startBtn').click()
    cy.wait(300)
    cy.get('#stopBtn').click()
    cy.get('#startBtn').should('be.visible')
  })

  it('should pause execution', () => {
    cy.get('#startBtn').click()
    cy.wait(300)
    cy.get('#pauseBtn').click()
    cy.get('#pauseBtn').should('contain', 'Resume')
  })
})
