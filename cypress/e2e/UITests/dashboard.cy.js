import DashboardPage from "../../pages/DashboardPage";

const dashboard = new DashboardPage();

describe('Dashboard Tests - Admin User', () => {
  beforeEach(function () {
    cy.fixture('users').then((data) => {
      this.user = data.admin;
      cy.login(this.user.username, this.user.password);
    });
  });

  afterEach(function () {
    if (this.currentTest.state === 'passed') {
      cy.logout();
    }
  });

  it('TC1 - Should show allowed menu items', function () {
    dashboard.verifyMenuItemsVisible(this.user.menu.visible);
    if (this.user.menu.notVisible) {
      dashboard.verifyMenuItemsNotVisible(this.user.menu.notVisible);
    }
  });

  it('TC2 - Should navigate to key link', function () {
    const { label, index, route } = this.user.menu.keyLink;
    dashboard.goToMenuItem(label, index);
    cy.url().should('include', route);
  });

  it('TC3 - Should show the welcome message', () => {
    dashboard.verifyWelcomeMessage();
  });
});

describe('Dashboard Tests - Normal User', () => {
  beforeEach(function () {
    cy.fixture('users').then((data) => {
      this.user = data.user;
      cy.login(this.user.username, this.user.password);
    });
  });

  afterEach(function () {
    if (this.currentTest.state === 'passed') {
      cy.logout();
    }
  });

  it('TC1 - Should show allowed menu items', function () {
    dashboard.verifyMenuItemsVisible(this.user.menu.visible);
    if (this.user.menu.notVisible) {
      dashboard.verifyMenuItemsNotVisible(this.user.menu.notVisible);
    }
  });

  it('TC2 - Should navigate to key link', function () {
    const { label, index, route } = this.user.menu.keyLink;
    dashboard.goToMenuItem(label, index);
    cy.url().should('include', route);
  });

  it('TC3 - Should show the welcome message', () => {
    dashboard.verifyWelcomeMessage();
  });
});
