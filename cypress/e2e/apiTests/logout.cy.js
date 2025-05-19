describe('Logout API Test', () => {
  const admin = Cypress.env('admin');

  it('TC - Logout should redirect to login and reset session cookie', () => {
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
      expect(hasOrangehrmCookie).to.be.true; // cookie este setat, chiar dacă cu o valoare nouă
    });

    // Optional: după logout, cookie-ul încă există, dar sesiunea este invalidă
    cy.getCookie('orangehrm').should('exist');
  });
});
