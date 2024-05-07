describe('Budget Page Tests', () => {
    beforeEach(() => {
        cy.intercept('/budgets').as('getBudgets');
        cy.intercept('POST', 'http://localhost:5001/add-budget', (req) => {
            expect(req.body).to.include.keys('title', 'amount');
            req.reply({
                statusCode: 201, 
                body: { _id: '123', ...req.body },
            });
        }).as('addBudget');
        cy.intercept('DELETE', 'http://localhost:5001/delete-budget/*', { statusCode: 200 }).as('deleteBudget');
        cy.visit('http://localhost:3000/budget');
    });
  
    it('opens the add budget dialog and adds a new budget', () => {
        cy.get('button').contains('Add Budget').click();
        cy.get('.dialog').should('be.visible');
  
        // Fill out the form and submit
        cy.get('input[type="text"]').type('Internet');
        cy.get('input[type="number"]').type('100');
        cy.get('.dialog > :nth-child(6)').click();
  
        cy.wait('@addBudget');
        cy.get('tbody tr').last().contains('Internet');
  
        // Applitools snapshot
        cy.eyesOpen({
            appName: 'Budget App',
            testName: 'Add Budget Test',
            stepName: 'After Adding Budget'
        });
        cy.eyesCheckWindow('Add Budget Page');
        cy.eyesClose();
    });
  
    it('deletes a budget entry', () => {
      cy.get('button').contains('Add Budget').click();
      cy.get('.dialog').should('be.visible');
  
      // Fill out the form and submit
      cy.get('input[type="text"]').type('Internet');
      cy.get('input[type["number"]').type('100');
      cy.get('.dialog > :nth-child(6)').click();
  
      cy.wait('@addBudget');
      cy.get('tbody tr').last().contains('Internet');
  
      cy.get('tbody tr').first().as('firstRow');
      cy.get('@firstRow').find('button').contains('🗑️').click();
  
      cy.wait('@deleteBudget');
  
      // Applitools snapshot
      cy.eyesOpen({
          appName: 'Budget App',
          testName: 'Delete Budget Test',
          stepName: 'After Deleting Budget'
      });
      cy.eyesCheckWindow('Delete Budget Page');
      cy.eyesClose();
    });
  });
  