import * as checkout from '../../helpers/checkout/checkout-steps';
import * as savings from '../../helpers/checkout/insurance/savings-checkout';
import { registrationUserWithoutPhone } from '../../sample-data/users';
import * as register from '../../helpers/register';
import testFilters from '../../support/filters';
import { selectPaymentMethodInvoice } from '../../helpers/checkout/insurance/payment';
import * as banking from '../../helpers/checkout/banking/checkout-banking';
import * as loan from '../../helpers/checkout/banking/loan';
import {
  checkUserIdentificationPage,
  selectUserIdentification,
} from '../../helpers/checkout/banking/user-identification';

testFilters([''], () => {
  context('Savings Insurance Checkout', () => {
    before(() => {
      cy.visit('/');
    });

    it('Should be able to register user without phone number', () => {
      register.registerUser(registrationUserWithoutPhone);
      register.login(
        registrationUserWithoutPhone.email,
        registrationUserWithoutPhone.password
      );
    });

    it('Should complete Savings checkout', () => {
      checkout.waitConsent();
      checkout.startInsuranceCheckout('Savings');
      checkout.checkCheckoutStep('Your Savings Insurance', '7');
      checkout.checkFirstCheckoutStep('Coverage');
      savings.populateCoverageInformation();
      checkout.checkActiveAndDisabledSteps('Choose a Cover', '6');
      checkout.clickContinueButton();
      savings.checkComparisonPage();
      savings.checkSavingsComparisonTable();
      savings.selectMainProduct('Balanced Deal');
      checkout.checkActiveAndDisabledSteps("What's Included", '5');
      checkout.checkCheckoutStep('Your Savings Insurance', '7');
      savings.checkOptionalProducts();
      checkout.checkActiveAndDisabledSteps('Add Options', '4');
      checkout.clickContinueButton();
      checkout.populatePersonalDetailsPage();
      checkout.checkActiveAndDisabledSteps('Personal Details', '3');
      checkout.clickContinueButton();
      checkout.checkAccordions('savingsAccordions');
      checkout.checkActiveAndDisabledSteps('Quote Review', '2');
      checkout.clickContinueButton();
      checkout.ConfirmBindQuote();
      checkout.checkAccordions('savingsAccordions');
      checkout.checkActiveAndDisabledSteps('Quote Review', '6');
      checkout.clickContinueButton();
      selectPaymentMethodInvoice();
      checkout.checkActiveAndDisabledSteps('Payment Details', '6');
      checkout.clickContinueButton();
      cy.get('cx-fs-final-review').within(() => {
        cy.get('.form-check-input').click();
        cy.get('.primary-button').click();
      });
      checkout.checkActiveAndDisabledSteps('Final Review', '6');
      cy.get('.primary-button').click({ force: true });
      checkout.checkOrderConfirmation();
    });

    it('Should create loan application', () => {
      cy.get('.SiteLogo').should('be.visible').click();
      banking.startBankingCheckout('Loan');
      banking.checkProgressBarLoanAndFTD();
      checkout.checkCheckoutStep('Your Loan Application', '6');
      banking.checkConfigureStep();
      checkout.checkActiveAndDisabledSteps('Configure a Product', '5');
      loan.configureLoan('1');
      checkout.clickContinueButton();
      loan.checkOptionalProducts();
      checkout.checkActiveAndDisabledSteps('Add Options', '4');
      checkout.clickContinueButton();
      checkout.checkPersonalDetailsPage();
      banking.populatePersonalDetailsCCandLoan();
      checkout.checkActiveAndDisabledSteps('Personal Details', '3');
      checkout.clickContinueButton();
      checkout.checkAccordions('generalQuoteAccordions');
      checkout.checkActiveAndDisabledSteps('Quote Review', '2');
      checkout.clickContinueButton();
      checkout.ConfirmBindQuote();
      checkout.checkActiveAndDisabledSteps('Quote Review', '5');
      checkout.clickContinueButton();
      loan.checkLegalInformationLoan();
      checkout.checkActiveAndDisabledSteps('Legal Information', '5');
      checkout.clickContinueButton();
      checkUserIdentificationPage();
      checkout.checkActiveAndDisabledSteps('User Identification', '5');
      selectUserIdentification('Legal Identification');
      checkout.checkOrderConfirmation();
    });
  });
});
