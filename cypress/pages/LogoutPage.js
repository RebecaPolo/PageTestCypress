class LogoutPage {
  elements = {
    usernameInput: () => cy.get('input[name="username"]'),
    passwordInput: () => cy.get('input[name="password"]'),
    submitButton: () => cy.get('button[type="submit"]'),
    profileDropdown: () => cy.get('.oxd-userdropdown-name'),
    logoutButton: () => cy.contains('Logout'),
  }

  typeUsername(username) {
    this.elements.usernameInput().type(username);
  }

  typePassword(password) {
    this.elements.passwordInput().type(password);
  }

  clickSubmit() {
    this.elements.submitButton().click();
  }

  openProfileDropdown() {
    this.elements.profileDropdown().click();
  }

  clickLogout() {
    this.elements.logoutButton().click();
  }
}

export default LogoutPage;