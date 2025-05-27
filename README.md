# Cypress Tests for Real Beans Coffee Shopify Store

This repository contains comprehensive Cypress end-to-end tests for the Real Beans Coffee Shopify store at `https://r1020640-realbeans.myshopify.com`.

## Test Coverage

The test suite covers the following areas:

### 🔐 Password Protection
- Automatically handles the store password ("robert") on all pages
- Custom commands for seamless authentication

### 🏠 Homepage Tests (`cypress/e2e/home.cy.js`)
- Verifies intro text displays correctly
- Checks product list appears on homepage
- Tests navigation functionality
- Validates responsive design
- Ensures proper page structure and branding

### 📦 Product Catalog Tests (`cypress/e2e/catalog.cy.js`)
- Validates product catalog page shows correct items
- Tests product sorting functionality (by price)
- Verifies product detail pages display correct information
- Checks product descriptions, prices, and image names
- Tests navigation between catalog and product pages

### ℹ️ About Page Tests (`cypress/e2e/about.cy.js`)
- Verifies About page includes history paragraph
- Checks for meaningful business content
- Tests navigation accessibility
- Validates page structure and meta information

### 📞 Contact Page Tests (`cypress/e2e/contact.cy.js`)
- Verifies contact information display
- Tests contact form functionality (if available)
- Checks navigation accessibility
- Validates page structure

### 🧪 Complete Test Suite (`cypress/e2e/all-tests.cy.js`)
- Runs comprehensive tests across all pages
- Tests cross-page functionality
- Validates consistent navigation
- Performance and accessibility checks

## Store URLs Tested

- **Homepage**: `https://r1020640-realbeans.myshopify.com/`
- **Product Catalog**: `https://r1020640-realbeans.myshopify.com/collections/all`
- **About Page**: `https://r1020640-realbeans.myshopify.com/pages/about`
- **Contact Page**: `https://r1020640-realbeans.myshopify.com/pages/contact`

## Setup and Installation

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Verify Cypress Installation**
   ```bash
   npx cypress verify
   ```

## Running Tests

### Interactive Mode (Cypress Test Runner)
```bash
npx cypress open
```
This opens the Cypress Test Runner where you can:
- Select and run individual test files
- Watch tests run in real-time
- Debug test failures
- View screenshots and videos

### Headless Mode (Command Line)
```bash
# Run all tests
npx cypress run

# Run specific test file
npx cypress run --spec "cypress/e2e/catalog.cy.js"

# Run tests in specific browser
npx cypress run --browser chrome
```

### Run Individual Test Suites
```bash
# Homepage tests
npx cypress run --spec "cypress/e2e/home.cy.js"

# Catalog tests
npx cypress run --spec "cypress/e2e/catalog.cy.js"

# About page tests
npx cypress run --spec "cypress/e2e/about.cy.js"

# Contact page tests
npx cypress run --spec "cypress/e2e/contact.cy.js"

# Complete test suite
npx cypress run --spec "cypress/e2e/all-tests.cy.js"
```

## Custom Commands

The test suite includes custom Cypress commands defined in `cypress/support/commands.js`:

### `cy.bypassPasswordProtection(password)`
Automatically handles the Shopify password protection page.
```javascript
cy.bypassPasswordProtection('robert');
```

### `cy.visitStore(path)`
Visits a store URL and automatically handles password protection.
```javascript
cy.visitStore('/collections/all');
```

## Configuration

The Cypress configuration (`cypress.config.js`) includes:
- Base URL set to the Shopify store
- Optimized timeouts for e-commerce sites
- Video recording enabled
- Screenshot on failure
- Retry logic for flaky tests

## Test Strategy

### Robust Element Selection
Tests use multiple selector strategies to handle Shopify's dynamic themes:
- Data attributes (`data-testid`)
- CSS classes (`.product-item`, `.grid__item`)
- Semantic selectors (`h1`, `nav`, `main`)
- Content-based selectors (`:contains()`)

### Error Handling
- Graceful handling of missing elements
- Conditional testing based on page content
- Fallback strategies for different theme layouts

### Responsive Testing
- Tests multiple viewport sizes
- Validates mobile, tablet, and desktop layouts
- Ensures content visibility across devices

## Troubleshooting

### Common Issues

1. **Password Protection Failures**
   - Verify the password "robert" is correct
   - Check if the store's password protection is enabled

2. **Element Not Found**
   - Shopify themes vary in structure
   - Tests include multiple selector strategies
   - Check browser console for specific errors

3. **Timeout Issues**
   - Increase timeout values in `cypress.config.js`
   - Check network connectivity
   - Verify store is accessible

### Debug Mode
Run tests with debug output:
```bash
DEBUG=cypress:* npx cypress run
```

## Reporting

Test results include:
- Screenshots on failure
- Video recordings of test runs
- Detailed error logs
- Performance metrics

Results are saved in:
- `cypress/screenshots/` - Failure screenshots
- `cypress/videos/` - Test run videos

## Best Practices

1. **Run tests regularly** to catch issues early
2. **Update selectors** if store theme changes
3. **Monitor test performance** and optimize slow tests
4. **Review failure screenshots** to understand issues
5. **Keep tests independent** - each test should work in isolation

## Contributing

When adding new tests:
1. Follow existing naming conventions
2. Use the custom commands for store navigation
3. Include multiple selector strategies
4. Add appropriate assertions
5. Test across different viewport sizes

## Support

For issues with the tests:
1. Check the Cypress documentation
2. Review test failure screenshots
3. Verify store accessibility
4. Update selectors if theme changed