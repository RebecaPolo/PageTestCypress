// cypress/pages/LoginPage.js

import messages from "./messages";
import routes from "./routes";

class LoginPage {
    //selectori
  elements = {
    usernameInput: () => cy.get('input[name="username"]'),
    passwordInput: () => cy.get('input[name="password"]'),
    submitButton: () => cy.get('button[type="submit"]'),
    inputGroup: () => cy.get('.oxd-input-group'),
    errorMessage: () => cy.get('.oxd-input-field-error-message'),
    invalidCredentials: () => cy.contains(messages.invalidCredentials)
  }

  //metode
  visit() {
    cy.visit(routes.login);
  }

  typeUsername(username) {
    this.elements.usernameInput().type(username);
  }

  typePassword(password) {
    this.elements.passwordInput().type(password);
  }

  clickLogin() {
    this.elements.submitButton().click();
  }

  submitLogin({ username, password }) {
    if (username) this.typeUsername(username);
    if (password) this.typePassword(password);
    this.clickLogin();
  }

  expectRequiredErrorAt(index) {
    this.elements.inputGroup()
      .eq(index)
      .find('.oxd-input-field-error-message')
      .should('contain.text', messages.required);
  }

  expectInvalidCredentials() {
    this.elements.invalidCredentials().should('be.visible');
  }
}

export default LoginPage;
