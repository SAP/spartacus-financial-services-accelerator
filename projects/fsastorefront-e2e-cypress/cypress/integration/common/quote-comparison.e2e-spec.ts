import * as register from '../../helpers/register';
import { registrationUser } from '../../sample-data/users';
import * as checkout from '../../helpers/checkout/checkout-steps';
import * as banking from '../../helpers/checkout/banking/checkout-banking';
import * as loan from '../../helpers/checkout/banking/loan';
import testFilters from '../../support/filters';
import * as quotes from '../../helpers/my-account/quotes-and-applications';
import * as compare from '../../helpers/my-account/quote-compare';
import * as event from '../../helpers/checkout/insurance/event-checkout';

testFilters([''], () => {
  context('Quotes and Application comparison', () => {
    before(() => {
      cy.visit('/');
    });

    it('Should register a new user', () => {
      register.registerUser(registrationUser);
      register.login(registrationUser.email, registrationUser.password);
      checkout.waitConsent();
    });

    it('Should create a loan quote', () => {
      banking.startBankingCheckout('Loan');
      banking.checkProgressBarLoanAndFTD();
      banking.checkConfigureStep();
      loan.configureLoan('1');
      checkout.clickContinueButton();
      checkout.checkCheckoutStep('Your Loan Application', '6');
      loan.checkOptionalProducts();
      checkout.clickContinueButton();
      checkout.checkPersonalDetailsPage();
      banking.populateAddressInfo();
      banking.uploadDocument();
      banking.populatePersonalDetailsCCandLoan();
      cy.wait(3000);
      checkout.clickContinueButton();
      checkout.checkAccordions('generalQuoteAccordions');
      checkout.clickContinueButton();
      checkout.ConfirmBindQuote();
      checkout.checkAccordions('generalQuoteAccordions');
      checkout.clickContinueButton();
    });

    it('Should Check loan application is Created', () => {
      quotes.checkMyQuotesPage();
      compare.checkCompareIsDisabled();
      quotes.checkBiweeklyLoanApplication();
    });

    it('Should create a event quote', () => {
      checkout.startInsuranceCheckout('Event');
      checkout.checkCheckoutStep('Your Event Insurance', '6');
      event.checkProgressBarEvent();
      checkout.checkInsuranceComparisonPage('4');
      event.checkEventComparisonTable();
      event.selectMainProductEvent('Two Star Event Plan', '0');
      event.checkOptionalProductsTwoStar();
      checkout.clickContinueButton();
      event.populatePersonalDetails();
      checkout.clickContinueButton();
      checkout.checkAccordions('threeAccordions');
      checkout.clickContinueButton();
      checkout.ConfirmBindQuote();
    });

    it('Should check event application is created', () => {
      quotes.checkMyQuotesPage();
      compare.checkCompareIsDisabled();
      quotes.checkEventQuote();
    });

    it('Should create second loan aplication', () => {
      banking.startBankingCheckout('Loan');
      banking.checkProgressBarLoanAndFTD();
      banking.checkConfigureStep();
      loan.configureLoan('2');
      cy.get('[name=repayment-frequency]').select('weekly');
      checkout.clickContinueButton();
      checkout.checkCheckoutStep('Your Loan Application', '6');
      loan.checkOptionalProducts();
      checkout.clickContinueButton();
    });

    it('Should check second loan application is created', () => {
      quotes.checkMyQuotesPage();
      compare.checkCompareIsDisabled();
      quotes.checkWeeklyLoanApplication();
    });

    it('Should create second event quote', () => {
      checkout.startInsuranceCheckout('Event');
      checkout.checkCheckoutStep('Your Event Insurance', '6');
      event.checkProgressBarEvent();
      checkout.checkInsuranceComparisonPage('4');
      event.checkEventComparisonTable();
      event.selectMainProductEvent('Two Star Event Plan', '0');
      event.checkOptionalProductsTwoStar();
      checkout.removeOptionalProduct('Excess Waiver');
    });

    it('Should compare banking applications', () => {
      quotes.checkMyQuotesPage();
      compare.checkCompareIsDisabled();
      compare.selectFirstQuoteForCompare('€69.99 / Weekly', 'Personal Loan');
      compare.checkQuotesDifferentProductDisabled('€57.99 / One-time Charge');
      compare.selectSecondQuoteForComparison('€140.00 / Biweekly');
      compare.compareNotDisabled();
      compare.checkComparePage('Loan Application');
      checkout.checkAccordions('compareQuote');
    });

    it('Should compare insurance quotes', () => {
      cy.get('.fa-arrow-left').click();
      cy.get('.heading-headline').should(
        'contains.text',
        'Quotes & Applications'
      );
      cy.get('.info-card').should('have.length', 4);
      compare.selectFirstQuoteForCompare(
        '€47.99 / One-time Charge',
        'Two Star Event'
      );
      compare.checkQuotesDifferentProductDisabled('€69.99 / Weekly');
      compare.selectSecondQuoteForComparison('€57.99 / One-time Charge');
      compare.compareNotDisabled();
      compare.checkComparePage('Event Insurance');
      checkout.checkAccordions('compareEventQuote');
    });
  });
});
