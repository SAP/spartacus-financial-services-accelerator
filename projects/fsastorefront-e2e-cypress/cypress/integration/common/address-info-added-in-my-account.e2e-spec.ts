import * as checkout from '../../helpers/checkout/checkout-steps';
import * as savings from '../../helpers/checkout/insurance/savings-checkout';
import { registrationUser } from '../../sample-data/users';
import * as register from '../../helpers/register';
import testFilters from '../../support/filters';
import * as loan from '../../helpers/checkout/banking/loan';
import * as banking from '../../helpers/checkout/banking/checkout-banking';
import * as addressInfo from '../../helpers/my-account/address-info';
import { retrieveQuote } from '../../helpers/my-account/my-account';

testFilters([''], () => {
  context('Address info added under my account', () => {
    before(() => {
      cy.visit('/');
    });

    it('Should register user with phone number', () => {
      register.registerUser(registrationUser);
      register.login(registrationUser.email, registrationUser.password);
    });

    it('Should start Savings checkout ', () => {
      checkout.waitConsent();
      checkout.startInsuranceCheckout('Savings');
      checkout.checkCheckoutStep('Your Savings Insurance', '7');
      checkout.checkProgressBarInsurance();
      checkout.checkFirstCheckoutStep('Coverage');
      savings.populateCoverageInformation();
      checkout.clickContinueButton();
      checkout.checkCheckoutStep('Your Savings Insurance', '7');
      checkout.checkProgressBarInsurance();
      savings.checkComparisonPage();
      savings.checkSavingsComparisonTable();
      savings.selecSafeAndSteady();
      savings.checkOptionalProductsSafeAndSteady();
      checkout.clickContinueButton();
      checkout.checkCheckoutStep('Your Savings Insurance', '7');
      checkout.checkPersonalDetailsPage();
    });

    it('Should check adderss fields on personal details', () => {
      addressInfo.checkEmptyFields();
      cy.get('[name=phoneNumber]').should('have.value', '66622299');
    });

    it('Should add New address from My Accounts', () => {
      cy.selectOptionFromMyAccount({
        dropdownItem: 'Address Info',
      });
      checkout.checkPageURL(checkout.categoryPage.addressInfo);
      addressInfo.checkRegisteredUserData();
      addressInfo.populateNewAddressInfo();
      addressInfo.addNewAddressInfo();
      addressInfo.checkAddressInfoCard();
    });

    it('Should Retrieve insurance quote', () => {
      retrieveQuote('1', 'Savings Insurance');
      checkout.checkPageURL(checkout.categoryPage.addOptions);
      checkout.clickContinueButton();
      //user was registered with phone number
      cy.get('[name=phoneNumber]').should('have.value', '66622299');
      addressInfo.checkDisabledFields('Omladinskih Brigada', '90g');
      checkout.clickContinueButton();
      checkout.checkValidationPopUpAndClose();
      //additional fields due to optional product
      cy.get('[name=partnerName]').type('Mona');
      cy.get('[name=partnerDateOfBirth]').type('1963-01-01');
      checkout.clickContinueButton();
      checkout.checkCheckoutStep('Your Savings Insurance', '7');
      checkout.checkAccordions('savingsQuoteReview');
      cy.get('.SiteLogo').should('be.visible').click();
    });

    it('Should start banking checkout - loan', () => {
      banking.startBankingCheckout('Loan');
      banking.checkProgressBarLoanAndFTD();
      checkout.checkCheckoutStep('Your Loan Application', '6');
      banking.checkConfigureStep();
      loan.configureLoan('1');
      checkout.clickContinueButton();
      loan.checkOptionalProducts();
      checkout.clickContinueButton();
      checkout.checkPersonalDetailsPage();
      addressInfo.checkPopulatedFieldsBanking();
      addressInfo.addNewDataPersonalDetailsBanking();
      banking.populatePersonalDetailsCCandLoan();
      checkout.clickContinueButton();
    });

    it('Should check Quote Review page', () => {
      checkout.checkCheckoutStep('Your Loan Application', '6');
      banking.checkProgressBarLoanAndFTD();
      checkout.checkAccordions('generalQuoteAccordions');
    });

    it('Should check address is not updated', () => {
      cy.selectOptionFromMyAccount({
        dropdownItem: 'Address Info',
      });
      checkout.checkPageURL(checkout.categoryPage.addressInfo);
      addressInfo.checkAddressInfoCard();
    });
  });
});
