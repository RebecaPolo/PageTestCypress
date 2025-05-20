import messages from "./config/messages";
const TIMEOUT = 5000;

class AdminPage {
  elements = {
    getRowByUsername: (username) =>
      cy.get('div[role="row"]').contains(username).parents('div[role="row"]'),

    editButtonForUser: (username) =>
      this.elements.getRowByUsername(username).find('i.bi-pencil-fill').parents('button'),

    deleteButtonForUser: (username) =>
      this.elements.getRowByUsername(username).find('i.bi-trash').parents('button'),

    cancelButton: () => cy.get('button.oxd-button--ghost').contains('Cancel'),
    userRoleOptions: () => cy.get('.oxd-select-dropdown'),
    addUserNameSelector: () => cy.get('[role="listbox"]', { timeout: TIMEOUT }),

    addUserRoleDropdown: () =>
      cy.contains('label', 'User Role').closest('.oxd-input-group').find('.oxd-select-wrapper .oxd-select-text'),

    addUserStatusDropdown: () =>
      cy.contains('label', 'Status').closest('.oxd-input-group').find('.oxd-select-wrapper .oxd-select-text'),

    addUserName: () => cy.get('.oxd-autocomplete-text-input--active input[placeholder="Type for hints..."]'),
    addUserUsername: () => cy.contains('label', 'Username').closest('.oxd-input-group').find('input'),
    addUserPassword: () => cy.contains('label', 'Password').closest('.oxd-input-group').find('input[type="password"]'),
    addUserConfirmPass: () => cy.contains('label', 'Confirm Password').closest('.oxd-input-group').find('input[type="password"]'),

    addUserCancelButton: () => cy.get('button.oxd-button--ghost').contains('Cancel'),
    addUserSaveButton: () => cy.get('button.oxd-button--secondary').contains('Save'),

    successfulySavedMessage: () => cy.contains(messages.succesfullySaved),
    requiredErrors: () => cy.get('.oxd-input-group__message'),
    passwordDoNotMatchError: () => cy.contains('.oxd-input-group__message', messages.passwordMismatch),
  };

  /* ---------- Generic Actions ---------- */
  clickEditButton(username) {
    this.elements.editButtonForUser(username).click();
  }

  clickDeleteButton(username) {
    this.elements.deleteButtonForUser(username).click();
  }

  confirmDelete() {
    cy.get('button').contains('Yes, Delete').click();
  }

  cancelDelete() {
    cy.get('button').contains('No, Cancel').click();
  }

  deleteUser(username) {
    this.clickDeleteButton(username);
    this.confirmDelete();
  }

  deleteAdmin() {
    this.deleteUser('Admin');
    this.getCannotDeleteMessage();
  }

  getCannotDeleteMessage() {
    return cy.contains(messages.cannotBeDeleted);
  }

  /* ---------- Form Actions ---------- */
  fillAddUserForm({ role, name, status, username, password, confirmPassword }) {
    this.selectDropdown('addUserRoleDropdown', role);
    this.selectAutocompleteName(name);
    this.selectDropdown('addUserStatusDropdown', status);
    if (username) this.elements.addUserUsername().clear().type(username);
    if (password) this.elements.addUserPassword().clear().type(password);
    if (confirmPassword) this.elements.addUserConfirmPass().clear().type(confirmPassword);
  }

  selectDropdown(dropdownKey, value) {
    this.elements[dropdownKey]().click();
    this.elements.userRoleOptions().contains(value).click();
  }

  selectAutocompleteName(name) {
    this.elements.addUserName().clear().type(name);
    cy.wait(2000); 
    this.elements.addUserNameSelector().find('[role="option"]').contains(name).click();
  }

  saveForm() {
    this.elements.addUserSaveButton().click();
  }

  cancelForm() {
    this.elements.addUserCancelButton().click();
  }
    clickFirstEditableUser() {
    cy.get('div[role="row"]').eq(1).find('i.bi-pencil-fill').parents('button').click();
  }

  clickEditButtonByUsername(username) {
    this.elements.editButtonForUser(username).click();
  }

  clickDeleteButtonByUsername(username) {
    this.elements.deleteButtonForUser(username).click();
  }

  clickConfirmDeleteButton() {
    cy.get('button').contains('Yes, Delete').click();
  }

  clickCancelButton() {
    this.elements.cancelButton().click();
  }


  /* ---------- Validations ---------- */
  expectSuccessfulySavedMessage() {
    this.elements.successfulySavedMessage().should('be.visible');
  }

  verifyRequiredErrors(count = 5) {
    this.elements.requiredErrors().should('have.length.at.least', count);
    this.elements.requiredErrors().each(($el, index) => {
      if (index < count) cy.wrap($el).should('contain.text', messages.required);
    });
  }

  verifyPasswordMismatchError() {
    this.elements.passwordDoNotMatchError().should('be.visible');
  }

  verifyShortPasswordError() {
    this.elements.requiredErrors().should('contain.text', messages.shortPassword);
  }
}
export default AdminPage;
