

var adminUsername = 'Admin'
var adminPassword = 'admin123'
var invalidUsername = 'adm'
var invalidPassword = 'adm1234'

describe('Login Page Test Scenarios', () => {

    beforeEach(() => {
    // Deschide pagina de login
    cy.visit('/auth/login');
  });

  
  it('TC1 - Valid Login', () => {
    //user and pass input
    cy.get('input[name="username"]').type(adminUsername);
    cy.get('input[name="password"]').type(adminPassword);

    // Click on login button
    cy.get('button[type="submit"]').click();

    // Verify if this is the correct page
    cy.url().should('include', '/dashboard');
    cy.contains('Dashboard').should('be.visible');
  });

  it('TC2 - Valid username and invalid password', () => {
    cy.get('input[name="username"]').type(adminUsername);
    cy.get('input[name="password"]').type(invalidPassword);
    cy.get('button[type="submit"]').click();

    // Verifică afișarea mesajului de eroare
    // cy.get('.oxd-alert-content-text')
    //   .should('be.visible')
    //   .and('contain', 'Invalid credentials');
    cy.contains('Invalid credentials').should('be.visible')
  });

  it('TC3 - Invalid username and valid password', ()=>{
    cy.get('input[name="username"]').type(invalidUsername)
    cy.get('input[name="password"]').type(adminPassword)
    cy.get('button[type="submit"]').click()

    cy.contains('Invalid credentials').should('be.visible')
  })

  it('TC4 - Invalid username and password', ()=>{
    cy.get('input[name="username"]').type(invalidUsername)
    cy.get('input[name="password"]').type(invalidPassword)
    cy.get('button[type="submit"]').click()

    cy.contains('Invalid credentials').should('be.visible')
  })

  it('TC5 - Username and password cleared', ()=>{
    cy.get('button[type="submit"]').click()

    cy.get('input[name="username"]').parents('.oxd-input-group')
    .find('.oxd-input-field-error-message').should('contain.text','Required')
    
    cy.get('.oxd-input-group').eq(1)
    .find('.oxd-input-field-error-message').should('contain.text','Required')
  })

  it('TC6 - Username cleared and password filled', ()=>{
    cy.get('input[name="username"]').type(adminUsername)
    cy.get('button[type="submit"]').click()

    cy.get('.oxd-input-group').eq(1)
    .find('.oxd-input-field-error-message').should('contain.text','Required')
  })

  it('TC7 - Password cleared and username filled', ()=>{
    cy.get('input[name="password"]').type(adminPassword)
    cy.get('button[type="submit"]').click()

    cy.get('.oxd-input-group').eq(0)
    .find('.oxd-input-field-error-message').should('contain.text','Required')
  })


});
