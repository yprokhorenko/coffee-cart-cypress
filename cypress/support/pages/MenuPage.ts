import coffees from "../../data/coffees";

export class MenuPage {
  private readonly coffeeCards = "li:has([data-cy])";
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
}
