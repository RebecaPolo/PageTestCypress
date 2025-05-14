
describe('Logout Functionality Tests ', () => {

  beforeEach(() => {
    cy.visit('/auth/login');

    // Login ca Admin
    cy.get('input[name="username"]').type('Admin');
    cy.get('input[name="password"]').type('admin123');
    cy.get('button[type="submit"]').click();

    // Asigură-te că login-ul a fost reușit
    cy.url().should('include', '/dashboard');
  });


  it('TC1 - Logout after Authentication', () => {
    cy.get('.oxd-userdropdown-name').click();
   
    cy.contains('Logout').click();

    cy.url().should('include', '/auth/login');
    cy.get('button[type="submit"]').should('be.visible');
  });

  // it('TC2 - Users can go back securly after logout',()=>{
  //   cy.get('.oxd-userdropdown-name').click();
  //   cy.contains('Logout').click();

  //   cy.window().then((win) => {
  //     win.history.back(); // Apasă butonul "Back" al browser-ului manual
  //   });
  //   cy.go('back')

  //   cy.url().should('include','auth/login')
  // })


  // it('User logs in, closes the browser, and should be logged in when reopening the browser', () => {
    
  //   // 3. Close the browser (simulate this by clearing cookies)
  //   cy.clearCookies();
    
  //   // 4. Reopen the browser and visit the page again
  //   cy.visit('/auth/login');
    
  //   // 5. Verify user is logged in automatically
  //   // Check if the user is on the dashboard page, indicating they are logged in
  //   cy.url().should('include', '/auth/login');
  // });
  


});
