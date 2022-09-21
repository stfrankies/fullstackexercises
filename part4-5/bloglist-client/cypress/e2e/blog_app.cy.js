
describe('Blog app', function() {
  const blog = {
    "title": "React Patterns",
    "author": "Michael Chan",
    "url": "https://reactpatterns.com"
  }
  const user1 = {
    name: 'Matti Luukkainen',
    username: 'mluukkai',
    password: 'salainen'
  }

  const user2 = {
    name:'Jackie Chan',
    username:'jackie_chan',
    password:'chanchan'
  }

  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    
    cy.request('POST', 'http://localhost:3003/api/users/', user1)
    cy.request('POST', 'http://localhost:3003/api/users/', user2)
    
    cy.visit('http://localhost:3001')
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

  describe('When logged in', function() {
    beforeEach(function() {
        cy.get('input:first').type('jackie_chan')
        cy.get('input:last').type('chanchan')
        cy.contains('login').click()
    })

    it('A blog can be created', function() {
      cy.contains('New blog').click()
      cy.get('#title').type(blog.title)
      cy.get('#author').type(blog.author)
      cy.get('#url').type(blog.url)

      cy.get('#create').click()
      cy.contains('Close x').click()
    })
  })

  describe('Blog events', function(){
    beforeEach(function() {
      cy.get('input:first').type('jackie_chan')
      cy.get('input:last').type('chanchan')
      cy.contains('login').click()
      cy.contains('New blog').click()
      cy.get('#title').type(blog.title)
      cy.get('#author').type(blog.author)
      cy.get('#url').type(blog.url)

      cy.get('#create').click()
    })
    it('User can like blog', function(){
      cy.contains('view').click()
      cy.contains('like').click()
    })

    it('Authorized user can delete blog', function(){
      cy.contains('view').click()
      cy.contains('Remove').click()
      cy.contains('Success!')
    })
    it('Unauthorize user cannot delete blog', function(){
      cy.contains('logout').click()
      cy.get('input:first').type('mluukkai')
      cy.get('input:last').type('salainen')
      cy.contains('login').click()
      cy.contains('view').click()
      cy.contains('Remove').click()
      cy.contains('Error!')
    })
  })
})