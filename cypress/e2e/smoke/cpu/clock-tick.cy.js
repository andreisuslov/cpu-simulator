describe('Smoke Test: Clock Tick', () => {
  beforeEach(() => {
    cy.visit('/index.html')
  })

  it('should have clock tick button visible', () => {
    cy.get('#clockTick').should('be.visible')
    cy.get('#clockTick').should('contain', 'Clock Tick')
  })

  it('should execute clock tick without error', () => {
    cy.get('#clockTick').click()
    cy.get('#executionError').should('have.text', '')
  })

  it('should update execution phase on clock tick', () => {
    cy.get('[data-phase="Fetch"]').should('have.class', 'active-phase')
    cy.get('#clockTick').click()
    cy.get('[data-phase="Decode"]').should('have.class', 'active-phase')
  })

  it('should allow multiple clock ticks', () => {
    cy.get('#clockTick').click()
    cy.get('#clockTick').click()
    cy.get('#clockTick').click()
    cy.get('#pc').should('not.have.text', '0')
  })
})
