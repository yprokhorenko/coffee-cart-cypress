export function toCents(price: string): number {
  // Extract dollars and cents from a price string formatted as "$X.XX" using a regular expression.
  const match = /^\$(\d+)\.(\d{2})$/.exec(price.trim());

  if (!match) {
    throw new Error(`Invalid price format: "${price}"`);
  }

  // Return the price in cents to avoid floating-point calculation errors.
  return Number(match[1]) * 100 + Number(match[2]);
}

export function formatCents(cents: number): string {
  // Return only a valid, non-negative integer number of cents.
  if (!Number.isInteger(cents) || cents < 0) {
    throw new Error(`Invalid amount in cents: ${cents}`);
  }

  const dollars = Math.floor(cents / 100);
  const remainingCents = cents % 100;

  // Format cents as a currency string with two decimal places.
  return `$${dollars}.${String(remainingCents).padStart(2, "0")}`;
}
