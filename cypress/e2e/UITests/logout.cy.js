

import LogoutPage from '../../pages/LogoutPage'

describe('Logout Functionality Tests ', () => {

  const admin = Cypress.env('admin')
  const user = Cypress.env('user')
  const logoutPage = new LogoutPage()

  it('TC1 - Logout as admin after Authentication', () => {
    cy.login(admin.username, admin.password)
    logoutPage.openProfileDropdown()
    logoutPage.clickLogout()
    logoutPage.elements.submitButton().should('be.visible')
  });

  it('TC2 - Logout as user after Authentication', () => {
    cy.login(user.username, user.password)
    logoutPage.openProfileDropdown()
    logoutPage.clickLogout()
    logoutPage.elements.submitButton().should('be.visible')
  });


});
