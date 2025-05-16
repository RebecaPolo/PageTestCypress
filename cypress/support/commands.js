// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

import messages from "../pages/messages"
import routes from "../pages/routes"

Cypress.Commands.add('login', (username, password) => {
  cy.visit(routes.login);
  cy.get('input[name="username"]').type(username)
  cy.get('input[name="password"]').type(password)
  cy.get('button[type="submit"]').click()

  // Confirmă că a ajuns pe dashboard
  cy.url().should('include', routes.dashboard)
});

Cypress.Commands.add('logout', () => {
  // Apasă pe butonul de profil pentru a deschide meniul de logout
  cy.get('.oxd-userdropdown-name',{ timeout: 10000 }).should('be.visible').click()

  // Apasă pe butonul Logout din dropdown
  cy.contains(messages.logout).click()

  // Verifică dacă utilizatorul a fost redirecționat la pagina de login
  cy.url().should('include', routes.login)
});