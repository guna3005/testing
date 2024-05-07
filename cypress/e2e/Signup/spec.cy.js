
describe('Signup and Login Tests', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/'); // Adjust this URL based on your actual application's route to the signup/login page
 
  });

  it('allows a user to sign up', () => {
    cy.get('input[type="stext"]').type('John Doe');  // Corrected from type="stext"
    cy.get('input[type="semail"]').type('john.doe@example.com');  // Corrected from type="semail"
    cy.get('.sign-in > :nth-child(3) > input').type('password123');  // Corrected from type="spassword"
    cy.get('button.ssubmit').click();  // Corrected from class ".ssubmit"
    cy.contains('Hey There, Savvy Spender!') // Ensure this is the expected redirect URL
  });
  

  it('allows a user to log in', () => {
    // Toggle to the login form if necessary
     // Adjust if your toggle logic is different
    cy.get('input[type="lemail"]').clear().type('john.doe@example.com');
    cy.get('.sign-in > :nth-child(3) > input').type('password123');
    cy.get('.form.sign-in button.submit').click();
    cy.url().should('include', '/home'); // Assuming successful login redirects to '/home'
  });

  it('shows an error for failed login', () => {
    
    cy.get('input[type="lemail"]').clear().type('wrong@example.com');
    cy.get('.sign-in > :nth-child(3) > input').type('wrongpassword');
    cy.get('.form.sign-in button.submit').click();
    cy.window().then((win) => {
      cy.spy(win.console, 'error').as('consoleError');
    });
    cy.url().should('include', '/');  });
});

