
describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user1 = {
      name: 'Matti Luukkainen',
      username: 'mluukkai',
      password: 'salainen'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user1)

    const user2 = {
        name:'Jackie Chan',
        username:'jackie_chan',
        password:'chanchan'
    }

     cy.request('POST', 'http://localhost:3003/api/users/', user2)
    
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.contains('Log in to application')
    cy.contains('username')
    cy.contains('password')
    cy.contains('login')
  })

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
        cy.get('input:first').type('jackie_chan')
        cy.get('input:last').type('chanchan')
        cy.contains('login').click()

        cy.contains('Jackie Chan logged in')
    })

    it('fails with wrong credentials', function() {
      cy.get('input:first').type('jackie_chan')
        cy.get('input:last').type('chan')
        cy.contains('login').click()

        cy.contains('invalid username or password')
        .and('have.css', 'border-style', 'solid')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
    })
  })
})