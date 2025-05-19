// cypress/pages/DashboardPage.js

import messages from "./config/messages";

class DashboardPage {
  //selectori
  elements = {
    menuItem: (index) => cy.get('.oxd-main-menu-item-wrapper').eq(index),
    menuLabel: (label) => cy.contains(label),
    welcomeMessage: () => cy.contains(messages.welcomeMessage)
  }

  //metode
  goToMenuItem(label, index) {
    this.elements.menuLabel(label).should('be.visible');
    this.elements.menuItem(index).click();
  }

  verifyMenuItemsVisible(items) {
    items.forEach(label => {
      this.elements.menuLabel(label).should('be.visible');
    });
  }

  verifyMenuItemsNotVisible(items) {
    items.forEach(label => {
      this.elements.menuLabel(label).should('not.exist');
    });
  }

  verifyWelcomeMessage() {
    this.elements.welcomeMessage().should('be.visible');
  }
}

export default DashboardPage;
