export class Header {
  private readonly cartCounter = 'a[aria-label="Cart page"]';

  verifyCartCounter(expectedCount: string): void {
    cy.get(this.cartCounter).should("have.text", String(expectedCount));
  }
}
