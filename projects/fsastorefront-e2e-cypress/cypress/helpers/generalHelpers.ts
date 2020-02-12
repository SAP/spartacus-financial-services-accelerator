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
