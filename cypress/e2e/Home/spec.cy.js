describe('Home Page Tests', () => {
  beforeEach(() => {
    // Visit the Home page before each test
    cy.visit('http://localhost:3000/home');
  });

  it('displays the main heading correctly', () => {
    cy.get('h2').should('contain', 'Hey There, Savvy Spender!');
  });

  it('includes an enthusiastic opening paragraph', () => {
    cy.get('section.welcome-content p')
      .first()
      .should('contain', 'Wave goodbye to mysterious bank statements and hello to clear financial skies with');
  });

  it('strong tags render with correct text', () => {
    cy.get('strong').eq(0).should('have.text', 'Your Budget Buddy!');
    cy.get('strong').eq(1).should('have.text', 'Your Budget Buddy');
  });

  it('checks if the footer contains correct copyright notice', () => {
    cy.get('footer.app-footer p').should('contain', '© 2024 Your Budget Buddy – Manage Money, Make Merriment!');
  });

  it('ensures the call to action about spending wisely is displayed', () => {
    cy.contains('h3', 'Why Just Spend When You Can Spend Wisely?')
      .next()
      .should('contain', 'Our app, Your Budget Buddy, is your new financial sidekick.');
  });

  it('verifies the entire motivational section is visible', () => {
    cy.get('section.welcome-content')
      .should('be.visible')
      .and('contain', 'Ready to dive into your finances without drowning? We\'ve got you covered with intuitive tools and dashboards that make sense of cents (and dollars!).');
  });
});
describe('Navigation Link Tests', () => {
  beforeEach(() => {
    // Intercept API calls
    cy.intercept('/home').as('gethome');
    cy.intercept('/budgets').as('getBudgets');
    cy.intercept('/expenses').as('getExpenses');
    cy.intercept('/budgets').as('getBudgets');
    //cy.intercept('GET', '/budgets', { fixture: 'Budgets.json' }).as('getBudgets');
    //cy.intercept('GET', '/expenses', { fixture: 'expenses.json' }).as('getExpenses');
   // cy.intercept('POST', '/logout', {}).as('postLogout');
    
    // Visit the Home page before each test
    cy.visit('http://localhost:3000/home');
  });

  it('loads home correctly and makes no unexpected requests', () => {
    cy.wait('@gethome'); // Assuming the home might indirectly fetch budgets
  });

  it('navigates to budget and triggers correct API call', () => {
    cy.get('a[href="/budget"]').click();
    cy.url().should('include', '/budget');
    cy.wait('@getBudgets');
  });

  it('navigates to expenses and triggers correct API call', () => {
    cy.get('a[href="/expenses"]').click();
    cy.url().should('include', '/expenses');
    cy.wait('@getExpenses');
  });

  it('navigates to dashboard and checks if page loads', () => {
    cy.get('a[href="/dashboard"]').click();
    cy.url().should('include', '/dashboard');
    // Assume we also fetch budgets and expenses for dashboard
  });

  it('logs out and redirects to login page', () => {
    cy.get('button').contains('Logout').click();
    //cy.wait('@postLogout');
    cy.url().should('include', '/');
  });
});
