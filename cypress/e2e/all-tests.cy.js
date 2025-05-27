describe('RealBeans Webshop End-to-End Tests', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.get('body').then(($body) => {
      if ($body.find('input[name="password"]').length > 0) {
        cy.get('input[name="password"]').type('ocleid');
        cy.get('button[type="submit"]').click();
        cy.url().should('include', '/');
      }
    });

    cy.get('body').then(($body) => {
      if ($body.find('button:contains("Decline"), [data-testid="decline"], .cookie-decline, #decline-cookies').length > 0) {
        cy.get('button:contains("Decline"), [data-testid="decline"], .cookie-decline, #decline-cookies')
          .first()
          .click();
      }
    });
  });

  it('validates homepage content and product display', () => {
    cy.scrollTo('bottom', { duration: 1000 });
    cy.wait(500);

    cy.get('em')
      .contains('Since 1801, RealBeans has roasted premium coffee in Antwerp for Europe’s finest cafes. Ethically sourced beans, crafted with care.')
      .should('be.visible');

    cy.get('.product-grid, .collection-grid, .products-grid')
      .find('.product-card, .grid__item, .product-item')
      .should('have.length.greaterThan', 0);
  });

  it('verifies product catalog displays correct items', () => {
    cy.visit('/collections/all');
    cy.get('.grid__item, .product-card').each(($productCard) => {
      cy.wrap($productCard).find('.card__heading, .product-title').should('not.be.empty');
      cy.wrap($productCard).find('.price, .product__price').should('not.be.empty');
    });
  });

  it('confirms product sorting functionality', () => {
    cy.visit('/collections/all');
    cy.get('.grid__item, .product-card').should('have.length.greaterThan', 1);

    cy.get('form[action="/collections/all"] select[name="sort_by"], #SortBy')
      .first()
      .select('price-ascending');
    cy.url().should('include', 'sort_by=price-ascending');
    cy.wait(1000);

    cy.get('.grid__item, .product-card').should('have.length.greaterThan', 0);
  });

  it('validates product detail page content', () => {
    cy.visit('/collections/all');
    cy.get('.grid__item, .product-card').first().click();

    cy.get('.product__description, .product-description, .rte').should('not.be.empty');
    cy.get('.price, .product__price').should('not.be.empty');
    cy.get('.product__media img, .product-image img')
      .should('have.attr', 'src')
      .and('not.be.empty');
  });

  it('checks About page for history paragraph', () => {
    cy.visit('/pages/about');
    cy.get('p, .rte')
      .contains('From a small Antwerp grocery to a European coffee staple, RealBeans honors tradition while innovating for the future. Our beans are roasted in-house, shipped from Antwerp or Stockholm, and loved across the continent.')
      .should('be.visible');
  });
});