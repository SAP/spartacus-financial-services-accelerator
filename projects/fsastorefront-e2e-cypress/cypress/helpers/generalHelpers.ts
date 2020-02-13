export const apiUrl = Cypress.env('API_URL');

export function waitForPage(page: string, alias: string): string {
  cy.server();
  cy.route('GET', `/rest/v2/financial/cms/pages?*${page}*`).as(alias);
  return alias;
}
