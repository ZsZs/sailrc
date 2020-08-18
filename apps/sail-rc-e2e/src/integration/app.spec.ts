import { getHeader } from '../support/app.po';

describe('sail-rc', () => {
  beforeEach(() => cy.visit('/'));

  it('should display the main page structure', () => {
    // tslint:disable-next-line:no-unused-expression
    expect( getHeader() ).to.not.be.null;
  });
});
