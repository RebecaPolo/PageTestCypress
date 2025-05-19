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

  describe('TC1 - GET /admin/users List Validation', () => {

    it('TC1.1 - Should return 200 and proper response structure', () => {
      cy.request('/api/v2/admin/users?limit=50&offset=0&sortField=u.userName&sortOrder=ASC')
        .then(response => {
          expect(response.status).to.eq(200);
          expect(response.body).to.have.property('data').that.is.an('array');
          expect(response.body).to.have.nested.property('meta.total').that.is.a('number');
          expect(response.body.data.length).to.be.lte(50);
        });
    });

    it('TC1.2 - Each user item should have required properties with correct types', () => {
      cy.request('/api/v2/admin/users?limit=50&offset=0&sortField=u.userName&sortOrder=ASC')
        .then(({ body }) => {
          body.data.forEach(user => {
            expect(user).to.have.all.keys('id', 'userName', 'deleted', 'status', 'employee', 'userRole');
            expect(user.id).to.be.a('number');
            expect(user.userName).to.be.a('string').and.not.to.be.empty;
            expect(user.deleted).to.be.a('boolean');
            expect(user.status).to.be.a('boolean');

            expect(user.employee).to.include.all.keys('empNumber', 'employeeId', 'firstName', 'middleName', 'lastName', 'terminationId');
            expect(user.employee.empNumber).to.be.a('number');
            expect(user.employee.employeeId).to.be.a('string').and.not.to.be.empty;
            expect(user.employee.firstName).to.be.a('string').and.not.to.be.empty;
            if (user.employee.middleName !== null) {
              expect(user.employee.middleName).to.be.a('string');
            }
            expect(user.employee.lastName).to.be.a('string').and.not.to.be.empty;
            expect(user.employee).to.have.property('terminationId');

            expect(user.userRole).to.include.all.keys('id', 'name', 'displayName');
            expect(user.userRole.id).to.be.a('number');
            expect(user.userRole.name).to.be.a('string').and.not.to.be.empty;
            expect(user.userRole.displayName).to.be.a('string').and.not.to.be.empty;
          });
        });
    });

    it('TC1.3 - At least one user must have Admin role', () => {
      cy.request('/api/v2/admin/users?limit=50&offset=0&sortField=u.userName&sortOrder=ASC')
        .then(({ body }) => {
          const hasAdmin = body.data.some(u => u.userRole.name.toLowerCase() === 'admin');
          expect(hasAdmin).to.be.true;
        });
    });

  });


  describe('TC2 - User Details Fetch on Edit', () => {
    beforeEach(() => {
      cy.intercept('GET', '**/api/v2/admin/users/*').as('getUserDetails');
    });

    it('TC2.1 - Should open edit modal and fetch user details via API', () => {
      adminPage.clickEditUserButton();

      cy.wait('@getUserDetails').then(({ response }) => {
        expect(response.statusCode).to.eq(200);
      });
    });

    it('TC2.2 - User details response should contain expected data structure and values', () => {
      adminPage.clickEditUserButton();

      cy.wait('@getUserDetails').then(({ response }) => {
        expect(response.statusCode).to.eq(200);

        const user = response.body.data;

        expect(user).to.have.all.keys('id', 'userName', 'deleted', 'status', 'employee', 'userRole');
        expect(user.id).to.be.a('number');
        expect(user.userName).to.be.a('string').and.not.empty;
        expect(user.deleted).to.be.a('boolean');
        expect(user.status).to.be.a('boolean');

        expect(user.employee).to.include.all.keys('empNumber', 'employeeId', 'firstName', 'middleName', 'lastName', 'terminationId');

        expect(user.userRole).to.include.all.keys('id', 'name', 'displayName');
      });
    });

    it('TC2.3 - Should cancel editing and close form', () => {
      adminPage.clickEditAdminButton();
      cy.wait('@getUserDetails');
      adminPage.clickCancelButton();
    });
  });


  describe('TC3 - Delete API Testing', () => {
    it('TC3.1 - Should NOT allow deleting Admin user and show error message', () => {
      adminPage.deleteAdmin();
      cy.get('div[role="row"]').should('contain.text', 'Admin');
    });

    const usersToDelete = ['DonaldDaniel', 'Jamison_Stroman30', 'Janu585J'];

    usersToDelete.forEach((username, index) => {
      it(`TC3.${index + 2} - Should delete user ${username} via UI and verify API call`, () => {
        cy.intercept('DELETE', '**/api/v2/admin/users').as('deleteUser');

        adminPage.deleteThisUser(username);

        cy.wait('@deleteUser').then(({ request, response }) => {
          expect(request.method).to.eq('DELETE');
          expect(request.body).to.have.property('ids').that.is.an('array').and.is.not.empty;
          expect(response.statusCode).to.be.oneOf([200, 204]);
        });

        cy.get('div[role="row"]').should('not.contain.text', username);
      });
    });

    it('TC3.5 - Should cancel user deletion when clicking "No, Cancel"', () => {
      adminPage.cancelDeleteUser();

      cy.get('.oxd-dialog-container').should('not.exist');
      cy.get('div[role="row"]').should('contain.text', 'ESS');
    });

  });
});
