describe("TC_CART_001 - Verify cart updates correctly", () => {
  beforeEach(() => {
    cy.visit("https://www.saucedemo.com/v1/index.html");
  });

  it("should update cart image correctly after adding and removing items", () => {
    // Fill out the login form
    cy.get("[data-test='username']").type("standard_user");
    cy.get("[data-test='password']").type("secret_sauce");

    // Verify entered data in the login form
    cy.get("[data-test='username']").should("have.value", "standard_user");
    cy.get("[data-test='password']").should("have.value", "secret_sauce");

    // Log in
    cy.get("#login-button").click();

    // Verify redirection to inventory page
    cy.url().should("include", "/inventory.html");
    cy.get(".inventory_item").should("have.length", 6);

    // Add Sauce Labs Backpack to cart
    cy.contains(".inventory_item", "Sauce Labs Backpack")
      .find(".btn_inventory")
      .click();

    // Verify that the ADD TO CART button changed to REMOVE
    cy.contains(".inventory_item", "Sauce Labs Backpack")
      .find(".btn_inventory")
      .should("have.text", "REMOVE");

    // Verify that the cart icon updates to display 1 item
    cy.get(".shopping_cart_badge").should("have.text", "1");

    // Add Sauce Labs Onesie to cart
    cy.contains(".inventory_item", "Sauce Labs Onesie")
      .find(".btn_inventory")
      .click();

    // Verify that the ADD TO CART button changed to REMOVE
    cy.contains(".inventory_item", "Sauce Labs Onesie")
      .find(".btn_inventory")
      .should("have.text", "REMOVE");

    // Verify that the cart icon updates to display 2 items
    cy.get(".shopping_cart_badge").should("have.text", "2");

    // Open Sauce Labs Backpack product page
    cy.get(".inventory_item_name").contains("Sauce Labs Backpack").click();

    // Verify that Sauce Labs Backpack product page has opened
    cy.url().should("include", "/inventory-item.html?id=4");

    // Remove Sauce Labs Backpack from cart
    cy.contains(".inventory_details_container", "Sauce Labs Backpack")
      .find(".btn_inventory")
      .click();

    // Verify that there is one item in the cart
    cy.contains(".inventory_details_container", "Sauce Labs Backpack")
      .find(".btn_inventory")
      .should("have.text", "ADD TO CART");
    cy.get(".shopping_cart_badge").should("have.text", "1");
  });
});
