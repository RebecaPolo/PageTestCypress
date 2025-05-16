import messages from "./messages";

class AdminPage {
  elements = {
    /* Elements from Admin page */
    editButton: () => cy.get('button[type="button"]').contains('Edit'),
    deleteButton: () => cy.get('button[type="button"]').contains('Delete'),
    userRoleOptions: () => cy.get('.oxd-select-dropdown'),
    addUserNameSelector: () => cy.get('[role="listbox"]', { timeout: 5000 }),

    /* Elements from Add User */
    // Dropdown-uri (select-uri)
    addUserRoleDropdown: () =>
      cy.contains('label', 'User Role')
        .closest('.oxd-input-group')
        .find('.oxd-select-wrapper .oxd-select-text'),

    addUserStatusDropdown: () =>
      cy.contains('label', 'Status')
        .closest('.oxd-input-group')
        .find('.oxd-select-wrapper .oxd-select-text'),

    // Input text + autocomplete
    addUserName: () => cy.get('.oxd-autocomplete-text-input--active input[placeholder="Type for hints..."]'),

    // Inputuri simple
    addUserUsername: () =>
      cy.contains('label', 'Username')
        .closest('.oxd-input-group')
        .find('input.oxd-input.oxd-input--active'),

    addUserPassword: () =>
      cy.contains('label', 'Password')
        .closest('.oxd-input-group')
        .find('input[type="password"].oxd-input.oxd-input--active'),

    addUserConfirmPass: () =>
      cy.contains('label', 'Confirm Password')
        .closest('.oxd-input-group')
        .find('input[type="password"]'),

    // Butoane
    addUserCancelButton: () => cy.get('button.oxd-button--ghost').contains('Cancel'),
    addUserSaveButton: () => cy.get('button.oxd-button--secondary').contains('Save'),

    // Mesaje
    successfulySavedMessage: () => cy.contains(messages.succesfullySaved),
    requiredErrors: () => cy.get('.oxd-input-group__message'),
    passwordDoNotMatchError: () =>
      cy.contains('.oxd-input-group__message', messages.passwordMismatch),
  };

  fillAddUserForm({ role, name, status, username, password,confirmPassword }) {
    this.selectAddUserRole(role);
    this.editAddUserName(name);
    this.selectAddUserStatus(status);
    this.editAddUserUsername(username);
    this.editAddUserPassword(password);
    this.editAddUserConfirmPass(confirmPassword);
  }

  clickEditButton() {
    this.elements.editButton().click();
  }

  clickDeleteButton() {
    this.elements.deleteButton().click();
  }

  selectAddUserRole(role) {
    this.elements.addUserRoleDropdown().click();
    this.elements.userRoleOptions().contains(role).click();
  }

  editAddUserName(name) {
    this.elements.addUserName().clear().type(name);
    cy.wait(2000);
    this.elements.addUserNameSelector()
      .find('[role="option"]')
      .contains(name)
      .first()
      .click();
  }

  selectAddUserStatus(status) {
    this.elements.addUserStatusDropdown().click();
    this.elements.userRoleOptions().contains(status).click();
  }

  editAddUserUsername(username) {
    if (username) {
      this.elements.addUserUsername().clear().type(username);
    }
  }

  editAddUserPassword(password) {
    if (password) {
      this.elements.addUserPassword().clear().type(password);
    }
  }

  editAddUserConfirmPass(password) {
    if (password) {
      this.elements.addUserConfirmPass().clear().type(password);
    }
  }

  clickAddUserCancelButton() {
    this.elements.addUserCancelButton().click();
  }

  clickAddUserSaveButton() {
    this.elements.addUserSaveButton().click();
  }

  expectSuccessfulySavedMessage() {
    this.elements.successfulySavedMessage().should('be.visible');
  }

  verifyRequiredErrors() {
    // verificăm că sunt cel puțin 5 erori de tip required
    const requiredFieldsCount = 5;
    this.elements.requiredErrors().should('have.length.at.least', requiredFieldsCount);

    // verificăm primele 5 erori să conțină textul de required
    this.elements.requiredErrors().each(($el, index) => {
      if (index < requiredFieldsCount) {
        cy.wrap($el).should('contain.text', messages.required);
      }
    });
  }

  verifyPasswordMismatchError() {
    this.elements.passwordDoNotMatchError().should('be.visible');
  }

  verifyAllErrors() {
    this.verifyRequiredErrors();
    this.verifyPasswordMismatchError();
  }

  verifyUsernameRequiredError() {
    cy.wait(2000);
    this.elements.requiredErrors()
      .should('exist')
      .should('contain.text', messages.required);
  }

  verifyPasswordRequiredError() {
    this.elements.requiredErrors()
      .should('exist')
      .should('contain.text', messages.required);
  }

  verifyShortPasswordError() {
    this.elements.requiredErrors()
      .should('exist')
      .should('contain.text', messages.shortPassword);
  }
}

export default AdminPage;
