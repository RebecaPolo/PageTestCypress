
 const logoutPage = {
  usernameInput: 'input[name="username"]',
  passwordInput: 'input[name="password"]',
  submitButton: 'button[type="submit"]',
  profileDropdown: '.oxd-userdropdown-name',
  logoutButton: 'Logout',
};

describe('Logout Functionality Tests ', () => {

  //declarations
  const admin = { username: 'Admin', password: 'admin123' }
  const user = { username: 'rebecapolo', password: 'rebeca123' }

  it('TC1 - Logout as admin after Authentication', () => {
    cy.login(admin.username, admin.password)
    cy.logout()
    cy.get(logoutPage.submitButton).should('be.visible')
  });

  it('TC2 - Logout as user after Authentication', () => {
    cy.login(user.username, user.password)
    cy.logout()
    cy.get(logoutPage.submitButton).should('be.visible')
  });

  it('TC3 - Users can go back securly after logout',()=>{
    cy.login(admin.username, admin.password)
    cy.logout()
    cy.get('body').type('{alt}{leftarrow}');

    cy.url().should('include','auth/login')
  })


  


});
