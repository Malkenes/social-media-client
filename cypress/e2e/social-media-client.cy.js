describe('social-media-client', () => {
  it('can login with valid credentials', () => {
    cy.visit('/index.html');
    cy.get('input#loginEmail').type('frostfeather@stud.noroff.no');
    cy.get('input#loginPassword').type('c2eCe2eF2r2£@dwsA{enter}', {
      delay: 500,
    });
    cy.location('pathname').should('eq', '/?view=profile&name=frostfeather');
  });
});
