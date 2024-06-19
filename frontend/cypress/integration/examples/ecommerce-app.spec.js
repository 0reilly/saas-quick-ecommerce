describe('Ecommerce Application', () => {
  it('should successfully register a new user', () => {
    cy.visit('/signup');

    // Fill in the signup form
    cy.get('#username').type('testuser');
    cy.get('#password').type('TestPassword123');
    cy.get('#firstName').type('Test');
    cy.get('#lastName').type('User');
    cy.get('#email').type('testuser@example.com');
    cy.get('#address').type('123 Main Street');
    cy.get('#phoneNumber').type('1234567890');

    // Submit the form
    cy.get('button[type="submit"]').click();

    // Verify success message
    cy.get('.success-message').should('be.visible');
  });

  it('should successfully login a registered user', () => {
    cy.visit('/login');

    // Fill in the login form
    cy.get('#username').type('testuser');
    cy.get('#password').type('TestPassword123');

    // Submit the form
    cy.get('button[type="submit"]').click();

    // Verify successful navigation to homepage
    cy.url().should('include', '/');
  });

  it('should add products to the shopping cart', () => {
    cy.visit('/products');

    // Add a product to the cart
    cy.get('.product-card').first().within(() => {
      cy.get('button').click();
    });

    // Verify cart item count
    cy.get('.cart-item-count').should('have.text', '1');
  });

  it('should proceed to checkout', () => {
    cy.visit('/cart');

    // Proceed to checkout
    cy.get('.checkout-button').click();

    // Verify checkout page
    cy.url().should('include', '/checkout');
  });

  it('should successfully place an order', () => {
    cy.visit('/checkout');

    // Fill in the checkout form
    // (replace with actual checkout form fields)

    // Submit the form
    cy.get('button[type="submit"]').click();

    // Verify successful order placement
    cy.get('.order-success-message').should('be.visible');
  });

  it('should display order history', () => {
    cy.visit('/orders');

    // Verify order history table
    cy.get('.order-history-table').should('be.visible');
  });

  it('should display order details', () => {
    cy.get('.order-history-table tr').first().within(() => {
      cy.get('a').click();
    });

    // Verify order details page
    cy.url().should('include', '/orders/');
    cy.get('.order-details-content').should('be.visible');
  });
});