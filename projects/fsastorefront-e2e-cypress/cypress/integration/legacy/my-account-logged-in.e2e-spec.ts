import * as registerHelpers from '../../helpers/register';
import {
  accessApplicationsPage,
  checkApplicationTitle,
} from '../../helpers/my-account/applications';
import {
  checkPoliciesTitle,
  accessPoliciesPage,
} from '../../helpers/my-account/policies';
import {
  checkClaimsTitle,
  accessClaimsPage,
} from '../../helpers/my-account/claims';
import {
  accessPaymentDetailsPage,
  checkPaymentDetailsTitle,
  checkPaymentMethod,
  shouldHaveCardNumber,
} from '../../helpers/my-account/payment-details';
import { cardShouldContain } from '../../helpers/my-account/cards';
import { donnaMooreUser } from '../../sample-data/users';

context('My Account', () => {
  before(() => {
    cy.window().then(win => win.sessionStorage.clear());
    cy.visit('/');
  });

  it('should check my account pages', () => {
    registerHelpers.login(donnaMooreUser.email, donnaMooreUser.password);
    cy.wait(2000);
    accessApplicationsPage();
    checkApplicationTitle();
    cardShouldContain('Event Insurance');
    cardShouldContain('Travel Insurance');
    accessPoliciesPage();
    checkPoliciesTitle();
    cardShouldContain('Auto Insurance');
    cardShouldContain('Travel Insurance');
    accessClaimsPage();
    checkClaimsTitle();
    cardShouldContain('CL00000001');
    cardShouldContain('CL00000000');
    accessPaymentDetailsPage();
    checkPaymentDetailsTitle();
    checkPaymentMethod();
    shouldHaveCardNumber('************1111');
  });
});
