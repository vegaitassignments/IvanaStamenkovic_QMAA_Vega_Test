describe("TC_CHECKOUT_001 - Verify that user can checkout", () => {
  beforeEach(() => {
    cy.visit("https://www.saucedemo.com/v1/index.html");
  });

  it("should ... after ...", () => {
    // Log in
    cy.get("[data-test='username']").type("standard_user");
    cy.get("[data-test='password']").type("secret_sauce");
    cy.get("#login-button").click();

    // Verify redirection to inventory page
    cy.url().should("include", "/inventory.html");

    // Add Sauce Labs Fleece Jacket to cart
    cy.contains(".inventory_item", "Sauce Labs Fleece Jacket")
      .find(".btn_inventory")
      .click();

    // Verify that the cart icon updates to display 1 item
    cy.get(".shopping_cart_badge").should("have.text", "1");

    // Open cart page
    cy.get("#shopping_cart_container").click();

    // Verify redirection to cart page
    cy.url().should("include", "/cart.html");

    // Proceed to checkout
    cy.get(".checkout_button").click();

    // Verify redirection to checkout page
    cy.url().should("include", "/checkout-step-one.html");

    // Fill out checkout form
    cy.get("[data-test='firstName']").type("Ivana");
    cy.get("[data-test='lastName']").type("Test");
    cy.get("[data-test='postalCode']").type("21000");
    cy.get(".cart_button").click();

    // Verify that checkout form has been successfully submitted
    cy.url().should("include", "/checkout-step-two.html");

    // Finish checkout
    cy.get(".cart_button").click();

    // Verify that the order has been sent
    cy.url().should("include", "checkout-complete.html");
    cy.get(".complete-text").should(
      "contain.text",
      "order has been dispatched"
    );
  });
});
