import { InventoryPage } from "../pages/inventory-page";
import { LoginPage } from "../pages/login-page";

describe("TC_SORT_001 - Verify products are sorted correctly", () => {
  beforeEach(() => {
    cy.visit(Cypress.env("baseUrl"));
  });

  it("should sort products correctly after selecting sort - price (low to high)", () => {
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

    // Verify dropdown menu is visible
    cy.get(InventoryPage.sortContainer).should("be.visible");

    // Select Price (low to high) option
    cy.get(InventoryPage.sortContainer)
      .select("lohi")
      .should("have.value", "lohi");

    // Verify that each next price is greater than or equal to the previous one
    let previousPrice = 0;
    cy.get(InventoryPage.productPrice).each(($el, index, $list) => {
      cy.wrap($el)
        .invoke("text")
        .then((text) => {
          const currentPrice = parseFloat(text.replace("$", "").trim());
          if (index > 0) {
            expect(currentPrice).to.be.at.least(previousPrice);
          }
          previousPrice = currentPrice;
        });
    });
  });
});
