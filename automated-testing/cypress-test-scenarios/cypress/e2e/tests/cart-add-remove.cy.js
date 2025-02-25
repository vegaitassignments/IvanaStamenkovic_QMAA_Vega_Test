import { LoginPage } from "../pages/login-page";
import { InventoryPage } from "../pages/inventory-page";
import { ProductPage } from "../pages/product-page";

describe("TC_CART_001 - Verify cart updates correctly", () => {
  beforeEach(() => {
    cy.visit(Cypress.env("baseUrl"));
  });

  it("should update cart image correctly after adding and removing items", () => {
    // Fill out the login form
    cy.get(LoginPage.inputFields.username).type(Cypress.env("username"));
    cy.get(LoginPage.inputFields.password).type(Cypress.env("password"));

    // Verify entered data in the login form
    cy.get(LoginPage.inputFields.username).should(
      "have.value",
      "standard_user"
    );
    cy.get(LoginPage.inputFields.password).should("not.have.value", "");

    // Log in
    cy.get(LoginPage.buttons.loginButton).click();

    // Verify redirection to inventory page
    cy.url().should("include", "/inventory.html");
    cy.get(InventoryPage.inventoryItem).should("have.length", 6);

    // Add Sauce Labs Backpack to cart
    cy.contains(InventoryPage.inventoryItem, "Sauce Labs Backpack")
      .find(InventoryPage.productButtons.addToCart)
      .click();

    // Verify that the ADD TO CART button changed to REMOVE
    cy.contains(InventoryPage.inventoryItem, "Sauce Labs Backpack")
      .find(InventoryPage.productButtons.removeFromCart)
      .should("have.text", "REMOVE");

    // Verify that the cart icon updates to display 1 item
    cy.get(InventoryPage.cartBadge).should("have.text", "1");

    // Add Sauce Labs Onesie to cart
    cy.contains(InventoryPage.inventoryItem, "Sauce Labs Onesie")
      .find(InventoryPage.productButtons.addToCart)
      .click();

    // Verify that the ADD TO CART button changed to REMOVE
    cy.contains(InventoryPage.inventoryItem, "Sauce Labs Onesie")
      .find(InventoryPage.productButtons.removeFromCart)
      .should("have.text", "REMOVE");

    // Verify that the cart icon updates to display 2 items
    cy.get(InventoryPage.cartBadge).should("have.text", "2");

    // Open Sauce Labs Backpack product page
    cy.get(InventoryPage.inventoryItemTitle)
      .contains("Sauce Labs Backpack")
      .click();

    // Verify that Sauce Labs Backpack product page has opened
    cy.url().should("include", "/inventory-item.html?id=4");

    // Remove Sauce Labs Backpack from cart
    cy.contains(ProductPage.itemDetails, "Sauce Labs Backpack")
      .find(ProductPage.productButtons.removeFromCart)
      .click();

    // Verify that there is one item in the cart
    cy.contains(ProductPage.itemDetails, "Sauce Labs Backpack")
      .find(ProductPage.productButtons.addToCart)
      .should("have.text", "ADD TO CART");
    cy.get(InventoryPage.cartBadge).should("have.text", "1");
  });
});
