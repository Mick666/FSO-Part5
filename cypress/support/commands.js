Cypress.Commands.add('login', ({ username, password }) => {
    cy.request('POST', 'http://localhost:3001/api/login', {
        username, password
    }).then(({ body }) => {
        localStorage.setItem('loggedBlogappUser', JSON.stringify(body))
        cy.visit('http://localhost:3000')
    })
})

Cypress.Commands.add('createBlog', ({ author, title, url, likes = 0 }) => {
    // if (!likes) likes = 0
    cy.request({
        url: 'http://localhost:3001/api/blogs',
        method: 'POST',
        body: { author, title, url, likes },
        headers: {
            'Authorization': `bearer ${JSON.parse(localStorage.getItem('loggedBlogappUser')).token}`
        }
    })

    cy.visit('http://localhost:3000')
})