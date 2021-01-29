export const apiUrl = Cypress.env('API_URL');

export function waitForRequest(
  asset: string,
  request: string,
  alias: string
): string {
  cy.intercept(request, `/occ/v2/financial/${asset}/*`).as(alias);
  return alias;
}

export function waitForPage(page: string, alias: string): string {
  cy.intercept('GET', `/occ/v2/financial/cms/pages?*${page}*`).as(alias);
  return alias;
}

export function waitForUserAssets(asset: string, alias: string): string {
  cy.intercept('GET', `/occ/v2/financial/users/current/${asset}*`).as(alias);
  return alias;
}

export function waitForCreateAsset(asset: string, alias: string): string {
  cy.intercept('POST', `/occ/v2/financial/users/current/${asset}*`).as(alias);
  return alias;
}

export function waitForCMSComponent(component: string, alias: string): string {
  cy.intercept('GET', `/occ/v2/financial/cms/components/${component}*`).as(
    alias
  );
  return alias;
}

export function waitForFormDefinition(form: string, alias: string): string {
  cy.intercept('GET', `/occ/v2/financial/formDefinitions/${form}*`).as(alias);
  return alias;
}
