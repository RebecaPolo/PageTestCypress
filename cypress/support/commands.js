import messages from "../pages/config/messages";
import routes from "../pages/config/routes";

// Loghează utilizatorul și verifică redirecționarea către dashboard
Cypress.Commands.add('login', (username, password) => {
  cy.visit(routes.login);
  cy.get('input[name="username"]').type(username);
  cy.get('input[name="password"]').type(password);
  cy.get('button[type="submit"]').click();
  cy.url().should('include', routes.dashboard);
});

// Execută logout și confirmă redirecționarea către pagina de login
Cypress.Commands.add('logout', () => {
  cy.get('.oxd-userdropdown-name', { timeout: 10000 }).click();
  cy.contains(messages.logout).click();
  cy.url().should('include', routes.login);
});