
import messages from "./config/messages";
import routes from "./config/routes";

class PimPage {
  elements = {
    firstName: () => cy.get('input[name="firstName"]'),
    middleName: () => cy.get('input[name="middleName"]'),
    lastName: () => cy.get('input[name="lastName"]'),
    employeeIdInput: () =>
      cy.contains('label', messages.employeeId)
        .parent()
        .siblings('div')
        .find('input'),
    submitButton: () => cy.get('button[type="submit"]'),
    addButton: () => cy.get('button.oxd-button--secondary').eq(1),
    lastNameError: () =>
      cy.get('input[name="lastName"]')
        .parent()
        .siblings('span.oxd-input-field-error-message'),
    firstNameError: () =>
      cy.get('input[name="firstName"]')
        .parent()
        .siblings('span.oxd-input-field-error-message'),
    editButton: () => cy.get('button[class="oxd-icon-button oxd-table-cell-action-space"]').eq(0),
    editFirstNameInput: () => cy.get('input[name="firstName"]'),
    editSubmitButton: () => cy.get('button[type="submit"]').eq(1),
    employeeIdCells: () => cy.get('.oxd-table-card-cell .header')
        .contains('Id')
        .parents('.oxd-table-card-cell')
        .siblings('.oxd-table-card-cell')
        .find('.data'),
    nextPageButton: () =>
      cy.get('ul.oxd-pagination__ul')
        .find('i.bi-chevron-right') 
        .parents('button') ,

    successMessage: () => cy.contains(messages.succesfullySaved),
    credentialError: () => cy.contains(messages.credentialRequired),
    duplicateIdError: () => cy.contains(messages.duplicateIdError),
  };

  fillEmployeeForm({ firstName, middleName, lastName, employeeId }) {
    if (firstName) this.elements.firstName().type(firstName);
    if (middleName) this.elements.middleName().type(middleName);
    if (lastName) this.elements.lastName().type(lastName);
    if (employeeId) this.elements.employeeIdInput().clear().type(employeeId.toString());
  }
  
  verifyEmployeeInListById(employeeId) {
    const searchInPage = () => {
      cy.get('.oxd-table-card').then(($cards) => {
        const found = Cypress._.some($cards, (card) => {
          return card.innerText.includes(employeeId.toString());
        });

        if (found) {
          cy.log(`✅ Employee ID ${employeeId} found.`);
          return;
        }

        this.elements.nextPageButton().then(($btn) => {
          if ($btn.is(':disabled')) {
            throw new Error(`❌ Employee ID ${employeeId} not found in any page`);
          } else {
            cy.wrap($btn).click();
            cy.wait(300);
            searchInPage();
          }
        });
      });
    };

    searchInPage();
  }

  submitForm() {
    this.elements.submitButton().click();
  }

  openAddEmployee() {
    cy.visit(routes.pimAddEmployee, { failOnStatusCode: false });
  }

  openEmployeeList() {
    cy.visit(routes.pimViewList);
  }

  clickAddButton() {
    this.elements.addButton().click();
  }

  editFirstEmployee(newFirstName) {
    this.elements.editButton().click();
    this.elements.editFirstNameInput().type(newFirstName);
    this.elements.editSubmitButton().click();
  }
}

export default PimPage;
