export const apiUrl = Cypress.env('API_URL');

export function waitForPage(page: string, alias: string): string {
  cy.server();
  cy.route('GET', `/occ/v2/financial/cms/pages?*${page}*`).as(alias);
  return alias;
}

export function waitForUserAssets(asset: string, alias: string): string {
  cy.server();
  cy.route('GET', `/occ/v2/financial/users/current/${asset}*`).as(alias);
  return alias;
}

export function waitForcreateCart(asset: string, alias: string): string {
  cy.server();
  cy.route('POST', `/occ/v2/financial/users/current/${asset}*`).as(alias);
  return alias;
}

export function waitForCMSComponent(component: string, alias: string): string {
  cy.server();
  cy.route('GET', `/occ/v2/financial/cms/components/${component}*`).as(alias);
  return alias;
}

export function getCartId(alias: String) {
  cy.wait(`@${alias}`).then(response => {
    const body = <any>response.response.body;
    return body.code;
  });
}
