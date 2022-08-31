
describe('Verify SailRC header', () => {
  before(() => {
    cy.visit('/');
    cy.wait(1000);
  });

  it( 'has breadcrumb and signup, login menu', () => {
    cy.get('sailrc-header xng-breadcrumb').contains('Sail Race Control')
    cy.get('sailrc-header ul.navigation-items').find('li').eq( 0 ).contains('Signup')
    cy.get('sailrc-header ul.navigation-items').find('li').eq(1 ).contains('Login')
  })
})

