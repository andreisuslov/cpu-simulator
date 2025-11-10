describe('Smoke Test: RAM Table Display', () => {
  beforeEach(() => {
    cy.visit('/index.html')
  })

  it('should display RAM table', () => {
    cy.get('#ram-table').should('be.visible')
  })

  it('should have table headers', () => {
    cy.get('#ram-table thead th').should('have.length', 4)
    cy.contains('th', 'Address').should('be.visible')
    cy.contains('th', 'Type').should('be.visible')
    cy.contains('th', 'Value').should('be.visible')
  })

  it('should display initial RAM rows', () => {
    cy.get('#ram-table tbody tr').should('have.length.at.least', 8)
  })

  it('should show address column', () => {
    cy.get('#ram-table tbody tr').first().find('td').first().should('have.text', '0')
  })

  it('should show type column', () => {
    cy.get('#ram-table tbody tr').first().find('td').eq(1).should('contain', 'Instruction')
  })
})
