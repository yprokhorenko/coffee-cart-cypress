# ☕ Coffee Cart — Cypress E2E

[![E2E](https://github.com/yprokhorenko/coffee-cart-cypress/actions/workflows/e2e.yml/badge.svg)](https://github.com/yprokhorenko/coffee-cart-cypress/actions/workflows/e2e.yml)
[![Cypress](https://img.shields.io/badge/Cypress-16.2.1-17202C?logo=cypress)](https://www.cypress.io/)
[![TypeScript](https://img.shields.io/badge/TypeScript-7-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)

E2E automation for [coffee-cart.app](https://coffee-cart.app), built with **Cypress**, **TypeScript**, **Cucumber BDD**, **Allure Reports**, and **GitHub Issues**.

The suite validates critical menu and cart scenarios while keeping test data, page interactions, reusable components, and assertions well structured.

## 🧪 Test cases

- **TC-01:** `Menu shows every catalog coffee with its price`
- **TC-02:** `Adding a coffee updates the cart counter and total`
- **TC-03:** `Adding a coffee via right click requires confirmation`
- **TC-04:** `Cart page shows the empty state and order contents`
- **TC-05:** `Cart quantity controls update totals and remove items`
- **TC-06:** `Cart contents persist after a page reload`

More scenarios are planned in [GitHub Issues](https://github.com/yprokhorenko/coffee-cart-cypress/issues).

## ⚡ Quick start

Requires **Node.js 22+**.

```bash
npm ci
npm test
npm run cy:open
npm run typecheck
npm run format:check
```

## 📁 Project structure

```text
cypress/
├── e2e/menu/
│   ├── menu-page.cy.ts
│   │   └── displays all catalog coffees with prices
│   ├── add-to-cart.cy.ts
│   │   └── updates cart counter and total
│   └── add-to-cart-confirmation.cy.ts
│       ├── adds coffee after confirmation
│       └── keeps the cart empty after declining
├── e2e/cart/
│   ├── cart-empty.cy.ts
│   │   └── displays the empty-cart state
│   ├── cart-content.cy.ts
│   │   └── displays added items and the order total
│   ├── cart-quantity.cy.ts
│   │   ├── increases item quantity
│   │   ├── removes an item at zero quantity
│   │   └── removes all units with delete
│   └── cart-persistence.cy.ts
│       └── keeps cart items after page reload
├── data/
│   └── coffees.ts           # Single source of catalog data
└── support/
    ├── pages/               # Menu, cart, and navigation actions
    ├── components/          # Reusable UI components
    ├── modals/              # Confirmation and promo dialogs
    └── utils/               # Price and assertion helpers
```

## 🔧 Architecture

- **Page Object pattern** — separates test scenarios from UI interactions
- **Single source of truth** — `cypress/data/coffees.ts` stores catalog names and prices
- **Reusable support modules** — keep specifications readable
- **Strict TypeScript** — supports reliable test and helper code
- **Desktop viewport** — `1920 × 1080`, with configured test retries
- **CI execution** — Chrome tests run on pushes and pull requests to `main`

Tests run against [coffee-cart.app](https://coffee-cart.app). Failed runs upload Cypress screenshots.
