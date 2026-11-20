import type { Coffee } from "../../data/coffees";
import { formatCents, toCents } from "./money";

/** One cart entry: a catalog coffee and how many times it was added. */
export type CartLine = { coffee: Coffee; quantity: number };

/** Shorthand for building lines: cartLine(espresso, 2). */
export const cartLine = (coffee: Coffee, quantity = 1): CartLine => ({
  coffee,
  quantity,
});

// All sums are done in cents (integers) to avoid floating-point errors.
export const subtotalCents = ({ coffee, quantity }: CartLine): number =>
  toCents(coffee.price) * quantity;

/** Expected order total as a price string, e.g. "$28.00". */
export const formatTotal = (lines: ReadonlyArray<CartLine>): string =>
  formatCents(lines.reduce((sum, line) => sum + subtotalCents(line), 0));

/** Expected cart counter value: total number of items, not rows. */
export const countItems = (lines: ReadonlyArray<CartLine>): number =>
  lines.reduce((sum, line) => sum + line.quantity, 0);
