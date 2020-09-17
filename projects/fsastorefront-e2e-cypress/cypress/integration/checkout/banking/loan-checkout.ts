import * as register from "../../../helpers/register";
import {registrationUser} from "../../../sample-data/users";
import * as checkout from "../../../helpers/checkout/checkoutSteps";
import * as banking from "../../../helpers/checkout/banking/checkoutBankingSteps";
import {populatePersonalDetails} from "../../../helpers/checkout/banking/checkoutBankingSteps";
import * as creditCard from "../../../helpers/checkout/banking/creditCard";
import * as loan from "../../../helpers/checkout/banking/loan";
import * as userIdentification from "../../../helpers/checkout/banking/userIdentificationPage";

context('Loan Checkout', () => {
  before(() => {
    cy.visit('http://10.27.241.80/financial/en/EUR');
  });

  it('Should register a new user and start Loan checkout', () => {
    register.registerUser(registrationUser);
    register.login(registrationUser.email, registrationUser.password);
    checkout.waitForHomepage();
    banking.startBankingCheckout('Loan');
  });

  it('Should configure a Loan product', () => {
    banking.checkProgressBarLoanAndFTD();
    checkout.checkCheckoutStep('Your Loan Application', '6');
    banking.checkConfigureStep();
    loan.configureLoan();
    cy.get('.action-button').click();
    //mini cart
    //loan.checkMiniCart();
    checkout.clickContinueButton();
    checkout.waitForAddOptions();

  });

  it('Should check optional products', () => {
    checkout.checkCheckoutStep('Your Loan Application', '6');
    //TODO loan included product
    //loan.checkOptionalProducts();
    //loan.checkMiniCart();
    checkout.clickContinueButton();
  });

  it('Should populate Personal Details page', () => {
    checkout.checkCheckoutStep('Your Loan Application', '6');
    checkout.checkPersonalDetailsPage();
    loan.checkMiniCart();
    populatePersonalDetails();
    checkout.clickContinueButton();
  });

  it('Should check Quote Review page', () => {
    checkout.checkCheckoutStep('Your Loan Application', '6');
    banking.checkProgressBarLoanAndFTD();
    checkout.checkAccordions('creditCard');
    checkout.bindQuotePopup();
  });

  it('Should check Legal Information page', () => {
    checkout.checkCheckoutStep('Your Loan Application', '6');
    loan.checkLegalInformationLoan();
    checkout.clickContinueButton();
  });

  it('Should complete User Identification page', () => {
    checkout.checkCheckoutStep('Your Loan Application', '6');
    banking.checkProgressBarLoanAndFTD();
    userIdentification.checkUserIdentificationPage();
    userIdentification.selectUserIdentification('Legal Identification');
    checkout.clickContinueButton();
    checkout.waitForConfirmation();
  });

  it('Should check order confirmation', () => {
    checkout.checkOrderConfirmation();
    loan.checkMiniCart();
    checkout.checkAccordions('LoanConfirmation');
  });

});
