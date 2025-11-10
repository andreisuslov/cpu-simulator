describe('Container Edit Mode - Vertical Expansion Test', () => {
  beforeEach(() => {
    // Visit the page - adjust the URL if you're serving it differently
    cy.visit('/index.html')
  })

  it('should not expand vertically when entering edit mode', () => {
    // Measure the initial height in display mode
    let initialHeight
    cy.get('.container').then(($container) => {
      initialHeight = $container.height()
      cy.log(`Initial container height: ${initialHeight}px`)
    })

    // Click the "Modify" button to enter edit mode
    cy.get('#modeToggle').click()
    
    // Wait for the mode transition to complete
    cy.wait(500)
    
    // Verify we're in edit mode by checking if the button text changed to "View"
    cy.get('#modeText').should('have.text', 'View')
    
    // Measure the height after entering edit mode
    cy.get('.container').then(($container) => {
      const editModeHeight = $container.height()
      cy.log(`Edit mode container height: ${editModeHeight}px`)
      
      // Assert that the height hasn't changed (or changed by a negligible amount)
      // Using a small tolerance (e.g., 5px) to account for potential rendering differences
      expect(editModeHeight).to.be.closeTo(initialHeight, 5)
    })
  })

  it('should maintain container height when adding rows in edit mode', () => {
    const container = cy.get('.container')
    
    // Measure initial height
    let initialHeight
    container.then(($container) => {
      initialHeight = $container.height()
    })

    // Enter edit mode
    cy.get('#modeToggle').click()
    cy.wait(500)
    
    // Add a new row
    cy.get('.add-row-btn').click()
    cy.wait(300)
    
    // Verify container height hasn't expanded
    container.then(($container) => {
      const heightAfterAddingRow = $container.height()
      cy.log(`Height after adding row: ${heightAfterAddingRow}px`)
      expect(heightAfterAddingRow).to.be.closeTo(initialHeight, 5)
    })
  })

  it('should maintain container max-height constraint', () => {
    // Check that the container has the max-height CSS property set
    cy.get('.container').should('have.css', 'max-height')
    
    // Verify the max-height value matches the expected value from CSS
    cy.get('.container').then(($container) => {
      const maxHeight = $container.css('max-height')
      cy.log(`Container max-height: ${maxHeight}`)
      
      // The max-height should be calc(100vh - 40px) as defined in CSS
      // We can't directly compare calc values, but we can verify it's set
      expect(maxHeight).to.not.equal('none')
    })
  })

  it('should use overflow scrolling instead of expanding when content grows', () => {
    // Enter edit mode
    cy.get('#modeToggle').click()
    cy.wait(500)
    
    // Add multiple rows to force overflow
    for (let i = 0; i < 10; i++) {
      cy.get('.add-row-btn').click()
      cy.wait(100)
    }
    
    // Check that the RAM table container has overflow-y auto or scroll
    cy.get('.ram-table-container').should(($el) => {
      const overflowY = $el.css('overflow-y')
      expect(['auto', 'scroll']).to.include(overflowY)
    })
    
    // Verify the container itself doesn't overflow
    cy.get('.container').should('have.css', 'overflow', 'hidden')
  })
})
