
describe('Testing PIM module components',()=>{
    
    var adminUsername = 'Admin'
    var adminPassword = 'admin123'
    let shouldRunAfterEach = true;

    beforeEach(()=>{
        cy.login(adminUsername, adminPassword)
        cy.visit('/pim/addEmployee')

    })

    afterEach(()=>{
        if (!shouldRunAfterEach) return;
        cy.logout()
    })

    //ADD 
    it('TC1 - Add button works correctly',()=>{
        cy.visit('/pim/viewEmployeeList')
        cy.get('button.oxd-button--secondary').eq(1).click()
        
    })

    
    it('TC2 - Add an employee with all fields filled correctly',()=>{
        const randomId = Math.floor(1000 + Math.random() * 9000);

        cy.get('input[name="firstName"]').type('rebeca')
        cy.get('input[name="middleName"]').type('mihaela')
        cy.get('input[name="lastName"]').type('Polo')
        cy.contains('label', 'Employee Id') // găsește label-ul
            .parent()                         
            .siblings('div')                 
            .find('input')                   
            .type(randomId.toString())

        cy.get('button[type="submit"]').click()

        cy.contains('Successfully Saved').should('be.visible')
    })

    it('TC3 - Validation for Last Name when adding a new user',()=>{
        const randomId = Math.floor(1000 + Math.random() * 9000);

        cy.get('input[name="firstName"]').type('rebeca')
        cy.get('input[name="middleName"]').type('test1')
        cy.contains('label', 'Employee Id') // găsește label-ul
            .parent()                         
            .siblings('div')                 
            .find('input')                   
            .type(randomId.toString())

        cy.get('button[type="submit"]').click()

        cy.get('input[name="lastName"]')
            .parent() 
            .siblings('span.oxd-input-field-error-message') // selectăm mesajul de eroare
            .should('contain.text', 'Required');
    })

    it('TC4 - Validation for First Name when adding a new user',()=>{
        const randomId = Math.floor(1000 + Math.random() * 9000);

        cy.get('input[name="middleName"]').type('test1')
        cy.get('input[name="lastName"]').type('test')
        cy.contains('label', 'Employee Id') // găsește label-ul
            .parent()                         
            .siblings('div')                 
            .find('input')                   
            .type(randomId.toString())

        cy.get('button[type="submit"]').click()

        cy.get('input[name="firstName"]')
            .parent() 
            .siblings('span.oxd-input-field-error-message') // selectăm mesajul de eroare
            .should('contain.text', 'Required');
    })

    it('TC5 - Normal user validation to add a user',()=>{
        shouldRunAfterEach = false;

        cy.logout()
        cy.login('rebecapolo','rebeca123')
        cy.visit('/pim/addEmployee',{ failOnStatusCode: false })
        cy.contains('Credential Required').should('be.visible')
    })


    it('TC6 - Validation for Emplyee Id when adding a new user',()=>{
        shouldRunAfterEach = true;
        cy.get('input[name="firstName"]').type('rebeca')
        cy.get('input[name="middleName"]').type('test1')
        cy.get('input[name="lastName"]').type('test')
        cy.contains('label', 'Employee Id') // găsește label-ul
            .parent()                         
            .siblings('div')                 
            .find('input')
            .clear()                   
            .type('0417')

        cy.get('button[type="submit"]').click()

        cy.contains('Employee Id already exists').should('be.visible')
    })

    // EDIT 
    it('TC7 - Edit a emplyee from the List',()=>{

        cy.visit('/pim/viewEmployeeList')
        cy.get('button[class="oxd-icon-button oxd-table-cell-action-space"]').eq(0).click()
        cy.get('input[name="firstName"]').type('Test')
        cy.get('button[type="submit"]').eq(1).click()
        cy.contains('Successfully Saved').should('be.visible')
    })
    
})