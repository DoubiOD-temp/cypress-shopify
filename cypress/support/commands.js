// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

// Custom command to handle Shopify password protection
Cypress.Commands.add('bypassPasswordProtection', (password = 'robert') => {
  // Check if we're on a password protection page
  cy.get('body').then(($body) => {
    if ($body.find('input[name="password"]').length > 0) {
      cy.get('input[name="password"]').type(password);
      cy.get('button[type="submit"], input[type="submit"]').click();
      cy.wait(2000); // Wait for redirect
    }
  });
});

// Custom command to visit Shopify store with password handling
Cypress.Commands.add('visitStore', (path = '') => {
  const baseUrl = 'https://r1020640-realbeans.myshopify.com';
  cy.visit(`${baseUrl}${path}`, { failOnStatusCode: false });
  cy.bypassPasswordProtection();
  
  // Handle potential 404s for pages that might not exist
  cy.get('body').then(($body) => {
    if ($body.find('.errors, .error, [class*="404"], [class*="not-found"]').length > 0) {
      cy.log(`Page ${path} may not exist, redirecting to home`);
      cy.visit(baseUrl);
      cy.bypassPasswordProtection();
    }
  });
});

// Custom command to click mobile menu if needed
Cypress.Commands.add('openMobileMenuIfNeeded', () => {
  cy.get('body').then(($body) => {
    const menuSelectors = [
      '.header__icon--menu',
      '.menu-toggle',
      '.hamburger',
      '[aria-label*="menu"]',
      '.mobile-menu-toggle',
      '.nav-toggle'
    ];
    
    menuSelectors.forEach(selector => {
      if ($body.find(selector).length > 0) {
        cy.get(selector).first().then(($el) => {
          if ($el.is(':visible')) {
            cy.wrap($el).click();
            cy.wait(500);
          }
        });
      }
    });
  });
});