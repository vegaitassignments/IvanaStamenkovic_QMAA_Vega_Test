import { InventoryPage } from "../pages/inventory-page";
import { LoginPage } from "../pages/login-page";

describe("TC_RESET_001 - Verify that the application state resets successfully", () => {
  beforeEach(() => {
    cy.visit(Cypress.env("baseUrl"));
  });

  it("should reset the cart and product states after clicking Reset App State", () => {
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

    // Add Sauce Labs Onesie to cart
    cy.contains(InventoryPage.inventoryItem, "Sauce Labs Onesie")
      .find(InventoryPage.productButtons.addToCart)
      .click();

    // Verify that the cart icon updates to display 1 item
    cy.get(InventoryPage.cartBadge).should("have.text", "1");

    // Click on the burger menu on the left
    cy.get(InventoryPage.burgerMenu).click();

    // Verify that the burger menu is visible
    cy.get(InventoryPage.burgerMenuItems).should("be.visible");

    // Click the Reset App State button
    cy.get(InventoryPage.resetButton).click();

    // Verify that the app state has resetted
    cy.get(InventoryPage.cartBadge).should("not.exist");
    cy.contains(InventoryPage.inventoryItem, "Sauce Labs Onesie")
      .find(InventoryPage.productButtons.addToCart)
      .should("have.text", "ADD TO CART");
  });
});
