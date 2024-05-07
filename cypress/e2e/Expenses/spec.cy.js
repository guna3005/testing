describe('Expenses Page Tests', () => {
  beforeEach(() => {
      // Setup stubs for API calls
      cy.intercept('/expenses').as('getExpenses');

      //cy.intercept('GET', 'http://159.203.162.71:5001/expenses', { fixture: 'expenses.json' }).as('getExpenses');
      //cy.intercept('POST', 'http://159.203.162.71:5001/add-expense', (req) => {
          //const newExpense = { _id: 'new', ...req.body };
          //req.reply(newExpense);
          // Add the new expense to the existing list to mimic the server's response
          //cy.fixture('expenses').then((expenses) => {
           //   expenses.push(newExpense);
         //     cy.writeFile('cypress/fixtures/expenses.json', expenses);
       //   });
     // }).as('addExpense');
      cy.intercept('/add-expense').as('addExpense');
      cy.intercept('DELETE', 'http://159.203.162.71:5001/delete-expense/*', { statusCode: 204 }).as('deleteExpense');

      cy.visit('http://localhost:3000/Expenses');  // Adjust the URL to where your Expenses component is rendered
  });

 

  it('adds a new expense', () => {
      cy.get('button').contains('Add Expense').click();
      cy.get('.modal').should('be.visible');

      // Fill out the form and submit
      cy.get('input[type="text"]').first().type('Groceries');
      cy.get('input[type="number"]').first().type('150');
      cy.get('input[type="date"]').first().type('2023-01-01');
      cy.get('input').eq(3).type('Monthly grocery shopping'); // Assuming this is the comment input
      cy.get('.modal-content > button').click();

      cy.wait('@addExpense');
      //cy.get('.table tbody tr').last().should('contain', 'Groceries').and('contain', '$150');
  });

  it('loads and displays expenses', () => {
    cy.wait('@getExpenses');
    cy.get(URL).contains('/Expenses'); // Check that at least one expense is displayed
});

  it('deletes an expense', () => {
    cy.get('button').contains('Add Expense').click();
      cy.get('.modal').should('be.visible');

      // Fill out the form and submit
      cy.get('input[type="text"]').first().type('Groceries');
      cy.get('input[type="number"]').first().type('150');
      cy.get('input[type="date"]').first().type('2023-01-01');
      cy.get('input').eq(3).type('Monthly grocery shopping'); // Assuming this is the comment input
      cy.get('.modal-content > button').click();

      cy.wait('@addExpense');
      // Assume that expenses are already loaded
      cy.get('.table tbody tr').first().as('firstRow');
      cy.get('@firstRow').find('.btn-danger').click(); // Click the delete button

      cy.wait('@deleteExpense');
      cy.get('@firstRow').should('not.exist');
  });
});
