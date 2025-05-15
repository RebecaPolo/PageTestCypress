
describe('Testing for dashboard page',()=>{

    //declarations
    const admin = { username: 'Admin', password: 'admin123' }
    const user = { username: 'rebecapolo', password: 'rebeca123' }
    
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

    //functions
    const goToMenuItem = (label, index) => {
        cy.contains(label).should('be.visible')
        cy.get('.oxd-main-menu-item-wrapper').eq(index).click()
    }

    //Hooks
    afterEach(()=>{
        cy.logout()
    })

    context('Admin user test',()=>{
        beforeEach(()=>{
            cy.login(admin.username, admin.password)
        })

        it('TC1 - All elements exist in dashboard page', () => {
            ['PIM', 'Leave', 'Time', 'Directory'].forEach(item => {
                cy.contains(item).should('be.visible')
            })
        })

        it('TC2 - Leave quick link works', () => {
            goToMenuItem('Leave', menuItems.admin.Leave)
            cy.url().should('include', '/leave/viewLeaveList')
        })

        it('TC3 - PIM quick link works', () => {
            goToMenuItem('PIM', menuItems.admin.PIM)
            cy.url().should('include', '/pim/viewEmployeeList')
        })

        it('TC4 - Time quick link works', () => {
            goToMenuItem('Time', menuItems.admin.Time)
            cy.url().should('include', '/time/viewEmployeeTimesheet')
        })

        it('TC5 - Directory quick link works', () => {
            goToMenuItem('Directory', menuItems.admin.Directory)
            cy.url().should('include', 'directory/viewDirectory')
        })

        it('TC6 - Welcome message appears', () => {
            cy.contains('Welcome').should('be.visible')
        })
    })

    context('Normal user tests', () => {
        beforeEach(() => {
            cy.login(user.username, user.password)
        })

        it('TC7 - Leave quick link works', () => {
            goToMenuItem('Leave', menuItems.user.Leave)
            cy.url().should('include', '/leave/')
        })

        it('TC8 - Time quick link works', () => {
            goToMenuItem('Time', menuItems.user.Time)
            cy.url().should('include', '/time/')
        })

        it('TC9 - Directory quick link works', () => {
            goToMenuItem('Directory', menuItems.user.Directory)
            cy.url().should('include', 'directory/viewDirectory')
        })

        it('TC10 - Only allowed elements exist', () => {
            cy.contains('PIM').should('not.exist')
            cy.contains('Leave').should('be.visible')
            cy.contains('Time').should('be.visible')
            cy.contains('Directory').should('be.visible')
        })

        it('TC11 - Welcome message appears', () => {
            cy.contains('Welcome').should('be.visible')
        })
    })

   
})
