// cypress/e2e/testApplication/pim.cy.js
import PimPage from '../../pages/PimPage';

describe('Testing PIM module components', () => {
  const admin = Cypress.env('admin');
  const user = Cypress.env('user');

  const pim = new PimPage();
  let shouldRunAfterEach = true;

  beforeEach(() => {
    cy.login(admin.username, admin.password);
    pim.openAddEmployee();
  });

  afterEach(() => {
    if (!shouldRunAfterEach) return;
    cy.logout();
  });

  it('TC1 - Add button works correctly', () => {
    pim.openEmployeeList();
    pim.clickAddButton();
  });

  it('TC2 - Add an employee with all fields filled correctly', () => {
    const id = Math.floor(1000 + Math.random() * 9000);
    pim.fillEmployeeForm({
      firstName: 'Rebeca',
      middleName: 'Mihaela',
      lastName: 'Polo',
      employeeId: id
    });
    pim.submitForm();
    pim.elements.successMessage().should('be.visible');
  });

  it('TC3 - Validation for Last Name when adding a new user', () => {
    const id = Math.floor(1000 + Math.random() * 9000);
    pim.fillEmployeeForm({
      firstName: 'Rebeca',
      middleName: 'Test1',
      employeeId: id
    });
    pim.submitForm();
    pim.elements.lastNameError().should('contain.text', 'Required');
  });

  it('TC4 - Validation for First Name when adding a new user', () => {
    const id = Math.floor(1000 + Math.random() * 9000);
    pim.fillEmployeeForm({
      middleName: 'Test1',
      lastName: 'Test',
      employeeId: id
    });
    pim.submitForm();
    pim.elements.firstNameError().should('contain.text', 'Required');
  });

  it('TC5 - Normal user validation to add a user', () => {
    shouldRunAfterEach = false;

    cy.logout();
    cy.visit('/auth/login');
    cy.get('input[name="username"]').type(user.username);
    cy.get('input[name="password"]').type(user.password);
    cy.get('button[type="submit"]').click();
    cy.visit('/pim/addEmployee', { failOnStatusCode: false });
    pim.elements.credentialError().should('be.visible');
    
    //SAU
    // shouldRunAfterEach = false;
    // cy.logout();
    // cy.login(user.username, user.password);
    // pim.openAddEmployee();
    // pim.elements.credentialError().should('be.visible');
  });

  it('TC6 - Validation for Employee Id when adding a new user', () => {
    pim.fillEmployeeForm({
      firstName: 'Rebeca',
      middleName: 'Test1',
      lastName: 'Test',
      employeeId: '0417'
    });
    pim.submitForm();
    pim.elements.duplicateIdError().should('be.visible');
  });

  it('TC7 - Edit an employee from the List', () => {
    pim.openEmployeeList();
    pim.editFirstEmployee('Test');
    pim.elements.successMessage().should('be.visible');
  });
});
