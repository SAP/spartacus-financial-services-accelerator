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
        insuredObjectId: 'IO000001',
        insuredObjectType: { code: 'AUTO' },
        insuredObjectItems: [
          {
            itemId: 'IOI000001',
            label: 'vehicleMake',
            externalValue: 'Opel',
          },
          {
            itemId: 'IOI000002',
            label: 'vehicleModel',
            externalValue: 'Astra',
          },
          {
            itemId: 'IOI000003',
            label: 'vehicleType',
            externalValue: 'OPELAstra5Doors1.6EcotecTurbo6AT',
          },
          {
            itemId: 'IOI000004',
            label: 'vehicleAnnualMileage',
            externalValue: '12000',
          },
          {
            itemId: 'IOI000005',
            label: 'vehicleValue',
            externalValue: '23000',
          },
          {
            itemId: 'IOI000006',
            label: 'vehiclePurchaseDate',
            format: 'DATE',
            externalValue: '2018-05-11T08:59:04',
          },
          {
            itemId: 'IOI000007',
            label: 'vehicleIdentificationNumber',
            externalValue: '31232131313312312',
          },
          {
            itemId: 'IOI000008',
            label: 'dateOfBirth',
            format: 'DATE',
            externalValue: '1988-05-11T08:59:04',
          },
          {
            itemId: 'IOI000009',
            label: 'mainDriverFirstName',
            externalValue: 'Donna',
          },
          {
            itemId: 'IOI000010',
            label: 'mainDriverLastName',
            externalValue: 'Moore',
          },
          {
            itemId: 'IOI0000011',
            label: 'mainDriverLicenceNumber',
            externalValue: 'LS32313',
          },
          {
            itemId: 'IOI0000012',
            label: 'mainDriverLicenseDate',
            format: 'DATE',
            externalValue: '2015-05-11T08:59:04',
          },
        ],
      },
    ],
  },
};
