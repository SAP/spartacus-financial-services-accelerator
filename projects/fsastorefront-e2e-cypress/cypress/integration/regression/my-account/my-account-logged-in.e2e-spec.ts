import * as registerHelpers from '../../../helpers/register';
import {
  accessApplicationsPage,
  checkApplicationTitle,
  checkNumberOfApplications,
} from '../../../helpers/my-account/applications';
import {
  checkPoliciesTitle,
  accessPoliciesPage,
  checkNumberOfPolicies,
} from '../../../helpers/my-account/policies';
import {
  checkClaimsTitle,
  accessClaimsPage,
  checkNumberOfClaims,
} from '../../../helpers/my-account/claims';
import {
  accessPaymentDetailsPage,
  checkPaymentDetailsTitle,
  checkPaymentMethod,
  shouldHaveCardNumber,
} from '../../../helpers/my-account/payment-details';
import { cardShouldContain } from '../../../helpers/my-account/cards';
import { donaMooreUser } from '../../../sample-data/users';

context('Register', () => {
  before(() => {
    cy.window().then(win => win.sessionStorage.clear());
    cy.visit('/');
  });

  it('should be able to se my account area', () => {
    cy.visit('/login');
    registerHelpers.login(donaMooreUser.name, donaMooreUser.password);
    cy.wait(2000);
    accessApplicationsPage();
    checkApplicationTitle();
    checkNumberOfApplications(2);
    cardShouldContain('Event Insurance');
    cardShouldContain('Travel Insurance');
    accessPoliciesPage();
    checkPoliciesTitle();
    checkNumberOfPolicies(2);
    cardShouldContain('Auto Insurance');
    cardShouldContain('Travel Insurance');
    accessClaimsPage();
    checkClaimsTitle();
    checkNumberOfClaims(2);
    cardShouldContain('CL00000001');
    cardShouldContain('CL00000000');
    accessPaymentDetailsPage();
    checkPaymentDetailsTitle();
    checkPaymentMethod();
    shouldHaveCardNumber('************1111');
  });
});
