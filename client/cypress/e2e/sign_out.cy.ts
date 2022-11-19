describe('sign out', () => {
  it('signs out', () => {
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
    }).then((_) => {
      cy.visit('/auth/sign-up')
      cy.get('input').eq(0).click().type(user.name)
      cy.get('input').eq(1).click().type(user.email)
      cy.get('input').eq(2).click().type(user.password)
      cy.contains('button', /Create Account/i).click()
      cy.get('button[aria-label="Sign out"]').click()

      expect(cy.url().should('include', '/auth/sign-in'))
    })
  })
})

export {}
