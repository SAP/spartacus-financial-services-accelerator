export const apiUrl = Cypress.env('API_URL');

export function waitForPage(page: string, alias: string): string {
  cy.server();
  cy.route('GET', `/rest/v2/financial/cms/pages?*${page}*`).as(alias);
  return alias;
}

export function waitForUserAssets(asset: string, alias: string): string {
  cy.server();
  cy.route('GET', `/rest/v2/financial/users/current/${asset}*`).as(alias);
  return alias;
}

export function waitForFlexComponent(component: string, alias: string): string {
  cy.server();
  cy.route(
    'GET',
    `/rest/v2/financial/cms/components?fields=DEFAULT&currentPage=0&pageSize=*&componentIds=*${component}*`
  ).as(alias);
  return alias;
}

export function waitForCMSComponent(component: string, alias: string): string {
  cy.server();
  cy.route('GET', `/rest/v2/financial/cms/components/${component}*`).as(alias);
  return alias;
}

