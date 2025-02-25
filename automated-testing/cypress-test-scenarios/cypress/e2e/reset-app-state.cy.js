describe("TC_RESET_001 - Verify that the application state resets successfully", () => {
  beforeEach(() => {
    cy.visit("https://www.saucedemo.com/v1/index.html");
  });

  it("should reset the cart and product states after clicking Reset App State", () => {
    // Log in
    cy.get("[data-test='username']").type("standard_user");
    cy.get("[data-test='password']").type("secret_sauce");
    cy.get("#login-button").click();

    // Verify redirection to inventory page
    cy.url().should("include", "/inventory.html");

    // Add Sauce Labs Onesie to cart
    cy.contains(".inventory_item", "Sauce Labs Onesie")
      .find(".btn_inventory")
      .click();

    // Verify that the cart icon updates to display 1 item
    cy.get(".shopping_cart_badge").should("have.text", "1");

    // Click on the burger menu on the left
    cy.get(".bm-burger-button").click();

    // Verify that the burger menu is visible
    cy.get(".bm-item-list").should("be.visible");

    // Click the Reset App State button
    cy.get("#reset_sidebar_link").click();

    // Verify that the app state has resetted
    cy.get(".shopping_cart_badge").should("not.exist");
    cy.contains(".inventory_item", "Sauce Labs Onesie")
      .find(".btn_inventory")
      .should("have.text", "ADD TO CART");
  });
});
