import { donnaMooreUser } from '../../../sample-data/users';
import * as register from '../../../helpers/register';
import * as FNOL from '../../../helpers/FNOL';
import * as buttons from '../../../helpers/checkout/buttons';

context('FNOL for sample data user', () => {
  before(() => {
    cy.visit('/');
    register.login(donnaMooreUser.email, donnaMooreUser.password);
    cy.wait(1000);
  });

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
    FNOL.openMyAccountPolicySection();
    FNOL.selectAutoPolicyForFNOL();
  });


  it('Should check and populate Incident Information page', () => {
    FNOL.checkFNOLCheckoutPage();
    FNOL.checkFNOLSteps();
    FNOL.populateIncidentInformationStep();
    buttons.clickContinueButton();
  });

  it('Should check claim is created', () => {
    FNOL.openMyAccountClaimsSection();
    FNOL.checkClaimsPage();
    cy.get('.info-card')
      .last()
      .within(() => {
        FNOL.checkOpenClaimContent();
        buttons.clickResumeButton();
      });
  });

  it('Should check user is navigated to first FNOL page', () => {
    FNOL.checkFNOLCheckoutPage();
    FNOL.checkFNOLSteps();
    cy.get('[name=whatHappened]').select('Breakdown');
    buttons.clickContinueButton();
  });

  it('Should check and populate Incident Report page', () => {
    FNOL.checkFNOLCheckoutPage();
    FNOL.populateIncidentReportStep();
    buttons.clickContinueButton();
  });

  it('Should check and populate General Information page', () => {
    FNOL.checkFNOLCheckoutPage();
    FNOL.populateGeneralInformationStep();
    buttons.clickContinueButton();
  });

  it('Should check summary page', () => {
    FNOL.checkFNOLCheckoutPage();
    FNOL.checkSummaryPage();
    buttons.checkBackAndContinueButtons();
  });

  it('Should check information in accordions on summary page', () => {
    FNOL.checkIncidentInformationAccordion();
    FNOL.checkIncidentReportAccordion();
    FNOL.checkGeneralInformationAccordion();
  });

  it('Should start a claim checkout from homepage', () => {
    cy.get('cx-page-slot.SiteLogo').click();

    FNOL.startClaimFromHomepage();
    FNOL.checkFnolEntryPage();
    FNOL.selectPolicyOnEntryPage();
    buttons.clickContinueButton();
    FNOL.checkFNOLCheckoutPage();
  })
});
