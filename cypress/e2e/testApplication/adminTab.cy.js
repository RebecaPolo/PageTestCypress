

describe('Admin page testing',()=>{

    var adminUsername = 'Admin'
    var adminPassword = 'admin123'
    before(()=>{
        //autentificare
        cy.visit('/auth/login')
        cy.get('input[name="username"]').type(adminUsername)
        cy.get('input[name="password"]').type(adminPassword)
        cy.get('button[type="submit"]').click()

        //verificare login ok
        cy.url().should('include','/dashboard')

        //mergi la pagina administrator
        // cy.get('a[href="/web/index.php/admin/viewAdminModule"]').click()
        // cy.url().should('include','/admin/viewSystemUsers')
        // cy.get('button[type=button').click()
        // cy.url().should('include','/admin/saveSystemUser')
        cy.visit('/admin/saveSystemUser')
    })
    

    it('All fields completed and new user added',()=>{
        // get()
    })

})