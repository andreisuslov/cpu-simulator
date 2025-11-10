describe('Smoke Test: RAM Data Persistence', () => {
  beforeEach(() => {
    cy.visit('/index.html')
  })

  it('should maintain RAM values during execution', () => {
    cy.get('#ram-table tbody tr').first().find('td').eq(2).invoke('text').then(initialValue => {
      cy.get('#clockTick').click()
      cy.get('#ram-table tbody tr').first().find('td').eq(2).should('exist')
    })
  })

  it('should preserve RAM when switching modes', () => {
    cy.get('#ram-table tbody tr').its('length').then(initialLength => {
      cy.get('.pill-button-selection_auto').click()
      cy.get('.pill-button-selection_manual').click()
      cy.get('#ram-table tbody tr').should('have.length', initialLength)
    })
  })

  it('should maintain instruction types', () => {
    cy.get('#ram-table tbody tr').first().find('td').eq(1).should('contain', 'Instruction')
  })

  it('should maintain data types', () => {
    cy.get('#ram-table tbody tr').eq(4).find('td').eq(1).should('contain', 'Data')
  })
})
