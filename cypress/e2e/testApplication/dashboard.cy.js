// cypress/e2e/testApplication/dashboard.cy.js
import DashboardPage from '../../pages/DashboardPage'

describe('Testing for dashboard page', () => {
  const admin = Cypress.env('admin')
  const user = Cypress.env('user')

  const dashboard = new DashboardPage();

  const menuItems = {
    admin: {
      PIM: 1,
      Leave: 2,
      Time: 3,
      Directory: 8
    },
    user: {
      Leave: 0,
      Time: 1,
      Directory: 6
    }
  }

  afterEach(() => {
    cy.logout();
  });

  context('Admin user test', () => {
    beforeEach(() => {
      cy.login(admin.username, admin.password);
    });

    it('TC1 - All elements exist in dashboard page', () => {
      dashboard.verifyMenuItemsVisible(['PIM', 'Leave', 'Time', 'Directory']);
    });

    it('TC2 - Leave quick link works', () => {
      dashboard.goToMenuItem('Leave', menuItems.admin.Leave);
      cy.url().should('include', '/leave/viewLeaveList');
    });

    it('TC3 - PIM quick link works', () => {
      dashboard.goToMenuItem('PIM', menuItems.admin.PIM);
      cy.url().should('include', '/pim/viewEmployeeList');
    });

    it('TC4 - Time quick link works', () => {
      dashboard.goToMenuItem('Time', menuItems.admin.Time);
      cy.url().should('include', '/time/viewEmployeeTimesheet');
    });

    it('TC5 - Directory quick link works', () => {
      dashboard.goToMenuItem('Directory', menuItems.admin.Directory);
      cy.url().should('include', 'directory/viewDirectory');
    });

    it('TC6 - Welcome message appears', () => {
      dashboard.verifyWelcomeMessage();
    });
  });

  context('Normal user tests', () => {
    beforeEach(() => {
      cy.login(user.username, user.password);
    });

    it('TC7 - Leave quick link works', () => {
      dashboard.goToMenuItem('Leave', menuItems.user.Leave);
      cy.url().should('include', '/leave/');
    });

    it('TC8 - Time quick link works', () => {
      dashboard.goToMenuItem('Time', menuItems.user.Time);
      cy.url().should('include', '/time/');
    });

    it('TC9 - Directory quick link works', () => {
      dashboard.goToMenuItem('Directory', menuItems.user.Directory);
      cy.url().should('include', 'directory/viewDirectory');
    });

    it('TC10 - Only allowed elements exist', () => {
      dashboard.verifyMenuItemsNotVisible(['PIM']);
      dashboard.verifyMenuItemsVisible(['Leave', 'Time', 'Directory']);
    });

    it('TC11 - Welcome message appears', () => {
      dashboard.verifyWelcomeMessage();
    });
  });
});
