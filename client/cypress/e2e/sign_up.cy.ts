describe('sign up', () => {
  it('renders sign up page', () => {
    cy.visit('/auth/sign-up')
    cy.get('h2').should('have.text', 'Sign Up')
    cy.get('label').eq(0).should('contain.text', 'Name')
    cy.get('label').eq(1).should('contain.text', 'Email')
    cy.get('label').eq(2).should('contain.text', 'Password')
    cy.get('input[placeholder*="Enter name"]').should('be.visible')
    cy.get('input[placeholder*="Enter email"]').should('be.visible')
    cy.get('input[placeholder*="Enter password"]').should('be.visible')
    cy.contains('Button', /Create Account/).should('be.visible')
    cy.contains('p', /Already have an account/).should('be.visible')
  })

  it('shows validation error when empty name', () => {
    cy.visit('/auth/sign-up')
    cy.get('input').eq(1).click().type('mail@mail.com')
    cy.get('input').eq(2).click().type('123456')
    cy.contains('Button', /Create Account/).click()

    expect(cy.contains(/Name is required/))
  })

  it('shows validation error when empty email or invalid email', () => {
    cy.visit('/auth/sign-up')
    cy.get('input').eq(0).click().type('Name')
    cy.get('input').eq(2).click().type('123456')
    cy.contains('Button', /Create Account/).click()

    expect(cy.contains(/Email is required/))

    cy.get('input').eq(1).click().type('asd')
    cy.contains('Button', /Create Account/).click()
    expect(cy.contains(/Email must be valid/))
  })

  it('shows validation error when empty password', () => {
    cy.visit('/auth/sign-up')
    cy.get('input').eq(0).click().type('Name')
    cy.get('input').eq(1).click().type('mail@mail.com')
    cy.contains('Button', /Create Account/).click()

    expect(cy.contains(/Password is required/))
  })

  it('signs up', () => {
    const user = {
      name: 'Test User',
      email: 'testuser1@Taskie.com',
      password: 'test123#',
      secretKey: Cypress.env('ADMIN_SECRET'),
    }

    cy.request({
      method: 'DELETE',
      url: Cypress.env('ABI_BASE') + '/admin/users/' + user.email,
      body: { secretKey: Cypress.env('ADMIN_SECRET') },
      failOnStatusCode: false,
    }).then((res) => {
      console.log(res)
      cy.visit('/auth/sign-up')
      cy.get('input').eq(0).click().type(user.name)
      cy.get('input').eq(1).click().type(user.email)
      cy.get('input').eq(2).click().type(user.password)
      cy.contains('button', /Create Account/i).click()

      expect(cy.contains(/You have 0 tasks/))
      cy.get('h2').should('contain.text', user.name)
    })
  })
})

export {}
