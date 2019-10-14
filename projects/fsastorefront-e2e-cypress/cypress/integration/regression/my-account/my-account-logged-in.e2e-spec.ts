import * as registerHelpers from '../../../helpers/register';
import { accessApllicationsPage, checkApplicationTitle, checkNumberOfApplications} from '../../../helpers/my-account/applications'
import {
    donaMooreUser,
} from '../../../sample-data/users';

context('Register', () => {
  before(() => {
    cy.window().then(win => win.sessionStorage.clear());
    cy.visit('/');
  });

  it('should be able to se my account area', () => {
    cy.visit('/login');
    registerHelpers.login (donaMooreUser.name, donaMooreUser.password);
    accessApllicationsPage();
    checkApplicationTitle();
    checkNumberOfApplications(2);
  });

});
