describe('Verify SailRC Home', () => {
  before(() => {
    cy.visit('/');
    cy.wait(1000);
  });

  it( 'has Plan Race, Conduct Race, Analyse Race cards', () => {
    cy.get('mat-card').contains('Plan Race')
    cy.get('mat-card').contains('Conduct Race')
    cy.get('mat-card').contains('Analyse Race')
  })
})

