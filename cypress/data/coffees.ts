export type Coffee = {
  name: string;
  price: string;
};

const coffees = {
  espresso: { name: "Espresso", price: "$10.00" },
  cappuccino: { name: "Cappuccino", price: "$19.00" },
  mocha: { name: "Mocha", price: "$8.00" },
  espressoMacchiato: { name: "Espresso Macchiato", price: "$12.00" },
  flatWhite: { name: "Flat White", price: "$18.00" },
  americano: { name: "Americano", price: "$7.00" },
  cafeLatte: { name: "Cafe Latte", price: "$16.00" },
  espressoConPanna: { name: "Espresso Con Panna", price: "$14.00" },
  cafeBreve: { name: "Cafe Breve", price: "$15.00" },
} satisfies Record<string, Coffee>;

export default coffees;
