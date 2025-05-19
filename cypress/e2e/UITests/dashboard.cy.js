// cypress/e2e/testApplication/dashboard.cy.js
import DashboardPage from '../../pages/DashboardPage'
import messages from '../../pages/config/messages';
import routes from '../../pages/config/routes';

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
      dashboard.verifyMenuItemsVisible([messages.pim, messages.leave, messages.time, messages.directory]);
    });

    it('TC2 - Leave quick link works', () => {
      dashboard.goToMenuItem(messages.leave, menuItems.admin.Leave);
      cy.url().should('include', routes.adminLeaveViewList);
    });

    it('TC3 - PIM quick link works', () => {
      dashboard.goToMenuItem(messages.pim, menuItems.admin.PIM);
      cy.url().should('include', routes.pimViewList);
    });

    it('TC4 - Time quick link works', () => {
      dashboard.goToMenuItem(messages.time, menuItems.admin.Time);
      cy.url().should('include', routes.adminTime);
    });

    it('TC5 - Directory quick link works', () => {
      dashboard.goToMenuItem(messages.directory, menuItems.admin.Directory);
      cy.url().should('include', routes.directory);
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
      dashboard.goToMenuItem(messages.leave, menuItems.user.Leave);
      cy.url().should('include', routes.userLeaveView);
    });

    it('TC8 - Time quick link works', () => {
      dashboard.goToMenuItem(messages.time, menuItems.user.Time);
      cy.url().should('include', routes.userTimesheet);
    });

    it('TC9 - Directory quick link works', () => {
      dashboard.goToMenuItem(messages.directory, menuItems.user.Directory);
      cy.url().should('include', routes.directory);
    });

    it('TC10 - Only allowed elements exist', () => {
      dashboard.verifyMenuItemsNotVisible([messages.pim]);
      dashboard.verifyMenuItemsVisible([messages.leave, messages.time, messages.directory]);
    });

    it('TC11 - Welcome message appears', () => {
      dashboard.verifyWelcomeMessage();
    });
  });
});
