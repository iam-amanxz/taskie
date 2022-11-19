describe('sign in', () => {
  it('renders sign in page', () => {
    cy.visit('/auth/sign-in')
    cy.get('h2').should('have.text', 'Sign In')
    cy.get('label').eq(0).should('contain.text', 'Email')
    cy.get('label').eq(1).should('contain.text', 'Password')
    cy.get('input[placeholder*="Enter email"]').should('be.visible')
    cy.get('input[placeholder*="Enter password"]').should('be.visible')
    cy.contains('Button', /Login/).should('be.visible')
    cy.contains('p', /Don't have an account/).should('be.visible')
  })

  it('shows validation error when empty email', () => {
    cy.visit('/auth/sign-in')
    cy.get('input').eq(1).click().type('123456')
    cy.contains('Button', /Login/).click()

    expect(cy.contains(/Email is required/))
  })

  it('shows validation error when empty password', () => {
    cy.visit('/auth/sign-in')
    cy.get('input').eq(0).click().type('some@mail.com')
    cy.contains('Button', /Login/).click()

    expect(cy.contains(/Password is required/))
  })

  it('signs in', async () => {
    const user = {
      name: 'aman',
      email: 'testuser@Taskie.com',
      password: 'test123#',
      secretKey: Cypress.env('ADMIN_SECRET'),
    }
    // delete user
    cy.request({
      method: 'DELETE',
      url: Cypress.env('ABI_BASE') + '/admin/users/' + user.email,
      body: { secretKey: Cypress.env('ADMIN_SECRET') },
    }).then((_) => {
      // create user
      cy.request({
        method: 'POST',
        url: Cypress.env('ABI_BASE') + '/admin/users',
        body: { ...user },
      }).then((_) => {
        cy.visit('/auth/sign-in')
        cy.get('input').eq(0).click().type(user.email)
        cy.get('input').eq(1).click().type(user.password)
        cy.contains('button', /Login/i).click()

        expect(cy.contains(/You have 0 tasks/))
        expect(cy.contains(/Login Successfull/))
      })
    })
  })
})

export {}
