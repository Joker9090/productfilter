/* eslint-disable */
// Disable ESLint to prevent failing linting inside the Next.js repo.
// If you're using ESLint on your project, we recommend installing the ESLint Cypress plugin instead:
// https://github.com/cypress-io/eslint-plugin-cypress

/*

data-cy="cy-query-search"
data-cy="cy-create-registry"
data-cy="cy-modal-title"
data-cy="cy-modal-btn"
data-cy="cy-ProductRow" 
*/

describe('MainList', () => {
  it('Product Filter should open correctly', () => {
    // Start from the index page
    cy.visit('http://localhost:3000/');
    cy.wait(4000);
    cy.get('*[data-cy="cy-ProductRow"]').should('have.length.greaterThan', 1);
  });

  it('Create New registry and search for that', () => {
    cy.get('*[data-cy="cy-create-registry"]').click();
    cy.wait(300);
    
    cy.get('*[data-cy="cy-modal-title"]').clear().type('Test the creation of a new registry')
    const prevL = cy.get('*[data-cy="cy-ProductRow"]').length;
    cy.get('*[data-cy="cy-modal-btn"]:nth-child(1)').click();

    cy.get('*[data-cy="cy-ProductRow"]').then(($i) => {
      expect($i.length).not.to.eq(prevL)
    })
  
  });
});

