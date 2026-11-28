import { Header } from "./components/layout/header";
import { MenuPage } from "./pages/MenuPage";
import type { CartLine } from "./utils/cart";

const menuPage = new MenuPage();
const header = new Header();

/** Common precondition: the given lines are in the cart and the cart page is open. */
export function openCartWith(lines: ReadonlyArray<CartLine>): void {
  menuPage.visit();
  menuPage.addCoffees(lines);
  header.openCart();
}
