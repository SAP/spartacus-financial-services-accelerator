import { donnaMooreUser } from '../../../sample-data/users';
import * as register from '../../../helpers/register';
import * as fnol from '../../../helpers/FNOL';
import * as buttons from '../../../helpers/checkout/buttons';

context('FNOL for sample data user', () => {
  before(() => {
    cy.visit('/login');
    register.login(donnaMooreUser.email, donnaMooreUser.password);
    cy.wait(1000);
  });

  const claimId = fnol.getClaimIdFromLocalStorage();

  it('import auto policy', () => {
    cy.request({
      url: `${Cypress.env(
        'API_URL'
      )}/odata2webservices/InboundInsurancePolicy/InsurancePolicies`,
      method: 'POST',
      headers: {
        Authorization: 'Basic ZnNpbnRlZ3JhdGlvbmFkbWluOjEyMzQ1Ng==',
        'Pre-Persist-Hook': 'fsInsurancePolicyPrePersistHook',
        'Content-Type': 'application/json',
      },
      body: {
        '@odata.context': '$metadata#InsurancePolicy/$entity',
        user: {
          externalId: 'SMOKE001',
        },
        policyId: 'BULK1T2000000552',
        contractId: 'BULK1T2000000552',
        versionNumber: '1',
        policyEffectiveDate: '2018-05-11T08:59:04',
        policyStartDate: '2018-05-11T08:59:04',
        policyExpiryDate: '2028-05-11T08:59:04',
        policyStatus: {
          code: 'ACTIVE',
        },
        paymentFrequency: {
          code: 'YEARLY',
        },
        premiumAmount: '102.39',
        currency: {
          isocode: 'EUR',
        },
        category: {
          code: 'insurances_auto',
          catalogVersion: {
            version: 'Online',
            catalog: {
              id: 'financialProductCatalog',
            },
          },
        },
        coverages: [
          {
            coverageProduct: {
              code: 'AUTO_COLLISION_COVERAGE',
              catalogVersion: {
                version: 'Online',
                catalog: {
                  id: 'financialProductCatalog',
                },
              },
            },
            coverageType: {
              code: 'ADDITIONAL',
            },
            coverageAmount: '124.23',
            coverageId: 'BULK1000000551T2C1V1',
          },
          {
            coverageProduct: {
              code: 'AUTO_TPL',
              catalogVersion: {
                version: 'Online',
                catalog: {
                  id: 'financialProductCatalog',
                },
              },
            },
            coverageType: {
              code: 'MAIN',
            },
            coverageAmount: '121.23',
            coverageId: 'BULK1000000551T2C2V1',
          },
          {
            coverageId: 'BULK1000000551T2C3V1',
            coverageProduct: {
              code: 'AUTO_ROADSIDE_ASSISTANCE',
              catalogVersion: {
                version: 'Online',
                catalog: {
                  id: 'financialProductCatalog',
                },
              },
            },
            coverageType: {
              code: 'ADDITIONAL',
            },
            coverageAmount: '121.23',
          },
        ],
        insuredObjects: [
          {
            insuredObjectId: 'BULK1000000551T2IO1V1',
            insuredObjectType: {
              code: 'PERSON',
            },
            insuredObjectItems: [
              {
                itemId: 'BULK1000000551T2IO1IT1V1',
                label: 'firstName',
                externalValue: 'Donna',
              },
              {
                itemId: 'BULK1000000551T2IO1IT2V1',
                label: 'lastName',
                externalValue: 'Moore',
              },
              {
                itemId: 'BULK1000000551T2IO1IT3V1',
                label: 'birthday',
                format: 'DATE',
                externalValue: '2018-05-11T08:59:04',
              },
            ],
          },
        ],
      },
    });
  });

  it('Should start a FNOL checkout', () => {
    cy.selectOptionFromDropdown({
      menuOption: 'My Account',
      dropdownItem: 'Policies',
    });
    fnol.selectAutoPolicyForFNOL();
  });

  it('Should check and populate Incident Information page', () => {
    fnol.checkFNOLCheckoutPage();
    fnol.checkFNOLSteps();
    fnol.populateIncidentInformationStep();
    buttons.clickContinueButton();
  });

  it('Should check claim is created', () => {
  
    fnol.checkClaimsPage(claimId);
    buttons.clickResumeButton();
  });

  it('Should check user is navigated to first FNOL page', () => {
    fnol.checkFNOLCheckoutPage();
    fnol.checkFNOLSteps();
    cy.get('[name=whatHappened]').select('Breakdown');
    buttons.clickContinueButton();
  });

  it('Should check and populate Incident Report page', () => {
    fnol.checkFNOLCheckoutPage();
    fnol.populateIncidentReportStep();
    buttons.checkBackAndContinueButtons();
    buttons.clickContinueButton();
  });

  it('Should check and populate General Information page', () => {
    fnol.checkFNOLCheckoutPage();
    fnol.populateGeneralInformationStep();
    buttons.clickContinueButton();
  });

  it('Should check summary page', () => {
    fnol.checkFNOLCheckoutPage();
    fnol.checkSummaryPage();
    buttons.checkBackAndContinueButtons();
  });

  it('Should check information in accordions on summary page', () => {
    fnol.checkIncidentInformationAccordion();
    fnol.checkIncidentReportAccordion();
    fnol.checkGeneralInformationAccordion();
    buttons.clickContinueButton();
  });

  it('Should check claim confirmation page', () => {
    fnol.checkConfirmationPage(claimId);
  });

  it('Should start a claim checkout from homepage', () => {
    cy.get('.SiteLogo').click();

    fnol.startClaimFromHomepage();
    fnol.checkFnolEntryPage();
    fnol.selectPolicyOnEntryPage();
    buttons.clickContinueButton();
    fnol.checkFNOLCheckoutPage();
  });

  it('Should delete started claim', () => {
    cy.selectOptionFromDropdown({
      menuOption: 'My Account',
      dropdownItem: 'Claims',
    });
    fnol.deleteClaimFromDialog(claimId);
  });
});
