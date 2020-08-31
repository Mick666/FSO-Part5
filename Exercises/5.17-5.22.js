describe('Blog app', function () {
    beforeEach(function () {
        cy.request('POST', 'http://localhost:3001/api/testing/reset')
        const user = {
            name: 'Testing user',
            username: 'Tester',
            password: 'password'
        }

        cy.request('POST', 'http://localhost:3001/api/users', user)

        cy.visit('http://localhost:3000')
    })

    xit('front page can be opened', function () {
        cy.contains('Please log in')
    })

    xit('login form can be opened', function () {
        cy.contains('login').click()
    })

    xit('Login fails with the wrong password', function () {
        cy.contains('login').click()
        cy.get('#username').type('Tester')
        cy.get('#password').type('wrong')
        cy.get('#loginButton').click()

        cy.get('.error').contains('Wrong credentials')
    })

    xit('user can login', function () {
        cy.contains('login').click()
        cy.get('#username').type('Tester')
        cy.get('#password').type('password')
        cy.get('#loginButton').click()

        cy.contains('Tester logged in')
    })

    describe('when logged in', function () {
        beforeEach(function () {
            cy.request('POST', 'http://localhost:3001/api/testing/reset')

            const user = {
                name: 'Testing user',
                username: 'Tester',
                password: 'password'
            }

            cy.request('POST', 'http://localhost:3001/api/users', user)

            cy.login({ username: 'Tester', password: 'password' })

        })

        xit('a new blog can be created', function () {
            cy.contains('New blog').click()
            cy.get('#title').type('A functional title')
            cy.get('#author').type('A functional author')
            cy.get('#url').type('url.com.au')
            cy.contains('Save').click()

            cy.contains('New blog A functional title by A functional author added')
        })

        xit('user can like a blog', function () {
            cy.createBlog({
                author: 'A functional author',
                title: 'A functional title',
                url: 'url.com.au'
            })

            cy.contains('A functional title by A functional author')
                .contains('View').click()

            cy.contains('Url: url.com.au')
                .contains('Like').click()


            cy.contains('Likes: 1')
        })


        xit('user can remove a blog if they created it', function () {
            cy.createBlog({
                author: 'A functional author',
                title: 'A functional title',
                url: 'url.com.au'
            })

            cy.contains('A functional title by A functional author')
                .contains('View').click()

            cy.contains('Url: url.com.au')
                .contains('Remove').click()


            cy.get('html').should('not.contain', 'A functional title by A functional author')
        })

        it('Blogs are sorted by likes', function () {
            cy.createBlog({
                author: 'A functional author',
                title: 'A functional title',
                url: 'url.com.au',
                likes: 3
            })

            cy.createBlog({
                author: 'Blog #2',
                title: 'Blog #2',
                url: 'url.com.au',
                likes: 4
            })

            cy.createBlog({
                author: 'Blog #3',
                title: 'Blog #3',
                url: 'url.com.au',
                likes: 5
            })

            cy.get('.blogStyle').eq(1).should('contain', 'Blog #2 by Blog #2')
            cy.get('.blogStyle').eq(0).should('contain', 'Blog #3 by Blog #3')
            cy.get('.blogStyle').eq(2).should('contain', 'A functional title by A functional author')
        })
    })
})