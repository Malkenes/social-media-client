describe('social-media-client', () => {
  beforeEach(() => {
    cy.visit('index.html');
    cy.wait(1000);
    cy.get('#registerModal').then((modal) => {
      cy.wrap(modal).find(`[data-bs-target="#loginModal"]`).click();
    });
    cy.wait(1000);
  });
  it('can login with valid credentials', () => {
    cy.get('input#loginEmail').type('frostfeather@stud.noroff.no');
    cy.get('input#loginPassword').type('c2eCe2eF2r2£@dwsA{enter}');
    cy.location('search').should('include', 'view=profile');
    cy.location('search').should('include', 'name=frostfeather');
    cy.window().its('localStorage').should('have.property', 'profile');
    cy.window().its('localStorage').should('have.property', 'token');
  });

  it('cannot login with invalid credentials, and is shown a message', () => {
    cy.get('input#loginEmail').type('test@stud.noroff.no');
    cy.get('input#loginPassword').type('password{enter}');
    cy.on('window:alert', (alertText) => {
      expect(alertText).to.equal(
        'Either your username was not found or your password is incorrect',
      );
    });
  });
  it('can logout with the logout button', () => {
    cy.get('input#loginEmail').type('frostfeather@stud.noroff.no');
    cy.get('input#loginPassword').type('c2eCe2eF2r2£@dwsA{enter}');
    cy.window().its('localStorage').should('have.property', 'profile');
    cy.window().its('localStorage').should('have.property', 'token');
    cy.contains('Logout').click();
    cy.window().its('localStorage').should('not.have.property', 'profile');
    cy.window().its('localStorage').should('not.have.property', 'token');
  });
});
