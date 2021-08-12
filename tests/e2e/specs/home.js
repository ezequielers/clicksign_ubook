describe('The Home page', () => {
  const contact = [
    {
      name: 'Ezequiel Schneider',
      email: 'eequielrs@gmail.com',
      phone: '(51) 99809-0676'
    },
    {
      name: 'Caroline Miranda',
      email: 'camiranda@gmail.com',
      phone: '(51) 99999-9999'
    },
    {
      name: 'Marcelo Couto',
      email: 'marcelo.couto@gmail.com',
      phone: '(51) 99999-9999'
    },
    {
      name: 'Sherlock Holmes',
      email: 'holmes@gmail.com',
      phone: '(51) 99999-9999'
    }
  ]

  it('successfully loads', () => {
    cy.visit('/')
  })

  it('successfully add a first contact', () => {
    cy.get('button[name=criar-contato]').click()

    cy.get('input[name=name]').type(contact[0].name)
    cy.get('input[name=email]').type(contact[0].email)
    cy.get('input[name=phone]').type(contact[0].phone)
    cy.get('button[name=salvar-contato]').click()

    cy.get('table').children().should('have.length', 2)
    cy.get('table').find('tr').last().should('contain', contact[0].name)
    cy.get('table').find('tr').last().should('contain', contact[0].email)
    cy.get('table').find('tr').last().should('contain', contact[0].phone)
    cy.get('table').find('tr').last().should('have.class', 'new-contact')
  })

  it('successfully add a second contact', () => {
    cy.get('button[name=criar-contato]').click()

    cy.get('input[name=name]').type(contact[1].name)
    cy.get('input[name=email]').type(contact[1].email)
    cy.get('input[name=phone]').type(contact[1].phone)
    cy.get('button[name=salvar-contato]').click()

    cy.get('table').children().should('have.length', 3)
    cy.get('table').find('tr').last().should('contain', contact[1].name)
    cy.get('table').find('tr').last().should('contain', contact[1].email)
    cy.get('table').find('tr').last().should('contain', contact[1].phone)
    cy.get('table').find('tr').last().should('have.class', 'new-contact')
  })

  it('successfully add a third contact', () => {
    cy.get('button[name=criar-contato]').click()

    cy.get('input[name=name]').type(contact[2].name)
    cy.get('input[name=email]').type(contact[2].email)
    cy.get('input[name=phone]').type(contact[2].phone)
    cy.get('button[name=salvar-contato]').click()

    cy.get('table').children().should('have.length', 4)
    cy.get('table').find('tr').last().should('contain', contact[2].name)
    cy.get('table').find('tr').last().should('contain', contact[2].email)
    cy.get('table').find('tr').last().should('contain', contact[2].phone)
    cy.get('table').find('tr').last().should('have.class', 'new-contact')
  })

  it('successfully delete the second contact register', () => {
    cy.get('table').find('tr').eq(2).find('img[alt="A trash can icon"]').click()
    cy.get('button[name=deletar-contato]').click()

    cy.get('table').children().should('have.length', 3)
    cy.get('table').find('tr').not('contain', contact[1].name)
  })

  it('successfully add a new contact', () => {
    cy.get('button[name=criar-contato]').click()

    cy.get('input[name=name]').type(contact[3].name)
    cy.get('input[name=email]').type(contact[3].email)
    cy.get('input[name=phone]').type(contact[3].phone)
    cy.get('button[name=salvar-contato]').click()

    cy.get('table').children().should('have.length', 4)
    cy.get('table').find('tr').last().should('contain', contact[3].name)
    cy.get('table').find('tr').last().should('contain', contact[3].email)
    cy.get('table').find('tr').last().should('contain', contact[3].phone)
    cy.get('table').find('tr').last().should('have.class', 'new-contact')
  })

  it('successfully edit the last contact register', () => {
    cy.get('table').find('tr').last().find('img[alt="A pencil icon"]').click()

    cy.get('input[name=name]').should('value', contact[3].name)
    cy.get('input[name=email]').should('value', contact[3].email)
    cy.get('input[name=phone]').should('value', contact[3].phone)

    cy.get('input[name=name]').type('{selectall}{backspace}Mr. Holmes')
    cy.get('input[name=email]').type('{selectall}{backspace}mr.holmes@gmail.com')
    cy.get('input[name=phone]').type('{selectall}{backspace}(51) 09876-1234')

    cy.get('button[name=salvar-contato]').click()

    cy.get('table').find('tr').last().should('contain', 'Mr. Holmes')
    cy.get('table').find('tr').last().should('contain', 'mr.holmes@gmail.com')
    cy.get('table').find('tr').last().should('contain', '(51) 09876-1234')
    cy.get('table').find('tr').last().should('have.class', 'new-contact')
    cy.get('table').children().should('have.length', 4)
  })

  it('successfully search for a contact', () => {
    cy.get('input[name=search]').type(contact[0].name.substr(0, 2))
    cy.get('table').children().should('have.length', 2)
  })
})
