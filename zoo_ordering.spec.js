context('ZooZebra', () => {
    beforeEach(() => {
      cy.visit('https://zoo-zebra.ru/')
    })
  //открыть каталог, фильтры, сортировка, пейджинг, сетка, добавить два в сравнение, перейти в сравнение, 
  //добавить один в корзину, перейти в корзину, изменить число товаров, ввести данные для заказа 
   
    it('Ordering', () => {
      
      cy.get('.categorywall a[href="https://zoo-zebra.ru/tovary-dlya-sobak/korm-dlya-sobak/"]')
        .should('have.text','Корм для собак')
        .click()

      cy.get('#manufacturer_11[type="checkbox"]').not('[disabled]')
        .check().should('be.checked')
        cy.wait(2000)
      cy.get('#attribute_value_222[type="checkbox"]').not('[disabled]')
        .check().should('be.checked')
        cy.wait(2000)
      cy.get('#attribute_value_210[type="checkbox"]').not('[disabled]')
        .check().should('be.checked')
        cy.wait(2000)
      cy.get('#attribute_value_274[type="checkbox"]').not('[disabled]')
        .check().should('be.checked')
        cy.wait(2000)
      cy.get('#attribute_value_351[type="checkbox"]').not('[disabled]')
        .check().should('be.checked')
        cy.wait(2000)
      cy.get('.results')
        .should('have.text','Показано с 1 по 10 из 10 (страниц: 1)')

      cy.get('.sort select') 
        .select('Наименование (А -> Я)')
        cy.url().should('include', 'sort=pd.name&order=ASC')

      // cy.get('.limit select', { timeout: 10000 }) 
      //   .select('50')
        
      cy.get('.display .notselect[onclick="display(\'grid\');"]', { timeout: 10000 })
        .should('have.text', 'Сетка')
        .click()
        cy.wait(1000)
      
      cy.get('a[onclick="addToCompare(\'15341\');"]') 
        .click()
      cy.get('.success')
        .should('be.visible')
        cy.wait(1000)
      cy.get('.success .close')
        .click()

      cy.get('a[onclick="addToCompare(\'23130\');"]') 
        .click()
      cy.get('.success')
        .should('be.visible')
        cy.wait(1000)
      cy.get('.success .close')
        .click()

      cy.get('.menu_name') 
        .click()
      cy.get('#compare-total') 
        .click()
      cy.url().should('include', 'compare-products')

      cy.get('.item-count')
        .should('have.text','0')
      cy.get('a[onclick="addToCart(\'15341\');"]') 
        .click()
      cy.get('.item-count')
        .should('have.text','1')

      cy.get('#bottom-checkout')
        .click()
      cy.url().should('include', 'simplecheckout')
      cy.get('.simplecheckout-cart .model')
        .should('contain','15341-06')

      cy.get('.quantity [type="text"]') 
        .should('have.value','1')
      cy.get('[data-onclick="increaseProductQuantity"]')
        .click()
        cy.wait(1000)
      cy.get('.quantity [type="text"]') 
        .should('have.value','2')
      cy.get('#total_total .simplecheckout-cart-total-value') 
        .should('have.text','2 496 р.')

      cy.get('#customer_telephone')
        .type('79154857921').should('have.value', '79154857921')

      cy.get('#customer_register[value="0"]')        
        .should('be.checked')

      cy.get('#card')
        .should('not.be.checked')
        .click()
        .should('be.checked')
        cy.wait(2000)

      cy.get('.simplecheckout-table-form-right [value="Нижнекамск"]').should('have.id', 'shipping_address_city')
        .click()
        cy.wait(3000)

      cy.get('#sheduler_1_shedulerk .code [type="radio"]').should('be.checked')
        cy.wait(2000)

      cy.get('#shipping_address_poseloc', { timeout: 10000 })
        .type('Нижнекамск').should('have.value', 'Нижнекамск')
        .type('{enter}')
        cy.wait(2000)
           
      cy.get('#shipping_address_ylica', { timeout: 10000 })
        .click()
        .type('Студенческая{enter}').should('have.value', 'Студенческая')
        cy.wait(2000)

      cy.get('#shipping_address_dom')
        .type('1{enter}').should('have.value', '1')

      cy.get('#shipping_address_kvartira')
        .type('2{enter}').should('have.value', '2')
      
      cy.get('#payment_address_call_me[value="1"]').should('not.be.checked')
        .click()
        .should('be.checked')  
      })
  })