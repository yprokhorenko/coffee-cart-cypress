import coffees from "../../data/coffees";

export class MenuPage {
  private readonly coffeeCards = "ul > li:has(> h4):has([data-cy])";
  private readonly totalButton = '[data-test="checkout"]';

  visit(): void {
    cy.visit("/");
  }

  verifyEmptyCartState(): void {
    cy.get(this.totalButton).should("contain.text", "$0.00");
  }

  verifyCoffeeVisibleWithPrice(coffeeName: string, price: string): void {
    cy.contains(this.coffeeCards, coffeeName)
      .should("be.visible")
      .and("contain.text", price);
  }

  verifyAllCatalogItemsAreVisible(): void {
    coffees.forEach((coffee) => {
      this.verifyCoffeeVisibleWithPrice(coffee.name, coffee.price);
    });
  }
  addCoffee(coffeeName: string): void {
    cy.get(this.coffeeCards)
      .filter((_, element) => {
        const title = Cypress.$(element)
          .find("h4")
          .first()
          .contents()
          .first()
          .text()
          .trim();

        return title === coffeeName;
      })
      .first()
      .find("[data-cy]")
      .should("be.visible")
      .click();
  }

  verifyTotal(expectedTotal: string): void {
    cy.get(this.totalButton)
      .should("be.visible")
      .and("contain.text", expectedTotal);
  }
}
