import messages from '../../pages/messages';
import PimPage from '../../pages/PimPage';
import routes from '../../pages/routes';

describe('Testing PIM module components', () => {
  const admin = Cypress.env('admin');
  const user = Cypress.env('user');
  const pim = new PimPage();

  let employeeData;
  let shouldRunAfterEach = true;

  before(() => {
    //fixture
    cy.fixture('employeeData').then((data) => {
      employeeData = data;
    });
  });

  beforeEach(() => {
    cy.login(admin.username, admin.password);
    pim.openAddEmployee();
  });

  afterEach(() => {
    if (shouldRunAfterEach) {
      cy.logout();
    } else {
      shouldRunAfterEach = true; // resetăm pentru următorul test
    }
  });

  it('TC1 - Add button works correctly', () => {
    pim.openEmployeeList();
    pim.clickAddButton();
    cy.url().should('include', routes.pimAddEmployee); // validare simplă
  });

  it('TC2 - Add an employee with all fields filled correctly', () => {
    const id = Math.floor(1000 + Math.random() * 9000);
    pim.fillEmployeeForm({
      ...employeeData.validEmployee,
      employeeId: id
    });
    pim.submitForm();
    pim.elements.successMessage().should('be.visible');
  });

  it('TC3 - Validation for Last Name when adding a new user', () => {
    const id = Math.floor(1000 + Math.random() * 9000);
    pim.fillEmployeeForm({
      ...employeeData.missingLastName,
      employeeId: id
    });
    pim.submitForm();
    pim.elements.lastNameError().should('contain.text', messages.required);
  });

  it('TC4 - Validation for First Name when adding a new user', () => {
    const id = Math.floor(1000 + Math.random() * 9000);
    pim.fillEmployeeForm({
      ...employeeData.missingFirstName,
      employeeId: id
    });
    pim.submitForm();
    pim.elements.firstNameError().should('contain.text', messages.required);
  });

  it('TC5 - Normal user cannot access add employee page', () => {
    shouldRunAfterEach = false;

    cy.logout();
    cy.login(user.username, user.password);

    cy.visit(routes.pimAddEmployee, { failOnStatusCode: false });
    pim.elements.credentialError().should('be.visible');
  });

  it('TC6 - Validation for duplicate Employee ID', () => {
    pim.fillEmployeeForm({
      ...employeeData.validEmployee,
      employeeId: employeeData.existingId
    });
    pim.submitForm();
    pim.elements.duplicateIdError().should('be.visible');
  });

  it('TC7 - Edit an employee from the list', () => {
    pim.openEmployeeList();
    pim.editFirstEmployee(employeeData.editName);
    pim.elements.successMessage().should('be.visible');
  });
});
