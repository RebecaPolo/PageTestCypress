
describe('Testing PIM module components',()=>{
    
    var adminUsername = 'Admin'
    var adminPassword = 'admin123'
    
    beforeEach(()=>{
        cy.login(adminUsername, adminPassword)
        cy.visit('/pim/addEmployee')

    })

    afterEach(()=>{
        cy.logout()
    })

    it('TC1 - Add button works correctly',()=>{
        cy.visit('/pim/viewEmployeeList')
        cy.get('button.oxd-button--secondary').eq(1).click()
        
    })

    it('TC2 - Add an employee with all fields filled correctly',()=>{
        cy.get('input[name="firstName"]').type('rebeca')
        cy.get('input[name="middleName"]').type('mihaela')
        cy.get('input[name="lastName"]').type('Polo')

        cy.get('input[class="oxd-input oxd-input--active"]').eq(4).should('have.value').and('not.be.empty')

    })
})