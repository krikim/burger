import '@4tw/cypress-drag-drop'
import { ingredients } from '../fixtures/ingr.json'


describe('Create space burger', () => {

    beforeEach(() => {
        cy.visit('http://localhost:5173')
        cy.intercept("GET", "api/ingredients", { fixture: "ingr.json" })
        cy.get('div[class^=_itemIngredient]').as('ingredients')
        cy.get('@ingredients').eq(1).as('bun')
        cy.get('@ingredients').eq(4).as('sauce')
        cy.get('@ingredients').last().as('main')
    })

    it('Create burger in constructor', () => {

        cy.get('div[class^=_scrollbox]').eq(1).as('target')
        cy.get('@bun').drag('@target')
        //cy.get('@main').drag('@target')
        //cy.get('@sauce').drag('@target')

        cy.get('div[class^=constructor-element]').as('constructItems')
        cy.get('@constructItems').should('have.length', 2)
        cy.get('div[class^=constructor-element]')
            .first()
            .contains('верх')

        cy.get('div[class^=constructor-element]')
            .last()
            .contains('низ')

        cy.get('button').contains('Оформить заказ').click()


        cy.get('input[name=emailLogin]').type(`${"krikim@mail.ru"}`)
        cy.get('input[name=emailPass]').type(`${"1"}`)
        cy.get('Button').click()
        cy.intercept("POST", "api/auth/login", { fixture: "singin.json" })
        cy.wait(30000)
        cy.get('p[class^=orderdetail]').contains('Ваш заказ начали готовить')
        
    })

})