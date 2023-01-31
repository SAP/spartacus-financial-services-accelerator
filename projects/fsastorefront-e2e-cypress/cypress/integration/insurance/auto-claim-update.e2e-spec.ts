import { registrationUser } from '../../sample-data/users';
import * as register from '../../helpers/register';
import * as auto from '../../helpers/checkout/insurance/auto';
import * as autoIntegration from '../../helpers/checkout/insurance/auto-integrations';
import * as checkout from '../../helpers/checkout/checkout-steps';
import * as myPolicies from '../../helpers/my-account/policies';
import testFilters from '../../support/filters';
import { selectPaymentMethodInvoice } from '../../helpers/checkout/insurance/payment';
import * as fnol from '../../helpers/fnol';
import { checkMyDocuments } from '../../helpers/my-account/my-account';
import * as homepage from '../../helpers/homepage';

testFilters([''], () => {
  context('Auto Bronze Checkout with claim create, delete and update', () => {
    before(() => {
      cy.visit('/');
    });

    it('Should register a new user', () => {
      register.registerUser(registrationUser);
      register.login(registrationUser.email, registrationUser.password);
      checkout.waitConsent();
    });

    it('Should try to create a claim without policy', () => {
      homepage.checkPageElements(
        'Choose a perfect product.',
        'Create long lasting benefits with our digital financial solutions.'
      );
      cy.get('cx-banner').should('be.visible').eq(2).click();
      checkout.checkPageURL(checkout.pages.noPolicyForClaimCreation);
      fnol.checkNoClaimsPage();
    });

    it('Should complete auto checkout', () => {
      checkout.startInsuranceCheckout('Auto');
      auto.populateAutoAnnuallyTesla();
      auto.populateMainDriverInfo();
      cy.get('[name=noOfDrivers]').select('0');
      checkout.clickContinueButton();
      autoIntegration.selectAutoBronze();
      auto.checkOptionalProductsBronze();
      checkout.clickContinueButton();
      checkout.checkCheckoutStep('Your Auto Insurance', '7');
      checkout.checkPersonalDetailsPage();
      auto.populatePersonalDetails();
      auto.populateVehicleDetails();
      auto.populateMainDriverData();
      checkout.clickContinueButton();
      checkout.checkCheckoutStep('Your Auto Insurance', '7');
      checkout.checkProgressBarInsurance();
      checkout.checkAccordions('generalQuoteAccordions');
      checkout.checkBackAndContinueButtons();
      checkout.clickContinueButton();
      checkout.ConfirmBindQuote();
      checkout.checkAccordions('generalQuoteAccordions');
      checkout.clickContinueButton();
      selectPaymentMethodInvoice();
      checkout.clickContinueButton();
      checkout.placeOrderOnFinalReview();
      checkout.checkOrderConfirmation();
      //waiting for replication process to be completed
      cy.wait(200000);
      myPolicies.checkMyPoliciesPage();
    });

    it('Should submit a claim - Glass Damage', () => {
      auto.clickMakeAClaim();
      autoIntegration.waitForIncidentInfoForm();
      fnol.checkFNOLCheckoutPage();
      fnol.checkFNOLSteps();
      fnol.populateIncidentInformationStep('Glass Damage');
      checkout.clickContinueButton();
      fnol.populateIncidentReportStep();
      cy.get('[name=incidentAction]').select('Repair broken glass');
      cy.get('[name=amountRequested]').type('4500');
      fnol.checkDownloadButton();
      checkout.checkBackAndContinueButtons();
      checkout.clickContinueButton();
      autoIntegration.waitForGeneralInfoForm();
      fnol.checkFNOLCheckoutPage();
      fnol.populateGeneralInformationStep();
      checkout.clickContinueButton();
      fnol.checkFNOLCheckoutPage();
      fnol.checkSummaryPage();
      cy.get('.action-button').should('contain.text', 'Back');
      cy.get('.primary-button').should('contain.text', 'Submit');
      autoIntegration.checkIncidentInformationAccordion('AutoGlassDamage');
      fnol.checkIncidentReportAccordion('5');
      fnol.checkGeneralInformationAccordion();
      cy.get('.primary-button').should('be.visible');
      cy.get('.primary-button').contains('Submit').click({ force: true });
      fnol.checkConfirmationPage();
      cy.get('.SiteLogo').should('be.visible').click();
      homepage.checkPageElements(
        'Choose a perfect product.',
        'Create long lasting benefits with our digital financial solutions.'
      );
    });

    it('Should check documents page', () => {
      checkMyDocuments('1');
      cy.get('.td-value').contains('Claim.pdf');
      checkout.checkPageURL(checkout.pages.documentsPage);
    });

    it('Should start a new claim from homepage and delete it', () => {
      cy.get('.SiteLogo').should('be.visible').click();
      fnol.startClaimFromHomepage();
      fnol.selectAutoPolicyAndStartClaim();
      autoIntegration.waitForIncidentInfoForm();
      fnol.checkFNOLCheckoutPage();
      fnol.checkFNOLSteps();
      fnol.populateIncidentInformationStep('Fire');
      checkout.clickContinueButton();
      cy.get('[name=howAccidentOccurred]').type(
        'i am not sure how accident occured '
      );
      cy.selectOptionFromMyAccount({
        dropdownItem: 'Claims',
      });
      fnol.deleteClaim();
      checkMyDocuments('1');
    });

    it('Should update existing claim', () => {
      cy.get('.SiteLogo').should('be.visible').click();
      homepage.checkPageElements(
        'Choose a perfect product.',
        'Create long lasting benefits with our digital financial solutions.'
      );
      cy.selectOptionFromMyAccount({
        dropdownItem: 'Claims',
      });
      cy.reload();
      cy.selectOptionFromMyAccount({
        dropdownItem: 'Claims',
      });
      cy.get('.heading-headline').should('be.visible').contains('Claims');
      fnol.claimAction('Add Documents');
      fnol.checkUpdateClaimPage();
      fnol.uploadNewDocument('fsaImageTest.png');
      checkMyDocuments('2');
    });

    it('Should update submitted claim', () => {
      cy.selectOptionFromMyAccount({
        dropdownItem: 'Claims',
      });
      fnol.claimAction('Details');
      fnol.checkClaimDetails();
      fnol.checkUpdateClaimPage();
      fnol.uploadNewDocument('ClaimDocument.pdf');
      checkMyDocuments('3');
    });
  });
});
