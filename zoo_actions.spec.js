context('ZooZebra_actions', () => {
    beforeEach(() => {
      cy.visit('https://zoo-zebra.ru/')
    })
  
    it('Add to Cart, WishList, Compare', () => {
      // добавление в корзину
      cy.get('.categorywall a[href="https://zoo-zebra.ru/tovary-dlya-koshek/korm-dlya-koshek/"]')
        .should('have.text','Корм для кошек')
        .click()
      
      cy.get('.item-count')
        .should('have.text','0')
      cy.get('a[onclick="addToCart(\'17377\');"]') 
        .click()
      cy.get('.item-count')
        .should('have.text','1')
      
        // добавление в избранное      
      cy.get('a[onclick="addToWishList(\'17341\');"]') 
        .click()
      cy.get('.success')
        .should('be.visible')
        cy.wait(1000)
      cy.get('.success .close').click()
      
      // добавление в сравнение
      cy.get('a[onclick="addToCompare(\'17388\');"]') 
        .click()
      cy.get('.success')
        .should('be.visible')
        cy.wait(1000)
      cy.get('.success .close').click()
      //переход в сравнение
      cy.get('.menu_name') 
        .click()
      cy.get('#compare-total') 
        .click()
      cy.url().should('include', 'compare-products')

      //проверить число в сравнении и избранном?
      
    })
    
    //фильтры
    it('Check', () => {
      cy.get('.categorywall a[href="https://zoo-zebra.ru/tovary-dlya-koshek/korm-dlya-koshek/"]')
        .should('have.text','Корм для кошек')
        .click()
      
      cy.get('#attribute_value_222[type="checkbox"]').not('[disabled]')
        .check().should('be.checked')
      cy.get('#attribute_value_212[type="checkbox"]').not('[disabled]')
        .check().should('be.checked')
    })

    //сортировка
    it('Sorting', () => {
      cy.get('.categorywall a[href="https://zoo-zebra.ru/tovary-dlya-sobak/zaschita-ot-bloh-i-kleschei-sobaki/"]')
        .should('have.text','Защита от блох и клещей')
        .click()
      
      cy.get('.sort select') 
        .select('Цена (по возрастанию)')
        cy.url().should('include', 'sort=p.price&order=ASC')
    })

    //количество отображения на странице и в виде сетки
    it('Paging & Grid', () => {
      cy.get('.categorywall a[href="https://zoo-zebra.ru/tovary-dlya-rib/korm-dlya-ryb/"]')
        .should('have.text','Корм для рыб')
        .click()
      
      cy.get('.limit select') 
        .select('50')
      
        cy.get('.display .notselect').should('have.text', 'Сетка')
        .click()
        
        cy.get('a[onclick="display(\'list\');"]').should('have.class', 'notselect')
        cy.get('.pagination .results').should('contain', 'Показано с 1 по 50')
    })

    //переход на страницу товара
    it('Product selection', () => {
      cy.get('.categorywall a[href="https://zoo-zebra.ru/tovary-dlya-gryzunov/kosmetika-i-gigiena/"]')
        .should('have.text','Косметика и гигиена')
        .click()
      cy.get('.product-list .name a[href="https://zoo-zebra.ru/tovary-dlya-sobak/gigiena-kosmetika/46924"]').then(($url)=>{ 
          const newUrl = Cypress.$($url).attr('href'); 
          console.log(newUrl);
          if (undefined !== newUrl) {
            cy.visit(newUrl);
         }
    })
      cy.url().should('include', 'gigiena-kosmetika/46924')
    })

    it('Search', () => {
      cy.get('.top-mobile-search')
        .type('bozita').should('have.value', 'bozita')
        .type('{enter}')
        cy.url().should('include', 'search=bozita')
      
    })

    //переход в корзину
    it('Go to Cart', () => {
      cy.get('.categorywall a[href="https://zoo-zebra.ru/tovary-dlya-reptiliy/korm-dlya-reptiliy/"]')
        .should('have.text','Корм для рептилий')
        .click()
      cy.get('.item-count')
        .should('have.text','0')
      cy.get('a[onclick="addToCart(\'46328\');"]') 
        .click()
      cy.get('.item-count')
        .should('have.text','1')
      cy.get('#bottom-checkout')
        .click()
      cy.url().should('include', 'simplecheckout')
      cy.get('.simplecheckout-cart .model')
        .should('contain','46328-08')

    })

  })