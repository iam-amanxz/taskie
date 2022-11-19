describe('tasks', () => {
  const user = {
    name: 'Task User',
    email: 'taskuser@Taskie.com',
    password: 'test123#',
  }

  it('renders tasks page', () => {
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

      expect(cy.contains(/You have 0 tasks/))
      cy.get('h2').should('contain.text', user.name)
      expect(cy.contains(/Active Tasks \(0\)/))
      expect(cy.contains(/Completed Tasks \(0\)/i))
      expect(cy.contains(/There are no active tasks./i))
      expect(cy.contains(/There are no completed tasks./i))
      expect(cy.contains(/Create a new task/i))
      cy.get('label').eq(0).should('contain.text', 'Title')
      cy.get('label').eq(1).should('contain.text', 'Due Date')
      cy.get('input[placeholder*="Enter title"]').should('be.visible')
      expect(cy.contains('button', /Create/i).should('be.disabled'))
    })
  })

  it('creates task', () => {
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

      expect(cy.contains(/You have 0 tasks/))

      const taskTitle = 'Buy Milk'
      cy.get('input').eq(0).click().type(taskTitle)
      cy.contains('button', /Create/i).click()

      expect(cy.contains(/Task created successfully/))
      cy.get('ul').eq(0).as('activeList')
      cy.get('@activeList')
        .find('li')
        .should('have.length', 1)
        .within(() => {
          expect(cy.contains(taskTitle))
        })
    })
  })

  it('delete tasks', () => {
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

      expect(cy.contains(/You have 0 tasks/))

      const taskTitle = 'Buy Milk'
      cy.get('input').eq(0).click().type(taskTitle)
      cy.contains('button', /Create/i).click()

      cy.get('ul').eq(0).as('activeList')
      cy.get('@activeList')
        .find('li')
        .within(() => {
          cy.get('button[aria-label="Actions"]').click()
          cy.contains('button', /Delete/).click()
        })

      cy.get('@activeList').find('li').should('have.length', 0)
    })
  })

  it('mark task as completed', () => {
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

      expect(cy.contains(/You have 0 tasks/))

      const taskTitle = 'Buy Milk'
      cy.get('input').eq(0).click().type(taskTitle)
      cy.contains('button', /Create/i).click()

      cy.get('ul').eq(0).as('activeList')
      cy.get('@activeList')
        .find('li')
        .within(() => {
          cy.get('button[aria-label="Actions"]').click()
          cy.contains('button', /Mark as completed/).click()
        })

      cy.get('@activeList').find('li').should('have.length', 0)
      cy.get('ul').eq(1).as('completedList')
      cy.get('@completedList').find('li').should('have.length', 1)
    })
  })

  it('mark task as active', () => {
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

      expect(cy.contains(/You have 0 tasks/))

      const taskTitle = 'Buy Milk'
      cy.get('input').eq(0).click().type(taskTitle)
      cy.contains('button', /Create/i).click()

      cy.get('ul').eq(0).as('activeList')
      cy.get('@activeList')
        .find('li')
        .within(() => {
          cy.get('button[aria-label="Actions"]').click()
          cy.contains('button', /Mark as completed/).click()
        })

      cy.get('@activeList').find('li').should('have.length', 0)
      cy.get('ul').eq(1).as('completedList')
      cy.get('@completedList').find('li').should('have.length', 1)

      cy.get('@completedList')
      .find('li')
      .within(() => {
        cy.get('button[aria-label="Actions"]').click()
        cy.contains('button', /Mark as active/).click()
      })

      cy.get('@activeList').find('li').should('have.length', 1)
      cy.get('@completedList').find('li').should('have.length', 0)

    })
  })
})

export {}
