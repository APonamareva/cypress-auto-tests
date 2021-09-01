context('ZooZebra_cart', () => {
    beforeEach(() => {
      cy.visit('https://zoo-zebra.ru/')
    })
  
      //ввод данных в корзине
      it('Data input', () => {
      cy.get('.categorywall a[href="https://zoo-zebra.ru/tovary-dlya-reptiliy/korm-dlya-reptiliy/"]')
        .should('have.text','Корм для рептилий')
        .click()
      cy.get('a[onclick="addToCart(\'18930\');"]') 
        .click()
      cy.get('.top-cart')
        .click()
      cy.url().should('include', 'simplecheckout')

      cy.get('#customer_telephone')
        .type('79154857921').should('have.value', '79154857921')
      
      cy.get('.simplecheckout-methods-table td:first')
        .should('have.class','code')
        .click()
        cy.wait(3000)
        
      cy.get('.simplecheckout-table-form-right [value="Зеленодольск"]').should('have.id', 'shipping_address_city')
        .click()
        cy.wait(3000)

      cy.get('#sheduler_1_shedulerzel .code [type="radio"]').should('be.checked')
        cy.wait(2000)
    
      cy.get('#shipping_address_poseloc', { timeout: 10000 })
        .type('Зеленодольск').should('have.value', 'Зеленодольск')
        .type('{enter}')
        cy.wait(2000)
           
      cy.get('#shipping_address_ylica', { timeout: 10000 })
        .click()
        .type('Пушкина{enter}').should('have.value', 'Пушкина')
        cy.wait(2000)

      cy.get('#shipping_address_dom', { timeout: 5000 })
        .type('1{enter}').should('have.value', '1')
      
      cy.get('#payment_address_call_me[value="1"]').should('not.be.checked')
        .click()
        .should('be.checked')

       })

      
  })