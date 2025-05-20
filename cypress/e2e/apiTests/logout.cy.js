describe('Logout API Test', () => {
  const admin = Cypress.env('admin');

  it('TC1 - Logout should redirect to login and reset session cookie', () => {
    cy.login(admin.username, admin.password);

    cy.request({
      method: 'GET',
      url: '/auth/logout',
      followRedirect: false
    }).then((response) => {
      expect(response.status).to.eq(302);
      expect(response.headers).to.have.property('location').and.include('/web/index.php/auth/login');

      const cookies = response.headers['set-cookie'] || [];
      const hasOrangehrmCookie = cookies.some(cookie => cookie.startsWith('orangehrm='));
      expect(hasOrangehrmCookie).to.be.true; 
    });

    cy.getCookie('orangehrm').should('exist');
  });
});
