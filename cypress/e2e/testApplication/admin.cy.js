
import AdminPage from "../../pages/AdminPage"

describe('Admin page testing',()=>{

    const admin = Cypress.env('admin')
    const adminPage = new AdminPage()

    beforeEach(()=>{
        cy.login(admin.username, admin.password)
        
    })

    afterEach(()=>{
        cy.logout()
    })
    

    it('TC1 - All fields completed and new user added',()=>{
        cy.visit('/admin/saveSystemUser')
        adminPage.selectAddUserRole('ESS')
        adminPage.editAddUserName('tester')
        adminPage.selectAddUserStatus('Enabled')
        adminPage.editAddUserUsername('rebecapolocoser')
        adminPage.editAddUserPassword('rebeca123')
        adminPage.editAddUserConfirmPass('rebeca123')
        adminPage.clickAddUserSaveButton()

    })

})