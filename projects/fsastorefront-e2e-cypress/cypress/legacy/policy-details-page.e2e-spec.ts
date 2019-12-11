import * as register from '../helpers/register';
import { sampleTripPolicyData } from '../sample-data/policies';
import { donnaMooreUser } from '../sample-data/users';
import { POLICIES_PAGE } from '../helpers/my-account/policies';

export const ACCORDION_ITEM = 'fsa-accordion-item';

context('Policy Details Page', () => {
  before(() => {
    register.login(donnaMooreUser.email, donnaMooreUser.password);
    cy.wait(1000);
    cy.visit(
      POLICIES_PAGE +
        sampleTripPolicyData.policyNumber +
        '/' +
        sampleTripPolicyData.contractId
    );
  });

  it('Should render policy details ', () => {
    cy.get('fsa-policy-details').should('be.visible');
  });

  it('Should have 5 accordions with correct titles and first one opened', () => {
    cy.get(ACCORDION_ITEM).should(
      'have.length',
      sampleTripPolicyData.policyDetails.length
    );

    cy.get(ACCORDION_ITEM)
      .eq(0)
      .within(() => {
        cy.get('.active').should('exist');
      });

    cy.get(ACCORDION_ITEM).each((item, index, list) => {
      cy.get(ACCORDION_ITEM)
        .eq(index)
        .within(() => {
          cy.get('.accordion-heading').should(
            'have.text',
            sampleTripPolicyData.policyDetails[index].title
          );
        });
    });
  });

  it('Should have correct data in all accordions', () => {
    cy.get(ACCORDION_ITEM).each((item, index, list) => {
      cy.get(ACCORDION_ITEM)
        .eq(index)
        .within(() => {
          cy.get('li').should(
            'have.length',
            sampleTripPolicyData.policyDetails[index].items.length
          );

          cy.get('li').each((listItem, listIndex, listElements) => {
            cy.get('li')
              .eq(listIndex)
              .within(() => {
                cy.get('.item-label').should(
                  'have.text',
                  sampleTripPolicyData.policyDetails[index].items[listIndex]
                    .label
                );
                cy.get('.value').should(
                  'have.text',
                  sampleTripPolicyData.policyDetails[index].items[listIndex]
                    .value
                );
              });
          });
        });
    });
  });
});
