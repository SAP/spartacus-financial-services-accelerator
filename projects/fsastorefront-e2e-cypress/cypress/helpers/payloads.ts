export function createDocumentPayload(documentCounter) {
  const timestamp = Date.now();
  return {
    url: `${Cypress.env(
      'API_URL'
    )}/odata2webservices/InboundDocument/Documents`,
    method: 'POST',
    headers: {
      Authorization: 'Basic ZnNpbnRlZ3JhdGlvbmFkbWluOjEyMzQ1Ng==',
      'Post-Persist-Hook': 'fsDocumentPostPersistHook',
      'Content-Type': 'application/json',
    },
    body: {
      '@odata.context': '$metadata#Document/$entity',
      documentId: 'doc_' + timestamp + documentCounter,
      bundleId: 'bundle_' + timestamp + documentCounter,
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
}

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
      externalId: 'EXT00000000',
    },
    policyId: '32',
    contractId: '23',
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
        coverageId: 'BULK1000000551T2C1V11',
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
        coverageId: 'BULK1000000551T2C2V11',
      },
      {
        coverageId: 'BULK1000000551T2C3V11',
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
        insuredObjectId: 'IO0000011',
        insuredObjectType: { code: 'AUTO' },
        insuredObjectItems: [
          {
            itemId: 'IOI0000011',
            label: 'vehicleMake',
            externalValue: 'Opel',
          },
          {
            itemId: 'IOI0000021',
            label: 'vehicleModel',
            externalValue: 'Astra',
          },
          {
            itemId: 'IOI0000031',
            label: 'vehicleType',
            externalValue: 'OPELAstra5Doors1.6EcotecTurbo6AT',
          },
          {
            itemId: 'IOI0000041',
            label: 'vehicleAnnualMileage',
            externalValue: '12000',
          },
          {
            itemId: 'IOI0000051',
            label: 'vehicleValue',
            externalValue: '23000',
          },
          {
            itemId: 'IOI0000061',
            label: 'vehiclePurchaseDate',
            format: 'DATE',
            externalValue: '2018-05-11T08:59:04',
          },
          {
            itemId: 'IOI0000071',
            label: 'vehicleIdentificationNumber',
            externalValue: '31232131313312312',
          },
          {
            itemId: 'IOI0000081',
            label: 'dateOfBirth',
            format: 'DATE',
            externalValue: '1988-05-11T08:59:04',
          },
          {
            itemId: 'IOI0000091',
            label: 'mainDriverFirstName',
            externalValue: 'Donna',
          },
          {
            itemId: 'IOI0000101',
            label: 'mainDriverLastName',
            externalValue: 'Moore',
          },
          {
            itemId: 'IOI00000111',
            label: 'mainDriverLicenceNumber',
            externalValue: 'LS32313',
          },
          {
            itemId: 'IOI00000121',
            label: 'mainDriverLicenseDate',
            format: 'DATE',
            externalValue: '2015-05-11T08:59:04',
          },
        ],
        childInsuredObjects: [
          {
            insuredObjectId: 'IO0000021',
            insuredObjectType: { code: 'DRIVER' },
            insuredObjectItems: [
              {
                itemId: 'IOI10000011',
                label: 'firstName',
                externalValue: 'Donna',
              },
              {
                itemId: 'IOI10000021',
                label: 'lastName',
                externalValue: 'Moore',
              },
            ],
          },
        ],
      },
    ],
  },
};
