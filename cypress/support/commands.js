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

Cypress.Commands.add('openNewTab', (url) => {
  cy.window().then((win) => {
    // Deschide URL-ul într-un nou tab
    const newTab = win.open(url, '_blank');
    
    // Verifică dacă tab-ul a fost deschis
    cy.wrap(newTab).should('exist');

    // Așteaptă ca documentul tab-ului să fie complet încărcat
    cy.wrap(newTab.document).should('have.property', 'readyState', 'complete');

    // Verifică dacă URL-ul tab-ului deschis este corect
    cy.wrap(newTab.location.href).should('include', url);
  });
});

Cypress.Commands.add('login', (username, password) => {
  cy.visit('/auth/login');
  cy.get('input[name="username"]').type(username);
  cy.get('input[name="password"]').type(password);
  cy.get('button[type="submit"]').click();

  // Confirmă că a ajuns pe dashboard
  cy.url().should('include', '/dashboard');
});

Cypress.Commands.add('logout', () => {
  // Apasă pe butonul de profil pentru a deschide meniul de logout
  cy.get('.oxd-userdropdown-name').click();

  // Apasă pe butonul Logout din dropdown
  cy.contains('Logout').click();

  // Verifică dacă utilizatorul a fost redirecționat la pagina de login
  cy.url().should('include', '/auth/login');
});