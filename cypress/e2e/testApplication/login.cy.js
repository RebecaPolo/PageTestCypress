const loginPage = {
  usernameInput: 'input[name="username"]',
  passwordInput: 'input[name="password"]',
  submitButton: 'button[type="submit"]',
  inputGroup: '.oxd-input-group',
  errorMessage: '.oxd-input-field-error-message',
  invalidCredentialsText: 'Invalid credentials'
};

describe('Login Page Test Scenarios', () => {

  //declarations
  const admin = { username: 'Admin', password: 'admin123' }
  const user = { username: 'rebecapolo', password: 'rebeca123' }
  const invalid = { username: 'adm', password: 'adm1234' }

  const performLogin = (usernameOrObj, password) => {
    const username = typeof usernameOrObj === 'object' ? usernameOrObj.username : usernameOrObj
    password = typeof usernameOrObj === 'object' ? usernameOrObj.password : password

    if (username) cy.get(loginPage.usernameInput).type(username)
    if (password) cy.get(loginPage.passwordInput).type(password)

    cy.get(loginPage.submitButton).click();
  };

  const expectRequiredError = (fieldIndex) => {
    cy.get(loginPage.inputGroup).eq(fieldIndex)
      .find(loginPage.errorMessage)
      .should('contain.text', 'Required')
  };

  //Hooks
  beforeEach(() => {
    cy.visit('/auth/login')
  });

  //contexts
  context('Valid login scenarios', () => {
    afterEach(() => {
      cy.logout()
    })

    it('TC1 - Login as admin', () => {
      performLogin(admin)
      cy.url().should('include', '/dashboard')
      cy.contains('Dashboard').should('be.visible')
    })

    it('TC2 - Login as user', () => {
      performLogin(user)
      cy.url().should('include', '/dashboard')
      cy.contains('Dashboard').should('be.visible')
    })
  })

  context('Negative log scenarios', () => {
    it('TC3 - Valid username, invalid password', () => {
      performLogin(admin.username, invalid.password)
      cy.contains(loginPage.invalidCredentialsText).should('be.visible')
    })

    it('TC4 - Invalid username and valid password', () => {
      performLogin(invalid.username, admin.password)
      cy.contains(loginPage.invalidCredentialsText).should('be.visible')
    })

    it('TC5 - Invalid username and password', () => {
      performLogin(invalid)
      cy.contains(loginPage.invalidCredentialsText).should('be.visible')
    })

    it('TC6 - Username and password cleared', () => {
      cy.get(loginPage.submitButton).click()
      expectRequiredError(0) // Username
      expectRequiredError(1) // Password
    });

    it('TC7 - Username cleared and password filled', () => {
      cy.get(loginPage.usernameInput).type(user.username)
      cy.get(loginPage.submitButton).click()
      expectRequiredError(1) // Password
    })

    it('TC8 - Password cleared and username filled', () => {
      cy.get(loginPage.passwordInput).type(user.password)
      cy.get(loginPage.submitButton).click();
      expectRequiredError(0) // Username
    })
  })

})
