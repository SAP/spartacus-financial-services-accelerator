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
