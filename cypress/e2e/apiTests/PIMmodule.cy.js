const admin = Cypress.env('admin');
const user = Cypress.env('user');

describe('PIM API Tests', () => {
  let createdEmpNumbers = [];

  beforeEach(() => {
    cy.login(admin.username, admin.password);
  });

  afterEach(() => {
    // Cleanup: șterge angajații creați
    createdEmpNumbers.forEach((empNumber) => {
      cy.request({
        method: 'DELETE',
        url: `/api/v2/pim/employees/${empNumber}`,
        failOnStatusCode: false,
      });
    });
    createdEmpNumbers = [];
  });

  it('TC1 - Normal user cannot access add employee API endpoint', () => {
    cy.logout();
    cy.login(user.username, user.password);

    cy.request({
      method: 'POST',
      url: '/api/v2/pim/employees',
      headers: { 'Content-Type': 'application/json' },
      body: {
        firstName: 'Unauthorized',
        lastName: 'User_' + Date.now()
      },
      failOnStatusCode: false
    }).then((response) => {
      expect([401, 403]).to.include(response.status);
    });
  });

  it('TC2 - Add employee endpoint returns 200 with minimal valid data', () => {
    cy.request({
      method: 'POST',
      url: '/api/v2/pim/employees',
      headers: { 'Content-Type': 'application/json' },
      body: {
        firstName: 'Test',
        lastName: 'Minimal_' + Date.now()
      }
    }).then((res) => {
      expect(res.status).to.eq(200);
      expect(res.body.data).to.have.property('empNumber');
      createdEmpNumbers.push(res.body.data.empNumber);
    });
  });

  it('TC3 - Add employee with all valid fields', () => {
    cy.fixture('employeeData').then((data) => {
      cy.request({
        method: 'POST',
        url: '/api/v2/pim/employees',
        headers: { 'Content-Type': 'application/json' },
        body: {
          ...data.validEmployee,
          lastName: 'Full_' + Date.now()
        }
      }).then((res) => {
        expect(res.status).to.eq(200);
        expect(res.body.data).to.have.property('empNumber');
        createdEmpNumbers.push(res.body.data.empNumber);
      });
    });
  });

  it('TC4 - Fail to add employee with missing lastName', () => {
    cy.fixture('employeeData').then((data) => {
      cy.request({
        method: 'POST',
        url: '/api/v2/pim/employees',
        failOnStatusCode: false,
        headers: { 'Content-Type': 'application/json' },
        body: {
          ...data.missingLastName
        }
      }).then((res) => {
        expect([400, 422]).to.include(res.status);
        expect(res.body).to.have.property('error');
      });
    });
  });

  it('TC5 - Fail to add employee with missing firstName', () => {
    cy.fixture('employeeData').then((data) => {
      cy.request({
        method: 'POST',
        url: '/api/v2/pim/employees',
        failOnStatusCode: false,
        headers: { 'Content-Type': 'application/json' },
        body: {
          ...data.missingFirstName
        }
      }).then((res) => {
        expect([400, 422]).to.include(res.status);
        expect(res.body).to.have.property('error');
      });
    });
  });

  it('TC6 - Fail to add employee with duplicate employee ID', () => {
    cy.fixture('employeeData').then((data) => {
      const duplicate = {
        ...data.validEmployee,
        employeeId: data.existingId
      };

      cy.request({
        method: 'POST',
        url: '/api/v2/pim/employees',
        failOnStatusCode: false,
        headers: { 'Content-Type': 'application/json' },
        body: duplicate
      }).then((res) => {
        expect([400, 409,422]).to.include(res.status);
        expect(res.body).to.have.property('error');
      });
    });
  });

  
});
  
