import * as checkout from '../../helpers/checkout/checkout-steps';
import * as travelCheckout from '../../helpers/checkout/insurance/travel-checkout';
import { registrationUser } from '../../sample-data/users';
import * as register from '../../helpers/register';
import testFilters from '../../support/filters';
import * as creditCard from '../../helpers/checkout/banking/credit-card';
import * as banking from '../../helpers/checkout/banking/checkout-banking';
import * as addressInfo from '../../helpers/my-account/address-info';

testFilters([''], () => {
  context('Address info added during checkout', () => {
    before(() => {
      cy.visit('/');
    });

    it('Should register user with phone number', () => {
      register.registerUser(registrationUser);
      register.login(registrationUser.email, registrationUser.password);
    });

    it('Should start banking checkout - Credit Card', () => {
      checkout.waitConsent();
      banking.startBankingCheckout('Credit Card');
      checkout.checkCheckoutStep('Your Credit Card Application', '7');
      banking.checkBankingComparisonPage();
      creditCard.checkCreditCardComparisonTable();
      creditCard.selectPremiumCard();
      banking.checkConfigureStep();
      creditCard.populateConfigureStep();
      cy.get('[name=numberOfApplicants]').select('1');
      checkout.clickContinueButton();
      creditCard.checkOptionalProducts();
      checkout.clickContinueButton();
    });

    it('Should populate Personal Details page', () => {
      checkout.checkCheckoutStep('Your Credit Card Application', '7');
      checkout.checkPersonalDetailsPage();
      addressInfo.addNewAddressInCheckout();
      banking.populatePersonalDetailsCCandLoan();
      checkout.clickContinueButton();
      checkout.checkAccordions('quoteReviewWithoutOptional');
    });

    it('Should address is added to Address Info', () => {
      cy.selectOptionFromMyAccount({
        dropdownItem: 'Address Info',
      });
      checkout.checkPageURL(checkout.categoryPage.addressInfo);
      addressInfo.checkNewAddressFromCheckout();
    });

    it('Should start insurance checkout - Travel', () => {
      checkout.startInsuranceCheckout('Travel');
      checkout.checkCheckoutStep('Your Travel Insurance', '7');
      checkout.checkProgressBarInsurance();
      travelCheckout.populateTripInformation();
      checkout.clickContinueButton();
      travelCheckout.checkSingleTravelComparisonTable();
      travelCheckout.selectSingleBudgetPlan();
      travelCheckout.checkOptionalProducts();
      checkout.clickContinueButton();
    });

    it('Should check address info is populated on personal details', () => {
      checkout.checkCheckoutStep('Your Travel Insurance', '7');
      checkout.checkPersonalDetailsPage();
      addressInfo.checkDisabledFields(' New Street', ' Number 23638');
      cy.get('[name=country]').should('have.value', 'DE');
      checkout.clickContinueButton();
    });

    it('Should delete new address', () => {
      cy.selectOptionFromMyAccount({
        dropdownItem: 'Address Info',
      });
      checkout.checkPageURL(checkout.categoryPage.addressInfo);
      addressInfo.checkNewAddressFromCheckout();
      cy.contains('Delete').click();
      cy.get('.cx-card-delete-msg').should(
        'have.text',
        ' Are you sure you want to delete this address? '
      );
      cy.contains('Cancel').should('be.visible');
      cy.contains('Delete').click();
      cy.get('.alert-success').should(
        'have.text',
        'Address deleted successfully!'
      );
    });
  });
});
