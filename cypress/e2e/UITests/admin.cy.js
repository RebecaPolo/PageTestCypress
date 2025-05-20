import AdminPage from "../../pages/AdminPage";
import routes from "../../pages/config/routes";

const admin = Cypress.env('admin');
const adminPage = new AdminPage();

describe('Admin page testing', () => {

  context('Static form validation tests (no fixtures)', () => {
    beforeEach(() => {
      cy.login(admin.username, admin.password);
      cy.visit(routes.adminAddUser);
    });

    afterEach(() => {
      cy.logout();
    });

    it('TC1 - Show all required field errors when form is empty', () => {
      adminPage.clickAddUserSaveButton();
      adminPage.verifyAllErrors();
    });
  });

  context('Form validation and user creation using fixtures', () => {
    beforeEach(() => {
      cy.login(admin.username, admin.password);
      cy.visit(routes.adminAddUser);
      cy.fixture('addUserData').as('userData');
    });

    afterEach(() => {
      cy.logout();
    });

    it('TC2 - All fields completed and new user added', function () {
      adminPage.fillAddUserForm(this.userData.validUser);
      adminPage.clickAddUserSaveButton();
      adminPage.expectSuccessfulySavedMessage();
    });

    it('TC3 - Missing username should trigger validation', function () {
      adminPage.fillAddUserForm(this.userData.missingUsername);
      adminPage.clickAddUserSaveButton();
      adminPage.verifyUsernameRequiredError();
    });

    it('TC4 - Missing password should trigger validation', function () {
      adminPage.fillAddUserForm(this.userData.missingPassword);
      adminPage.clickAddUserSaveButton();
      adminPage.verifyPasswordRequiredError();
    });

    it('TC5 - Short password should trigger validation', function () {
      adminPage.fillAddUserForm(this.userData.invalidShortPassword);
      adminPage.clickAddUserSaveButton();
      adminPage.verifyShortPasswordError();
    });

    it('TC6 - Password mismatch should trigger error', function () {
        adminPage.fillAddUserForm(this.userData.passwordMismatch);
        adminPage.clickAddUserSaveButton();
        adminPage.verifyPasswordMismatchError();
    });

    it('TC7 - Duplicate username should be handled', function () {
      adminPage.fillAddUserForm(this.userData.duplicateUsername);
      adminPage.clickAddUserSaveButton();
      cy.contains('Already exists').should('be.visible');
    });

     it('TC8 - Should cancel user deletion when clicking "No, Cancel"', () => {
      adminPage.clickDeleteButtonByUsername('ESS');
      adminPage.clickCancelDeleteButton();

      cy.get('.oxd-dialog-container').should('not.exist');
      cy.get('div[role="row"]').should('contain.text', 'ESS');
    });
  });

});
