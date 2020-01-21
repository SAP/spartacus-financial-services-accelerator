export const importDocuments = {
  url: `${Cypress.env('API_URL')}/odata2webservices/InboundDocument/Documents`,
  method: 'POST',
  headers: {
    Authorization: 'Basic ZnNpbnRlZ3JhdGlvbmFkbWluOjEyMzQ1Ng==',
    'Post-Persist-Hook': 'fsDocumentPostPersistHook',
    'Content-Type': 'application/json',
  },
  body: {
    '@odata.context': '$metadata#Document/$entity',
    documentId: 'testDoc3',
    bundleId: 'bundle1',
    name: 'New Policy Effective Immediately',
    issueDate: '2019-05-11T08:59:04',
    url: 'https://www.documentmanagementsystem.sap.com/PolicyDocument',
    customer: {
      customerId: 'SMOKE001',
    },
    format: {
      code: 'testFormat',
    },
  },
};

export const importAutoPolicy = {
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
};
