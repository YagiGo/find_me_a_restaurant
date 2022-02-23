describe('Detail page', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000');
  });
  it('the map is loaded', () => {
    cy.get('.col-lg-8 > div > div').find('.gm-style');
  });
  it('go to the detail page', () => {
    cy.get('.col-lg-4 > div > div:first')
      .find('.card')
      .click()
      .get('.col-lg-8 > div > div')
      .find('.gm-style')
      .get('.col-lg-4 > div > .opening-hours')
      .should('have.length', 1)
      .get('.col-lg-4 > div > .info')
      .should('have.length', 1)
      .get('.col-lg-4 > div > .photo')
      .should('have.length', 1)
      .get('.col-lg-4 > div > .review')
      .should('have.length', 1);
  });
  it('Search and jump back to main page', () => {
    const keyword = 'pizza';
    cy.get('.row > nav > .input-group > input').type(keyword).type('{enter}');
    cy.get('.col-lg-4 > div > div:first').find('.card');
    cy.get('.col-lg-4 > div > div:last-child > div').should(
      'have.length.at.most',
      20,
    );
  });
});
