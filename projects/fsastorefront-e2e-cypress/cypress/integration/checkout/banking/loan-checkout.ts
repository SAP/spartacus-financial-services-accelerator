import * as productCategory from "../../../helpers/productCategoryPage";
import * as register from "../../../helpers/register";
import {registrationUser} from "../../../sample-data/users";
import * as checkout from "../../../helpers/checkout/checkoutSteps";
import * as banking from "../../../helpers/checkout/banking/checkoutBankingSteps";
import * as creditCard from "../../../helpers/checkout/banking/creditCard";
import * as loan from "../../../helpers/checkout/banking/loan";
import {checkPersonalDetailsPage} from "../../../helpers/checkout/checkoutSteps";

context('Loan Checkout', () => {
  before(() => {
    cy.visit('/');
  });

  it('Should register a new user and start Loan checkout', () => {
/*    register.registerUser(registrationUser);
    register.login(registrationUser.email, registrationUser.password);*/
    checkout.waitForHomepage();
    cy.selectOptionFromDropdown({
      menuOption: 'Banking',
      dropdownItem: 'Loan',
    });
    productCategory.startCheckoutForBanking();
  });

  it('Should configure a Loan product', () => {
    cy.wait(1000);
    checkout.checkCheckoutStep('Your Loan Application', '6');
    banking.checkProgressBarLoan();
    banking.checkConfigureStep();
    //populate configure product
    cy.get('[name=numberOfApplicants]').select('2');
    cy.get('[name=loan-amount]').type('18001');
    cy.get('[name=loanStartDate]').type('2021-12-12');
    cy.get('[name=loan-term]').select('6-year');
    cy.get('[name=repayment-frequency]').select('biweekly');
    cy.get('[name=loanPurpose]').select('purchasing-a-car');
    //click calculate
    cy.get('.btn-primary').contains('Calculate').click();
    //mini cart
    cy.get('.short-overview-content').should('be.visible')
      .within( ()=> {
        cy.get('.short-overview-title').contains('Total price:');
        cy.get('.short-overview-value').contains(' €172.64 ');
      });
    checkout.clickContinueButton();
  });

  it('Should check optional products', () => {
    checkout.checkCheckoutStep('Your Loan Application', '6');
    //TODO loan included product
    //loan.checkOptionalProducts();
    //creditCard.checkMiniCartCreditCard();
    checkout.clickContinueButton();
  });


  it('Should populate Personal Details page', () => {
    checkout.checkCheckoutStep('Your Loan Application', '6');
    checkPersonalDetailsPage();
    //TODO check mini cart
    loan.populatePersonalDetails();
    checkout.clickContinueButton();
  });

});
