import { LoginPage } from '../pages/login-page';

describe("TC_RESET_001 - Verify that the application state resets successfully", () => {
  beforeEach(() => {
    cy.visit(Cypress.env("baseUrl"));
  });

  it("should reset the cart and product states after clicking Reset App State", () => {
    // Fill out the login form
    cy.get(LoginPage.inputFields.username).type(Cypress.env("username"));
    cy.get(LoginPage.inputFields.password).type(Cypress.env("password"));

    // Verify entered data in the login form
    cy.get(LoginPage.inputFields.username).should("have.value", "standard_user");
    cy.get(LoginPage.inputFields.password).should("not.have.value", "");

    // Log in
    cy.get(LoginPage.buttons.loginButton).click();

    // Verify redirection to inventory page
    cy.url().should("include", "/inventory.html");
    cy.get(".inventory_item").should("have.length", 6);

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
