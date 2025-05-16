// cypress/e2e/testApplication/login.cy.js
import LoginPage from '../../pages/LoginPage'
import messages from '../../pages/messages';
import routes from '../../pages/routes';

describe('Login Page Test Scenarios', () => {
  const admin = Cypress.env('admin')
  const user = Cypress.env('user')
  const invalid = Cypress.env('invalid')

  const loginPage = new LoginPage();

  beforeEach(() => {
    loginPage.visit();
  });

  context('Valid login scenarios', () => {
    afterEach(() => {
      cy.logout();
    });

    it('TC1 - Login as admin', () => {
      loginPage.submitLogin(admin);
      cy.url().should('include', routes.dashboard);
      cy.contains(messages.dashboardPage).should('be.visible');
    });

    it('TC2 - Login as user', () => {
      loginPage.submitLogin(user);
      cy.url().should('include', routes.dashboard);
      cy.contains(messages.dashboardPage).should('be.visible');
    });
  });

  context('Negative log scenarios', () => {
    it('TC3 - Valid username, invalid password', () => {
      loginPage.submitLogin({ username: admin.username, password: invalid.password });
      loginPage.expectInvalidCredentials();
    });

    it('TC4 - Invalid username and valid password', () => {
      loginPage.submitLogin({ username: invalid.username, password: admin.password });
      loginPage.expectInvalidCredentials();
    });

    it('TC5 - Invalid username and password', () => {
      loginPage.submitLogin(invalid);
      loginPage.expectInvalidCredentials();
    });

    it('TC6 - Username and password cleared', () => {
      loginPage.clickLogin();
      loginPage.expectRequiredErrorAt(0); // Username
      loginPage.expectRequiredErrorAt(1); // Password
    });

    it('TC7 - Username cleared and password filled', () => {
      loginPage.typePassword(user.password);
      loginPage.clickLogin();
      loginPage.expectRequiredErrorAt(0);
    });

    it('TC8 - Password cleared and username filled', () => {
      loginPage.typeUsername(user.username);
      loginPage.clickLogin();
      loginPage.expectRequiredErrorAt(1);
    });
  });
});
