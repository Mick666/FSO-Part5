describe('Blog app', function () {
    beforeEach(function () {
        cy.visit('http://localhost:3000')
    })

    it('front page can be opened', function () {
        cy.contains('Please log in')
    })

    it('login form can be opened', function () {
        cy.contains('login').click()
    })

    it('user can login', function () {
        cy.contains('login').click()
        cy.get('#username').type('root')
        cy.get('#password').type('password')
        cy.get('#loginButton').click()

        cy.contains('root logged in')
    })

    describe('when logged in', function () {
        beforeEach(function () {
            cy.contains('login').click()
            cy.get('#username').type('root')
            cy.get('#password').type('password')
            cy.get('#loginButton').click()
        })

        it('a new blog can be created', function () {
            cy.contains('New blog').click()
            cy.get('#title').type('A functional title')
            cy.get('#author').type('A functional author')
            cy.get('#url').type('url.com.au')
            cy.contains('Save').click()

            cy.contains('New blog A functional title by A functional author added')
        })
    })
})