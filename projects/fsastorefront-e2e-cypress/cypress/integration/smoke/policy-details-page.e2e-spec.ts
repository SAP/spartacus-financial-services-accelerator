import { policyDetailsAccordions } from "../../sample-data/sample-data";

context('Policy Details Page', () => {
    before(() => {
        cy.visit('/my-account/my-policies/00000001/00000001');
        cy.get('cx-login-form form').should('be.visible');
        cy.get('cx-login-form form').within(() => {
            cy.get('[formcontrolname="userId"]')
                .clear()
                .type('donna@moore.com');
            cy.get('[formcontrolname="password"]')
                .clear()
                .type('123456');
            cy.get('button[type=submit]').click();
        });
    });

    it('Should render policy details ', () => {
        cy.get('fsa-policy-details').should('be.visible');
    });


    it('Should have 6 accordions with correct titles and first one opened', () => {
        cy.get('fsa-accordion-item').should('have.length', policyDetailsAccordions.length);

        cy.get('fsa-accordion-item').eq(0).should('have.attr', 'ng-reflect-opened', 'true');

        cy.get('fsa-accordion-item').each((item, index, list) => {
            cy.get('fsa-accordion-item').eq(index).should('have.attr', 'ng-reflect-title', policyDetailsAccordions[index].title);
        });
    });

    it('Should have correct data in all accordions', () => {

        cy.get('fsa-accordion-item').each((item, index, list) => {
            cy.get('fsa-accordion-item').eq(index).within(() => {
                cy.get('li').should('have.length', policyDetailsAccordions[index].items.length);

                cy.get('li').each((item1, index1, list1) => {
                    cy.get('li').eq(index1).within(() => {
                        cy.get('.item-label').should('have.text', policyDetailsAccordions[index].items[index1].label);
                        cy.get('.value').should('have.text', policyDetailsAccordions[index].items[index1].value);
                    });
                });
            });
        });
    });


})