import { InventoryPage } from "../pages/inventory-page";
import { LoginPage } from "../pages/login-page";
import { CartPage } from "../pages/cart-page";


describe("TC_CHECKOUT_001 - Verify that user can checkout", () => {
  beforeEach(() => {
    cy.visit(Cypress.env("baseUrl"));
  });

  it("should ... after ...", () => {
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

    // Add Sauce Labs Fleece Jacket to cart
    cy.contains(InventoryPage.inventoryItem, "Sauce Labs Fleece Jacket")
      .find(InventoryPage.productButtons.addToCart)
      .click();

    // Verify that the cart icon updates to display 1 item
    cy.get(InventoryPage.cartBadge).should("have.text", "1");

    // Open cart page
    cy.get(InventoryPage.cartIcon).click();

    // Verify redirection to cart page
    cy.url().should("include", "/cart.html");

    // Proceed to checkout
    cy.get(CartPage.buttons.checkoutButton).click();

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
