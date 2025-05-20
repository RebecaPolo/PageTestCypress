
import AdminPage from "../../pages/AdminPage";
import routes from "../../pages/config/routes";

describe('Admin Users API Tests - Professional Suite', () => {
  const adminPage = new AdminPage();
  const admin = Cypress.env('admin');

  beforeEach(() => {
    cy.login(admin.username, admin.password);
    cy.visit(routes.adminViewUsers);
  });

  after(() => {
    cy.logout();
  });

  describe('GET /admin/users - List Validation', () => {
    it('TC1 - Returns 200 and proper response structure', () => {
      cy.request('/api/v2/admin/users?limit=50&offset=0&sortField=u.userName&sortOrder=ASC')
        .then(response => {
          expect(response.status).to.eq(200);
          expect(response.body).to.have.property('data').that.is.an('array');
          expect(response.body).to.have.nested.property('meta.total').that.is.a('number');
          expect(response.body.data.length).to.be.lte(50);
        });
    });

    it('TC2 - Ensures each user item has required properties with correct types', () => {
      cy.request('/api/v2/admin/users?limit=50&offset=0&sortField=u.userName&sortOrder=ASC')
        .then(({ body }) => {
          body.data.forEach(user => {
            expect(user).to.have.all.keys('id', 'userName', 'deleted', 'status', 'employee', 'userRole');
            expect(user.id).to.be.a('number');
            expect(user.userName).to.be.a('string').and.not.to.be.empty;
            expect(user.deleted).to.be.a('boolean');
            expect(user.status).to.be.a('boolean');

            expect(user.employee).to.include.all.keys(
              'empNumber',
              'employeeId',
              'firstName',
              'middleName',
              'lastName',
              'terminationId'
            );
            expect(user.employee.empNumber).to.be.a('number');
            expect(user.employee.employeeId).to.be.a('string').and.not.to.be.empty;
            expect(user.employee.firstName).to.be.a('string').and.not.to.be.empty;
            if (user.employee.middleName !== null) {
              expect(user.employee.middleName).to.be.a('string');
            }
            expect(user.employee.lastName).to.be.a('string').and.not.to.be.empty;

            expect(user.userRole).to.include.all.keys('id', 'name', 'displayName');
            expect(user.userRole.id).to.be.a('number');
            expect(user.userRole.name).to.be.a('string').and.not.to.be.empty;
            expect(user.userRole.displayName).to.be.a('string').and.not.to.be.empty;
          });
        });
    });

    it('TC3 - Verifies that at least one user has the Admin role', () => {
      cy.request('/api/v2/admin/users?limit=50&offset=0&sortField=u.userName&sortOrder=ASC')
        .then(({ body }) => {
          const hasAdmin = body.data.some(u => u.userRole.name.toLowerCase() === 'admin');
          expect(hasAdmin).to.be.true;
        });
    });
  });

  describe('User Details Fetch on Edit', () => {
    beforeEach(() => {
      cy.intercept('GET', '**/api/v2/admin/users/*').as('getUserDetails');
    });

    it('TC1 - Opens edit modal and fetches user details via API', () => {
      adminPage.clickFirstEditableUser();
      cy.wait('@getUserDetails').its('response.statusCode').should('eq', 200);
    });

    it('TC2 - Ensures user details response has expected structure and values', () => {
      adminPage.clickFirstEditableUser();
      cy.wait('@getUserDetails').then(({ response }) => {
        expect(response.statusCode).to.eq(200);
        const user = response.body.data;

        expect(user).to.have.all.keys('id', 'userName', 'deleted', 'status', 'employee', 'userRole');
        expect(user.userName).to.be.a('string').and.not.be.empty;
        expect(user.userRole).to.include.all.keys('id', 'name', 'displayName');
      });
    });

    it('TC3 - Cancels editing and closes form', () => {
      adminPage.clickEditButtonByUsername('Admin');
      cy.wait('@getUserDetails');
      adminPage.clickCancelButton();
    });
  });

  describe('User Delete API', () => {
    it('TC1 - Should not allow deleting Admin user and should show error message', () => {
      adminPage.clickDeleteButtonByUsername('Admin');
      adminPage.getCannotDeleteMessage().should('be.visible');
      cy.get('div[role="row"]').should('contain.text', 'Admin');
    });

    it('TC2 - Seletes a regular user via UI and verifies API call', () => {
      const username = 'wawan';

      cy.intercept('DELETE', '**/api/v2/admin/users').as('deleteUser');

      adminPage.clickDeleteButtonByUsername(username);
      adminPage.clickConfirmDeleteButton();

      cy.wait('@deleteUser').then(({ request, response }) => {
        expect(request.method).to.eq('DELETE');
        expect(response.statusCode).to.be.oneOf([200, 204]);
      });

      cy.get('div[role="row"]').should('not.contain.text', username);
    });

  });
});
