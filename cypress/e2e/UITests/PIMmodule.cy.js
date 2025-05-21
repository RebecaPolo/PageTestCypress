import messages from '../../pages/config/messages';
import PimPage from '../../pages/PimPage';
import routes from '../../pages/config/routes';




describe('Testing PIM module components', () => {
  const admin = Cypress.env('admin');
  const user = Cypress.env('user');
  const pim = new PimPage();

  let employeeData;
  let shouldRunAfterEach = true;

  before(() => {
    cy.fixture('employeeData').then((data) => {
      employeeData = data;
    });
  });

  function createEmployeeAndSubmit(employeeOverride = {}) {
  const id = Math.floor(1000 + Math.random() * 9000); 
  const employee = {
    ...employeeData.validEmployee,     
    employeeId: id,                   
    ...employeeOverride                
  };

  pim.fillEmployeeForm(employee);
  pim.submitForm();

  return employee; 
}

  beforeEach(() => {
    cy.login(admin.username, admin.password);
    pim.openAddEmployee();
  });

  afterEach(() => {
    if (shouldRunAfterEach) {
      cy.logout();
    } else {
      shouldRunAfterEach = true; 
    }
  });

  it('TC1 - Add button redirects to Add employee page after click', () => {
    pim.openEmployeeList();
    pim.clickAddButton();
    cy.url().should('include', routes.pimAddEmployee);
  });

  it('TC2 - Add an employee with all fields filled correctly', () => {
    const employee = createEmployeeAndSubmit(); // folosește validEmployee
    pim.elements.successMessage().should('be.visible');

    pim.openEmployeeList();
    pim.verifyEmployeeInListById(employee.employeeId);
  });

  it('TC3 - Validation for Last Name when adding a new user', () => {
    createEmployeeAndSubmit({
      ...employeeData.missingLastName
    });

    pim.elements.lastNameError().should('contain.text', messages.required);
  });

  it('TC4 - Validation for First Name when adding a new user', () => {
    createEmployeeAndSubmit({
      ...employeeData.missingFirstName
    });

    pim.elements.firstNameError().should('contain.text', messages.required);
  });

  it('TC5 - Validation for duplicate Employee ID', () => {
    createEmployeeAndSubmit({
      ...employeeData.validEmployee,
      employeeId: employeeData.existingId
    });

    pim.elements.duplicateIdError().should('be.visible');
  });

  it('TC6 - Edit an employee from the list', () => {
    pim.openEmployeeList();
    pim.editFirstEmployee(employeeData.editName);
    pim.elements.successMessage().should('be.visible');
  });

  it('TC7 - Normal user cannot access add employee page', () => {
    
    cy.logout();
    cy.login(user.username, user.password);

    cy.visit(routes.pimAddEmployee, { failOnStatusCode: false });
    pim.elements.credentialError().should('be.visible');
  
  });


});
