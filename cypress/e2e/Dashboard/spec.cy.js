describe('Dashboard Page Tests', () => {
  beforeEach(() => {
    // Mocking the API calls
    cy.intercept('GET', 'http://localhost:5001/budgets', { fixture: 'budgets.json' }).as('fetchBudgets');
    cy.intercept('GET', 'http://localhost:5001/expenses', { fixture: 'expenses.json' }).as('fetchExpenses');

    cy.visit('http://localhost:3000/dashboard');  // Adjust the URL to where your Dashboard component is rendered
});
it('checks the presence and render of charts', () => {
  cy.get('.chart-container canvas').should('have.length', 4);
  cy.get('.chart-container canvas').each((canvas) => {
      expect(canvas).to.be.visible;
  });
});

it('successfully loads and displays budget and expense charts', () => {
    // Ensure the API calls complete before verifying chart render
    cy.wait(['@fetchBudgets', '@fetchExpenses']); // Correct aliases as per the intercepts

    // Verify that four chart containers exist (assuming 4 charts as per the original setup)
    cy.get('.chart-container').should('have.length', 4);
  });

});
