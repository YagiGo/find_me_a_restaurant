describe('Overview page', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000');
  });

  it('the map is loaded', () => {
    cy.get('.col-lg-8 > div > div').find('.gm-style');
  });

  it('the randomly selected restaurant is shown', () => {
    cy.get('.col-lg-4 > div > div:first > h4').should(
      'have.text',
      'Hard to decide? How about this one!',
    );
    cy.get('.col-lg-4 > div > div > button').should('have.text', 'Shuffle');
    cy.get('.col-lg-4 > div > div:first').find('.card');
  });

  it('the other options are shown', () => {
    cy.get('.col-lg-4 > div > div:last-child > h4').should(
      'have.text',
      'Other options in this area',
    );
    cy.get('.col-lg-4 > div > div:last-child > div').should('have.length', 20);
  });

  it('Search with keyword', () => {
    const keyword = 'pizza';
    cy.get('.row > nav > .input-group > input').type(keyword).type('{enter}');
    cy.get('.col-lg-4 > div > div:first').find('.card');
    cy.get('.col-lg-4 > div > div:last-child > div').should(
      'have.length.at.most',
      20,
    );
  });

  it('Search with keywords that have no result', () => {
    const useless = 'sdfsfsfsfsfsadfasfsafsaffdsafasfda';
    cy.get('.row > nav > .input-group > input').type(useless).type('{enter}');
    cy.get('.col-lg-4 > div > .text-muted > h3').should(
      'have.text',
      'No Result',
    );
  });
});
