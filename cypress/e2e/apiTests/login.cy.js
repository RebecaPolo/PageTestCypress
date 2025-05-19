import routes from "../../pages/config/routes";

describe('Login API Tests', () => {
  const admin = Cypress.env('admin');

  it('TC1 - Should load login page with status 200 and correct content-type', () => {
    cy.request({
      method: 'GET',
      url: routes.login
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.headers['content-type']).to.include('text/html');
    });
  });

  it('TC2 - Should fail login with missing username field', () => {
  cy.request({
    method: 'POST',
    url: '/auth/validate',
    form: true,
    body: { password: admin.password },
    followRedirect: false,
    failOnStatusCode: false
  }).then((res) => {
    expect(res.status).to.eq(302);
    expect(res.headers.location).to.include('/auth/login');
  });
});

  it('TC3 - Should fail login with invalid credentials and get 302 redirect', () => {
    cy.request({
      method: 'POST',
      url: '/auth/validate',
      form: true,
      body: {
        username: 'invalidUser',
        password: 'invalidPass'
      },
      followRedirect: false,
      failOnStatusCode: false
    }).then((res) => {
      expect(res.status).to.eq(302);
      expect(res.headers).to.have.property('location').and.include('/auth/login');
    });
  });

  it('TC4 - Should fail login with empty username and password', () => {
    cy.request({
      method: 'POST',
      url: '/auth/validate',
      form: true,
      body: { 
        username: '', 
        password: '' },
      followRedirect: false,
      failOnStatusCode: false
    }).then((res) => {
      expect(res.status).to.eq(302);
      expect(res.headers.location).to.include('/auth/login');
    });
  });

  it('TC5 - Should fail login with valid username and wrong password', () => {
    cy.request({
      method: 'POST',
      url: '/auth/validate',
      form: true,
      body: { 
        username: admin.username, 
        password: 'wrongPassword' },
      followRedirect: false,
      failOnStatusCode: false
    }).then((res) => {
      expect(res.status).to.eq(302);
      expect(res.headers.location).to.include('/auth/login');
    });
  });

  it('TC6 - Should fail login with missing password field', () => {
    cy.request({
      method: 'POST',
      url: '/auth/validate',
      form: true,
      body: { 
        username: admin.username },
      followRedirect: false,
      failOnStatusCode: false
    }).then((res) => {
      expect(res.status).to.eq(302);
      expect(res.headers.location).to.include('/auth/login');
    });
  });



});
