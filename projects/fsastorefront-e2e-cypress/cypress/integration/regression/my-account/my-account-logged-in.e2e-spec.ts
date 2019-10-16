import * as registerHelpers from '../../../helpers/register';
import {
  accessApplicationsPage,
  checkApplicationTitle,
} from '../../../helpers/my-account/applications';
import {
  checkPoliciesTitle,
  accessPoliciesPage,
} from '../../../helpers/my-account/policies';
import {
  checkClaimsTitle,
  accessClaimsPage,
} from '../../../helpers/my-account/claims';
import {
  accessPaymentDetailsPage,
  checkPaymentDetailsTitle,
  checkPaymentMethod,
  shouldHaveCardNumber,
} from '../../../helpers/my-account/payment-details';
import {
  cardShouldContain,
  checkNumberOfCards,
} from '../../../helpers/my-account/cards';
import { donnaMooreUser } from '../../../sample-data/users';

context('Register', () => {
  before(() => {
    cy.window().then(win => win.sessionStorage.clear());
    cy.visit('/');
  });

  it('should check my accout pages', () => {
    cy.visit('/login');
    registerHelpers.login(donnaMooreUser.email, donnaMooreUser.password);
    cy.wait(2000);
    accessApplicationsPage();
    checkApplicationTitle();
    checkNumberOfCards(2);
    cardShouldContain('Event Insurance');
    cardShouldContain('Travel Insurance');
    accessPoliciesPage();
    checkPoliciesTitle();
    checkNumberOfCards(2);
    cardShouldContain('Auto Insurance');
    cardShouldContain('Travel Insurance');
    accessClaimsPage();
    checkClaimsTitle();
    checkNumberOfCards(2);
    cardShouldContain('CL00000001');
    cardShouldContain('CL00000000');
    accessPaymentDetailsPage();
    checkPaymentDetailsTitle();
    checkPaymentMethod();
    shouldHaveCardNumber('************1111');
  });
});
