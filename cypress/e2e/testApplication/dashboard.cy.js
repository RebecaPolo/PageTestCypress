
describe('Testing for dashboard page',()=>{

    var adminUsername = 'Admin'
    var adminPassword = 'admin123'
    var normalUserUsername = 'rebecapolo'
    var normalUserPassword = 'rebeca123'
    // beforeEach(()=>{
    //     cy.login()
    // })
    
    afterEach(()=>{
        cy.logout()
    })


    it('TC1 - All elements exist in dashboard page',()=>{
        cy.login(adminUsername, adminPassword)
        cy.contains('PIM').should('be.visible');
        cy.contains('Leave').should('be.visible');
        cy.contains('Time').should('be.visible');
        cy.contains('Directory').should('be.visible');
    })

    //Leave link
    it('TC2 - In Dashboard, Leave quick link works as admin',()=>{
        cy.login(adminUsername, adminPassword)
        cy.contains('Leave').should('be.visible');
        cy.get('.oxd-main-menu-item-wrapper').eq(2).click()
        cy.url().should('include','/leave/viewLeaveList')

    })

    it('TC3 - In Dashboard, Leave quick link works as normal user',()=>{
        cy.login(normalUserUsername, normalUserPassword)
        cy.contains('Leave').should('be.visible');
        cy.get('.oxd-main-menu-item-wrapper').eq(0).click()
        cy.url().should('include','/leave/')
    })

    //PIM link
    it('TC4 - In Dashboard, PIM quick link works as admin',()=>{
        cy.login(adminUsername, adminPassword)
        cy.contains('PIM').should('be.visible');
        cy.get('.oxd-main-menu-item-wrapper').eq(1).click()
        cy.url().should('include','/pim/viewEmployeeList')

    })

    //Time
    it('TC5 - In Dashboard, Time quick link works as admin',()=>{
        cy.login(adminUsername, adminPassword)
        cy.contains('Time').should('be.visible');
        cy.get('.oxd-main-menu-item-wrapper').eq(3).click()
        cy.url().should('include','/time/viewEmployeeTimesheet')
    })

    it('TC6 - In Dashboard, Time quick link works as normal user',()=>{
        cy.login(normalUserUsername, normalUserPassword)
        cy.contains('Time').should('be.visible');
        cy.get('.oxd-main-menu-item-wrapper').eq(1).click()
        cy.url().should('include','/time/')
        
    })

    //Directory
    it('TC7 - In Dashboard, Directory quick link works as admin',()=>{
        cy.login(adminUsername, adminPassword)
        cy.contains('Directory').should('be.visible');
        cy.get('.oxd-main-menu-item-wrapper').eq(8).click()
        cy.url().should('include','directory/viewDirectory')
    })

    it('TC8 - In Dashboard, Directory quick link works as normal user',()=>{
        cy.login(normalUserUsername, normalUserPassword)
        cy.contains('Directory').should('be.visible');
        cy.get('.oxd-main-menu-item-wrapper').eq(5).click()
        cy.url().should('include','directory/viewDirectory')
    })


    it('TC9 - As normal user, all elements exist on dashboard',()=>{
        cy.login(normalUserUsername, normalUserPassword)

        cy.contains('PIM').should('not.exist');
        cy.contains('Leave').should('be.visible');
        cy.contains('Time').should('be.visible');
        cy.contains('Directory').should('be.visible');
    })

    it('TC10 - Welcome message for all users', ()=>{
        cy.login(adminUsername, adminPassword)
        cy.contains('Welcome').should('be.visible')

        cy.logout()
        cy.login(normalUserUsername, normalUserPassword)
        cy.contains('Welcome').should('be.visible')
    })

})
