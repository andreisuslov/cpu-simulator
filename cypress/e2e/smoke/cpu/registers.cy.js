describe('Smoke Test: CPU Registers', () => {
  beforeEach(() => {
    cy.visit('/index.html')
  })

  it('should display initial PC value', () => {
    cy.get('#pc').should('have.text', '0')
  })

  it('should display initial IR value', () => {
    cy.get('#ir').should('have.text', 'NIL')
  })

  it('should display initial accumulator value', () => {
    cy.get('#accumulator').should('have.text', '0')
  })

  it('should update PC after instruction execution', () => {
    cy.get('#clockTick').click() // Fetch
    cy.get('#clockTick').click() // Decode
    cy.get('#clockTick').click() // Execute
    cy.get('#pc').should('not.have.text', '0')
  })

  it('should update IR during fetch phase', () => {
    cy.get('#clockTick').click() // Fetch
    cy.get('#ir').should('not.have.text', 'NIL')
  })
})
