# ☕ Coffee Cart — Cypress E2E

[![E2E](https://github.com/yprokhorenko/coffee-cart-cypress/actions/workflows/e2e.yml/badge.svg)](https://github.com/yprokhorenko/coffee-cart-cypress/actions/workflows/e2e.yml)
[![Cypress](https://img.shields.io/badge/Cypress-16.2.1-17202C?logo=cypress)](https://www.cypress.io/)
[![TypeScript](https://img.shields.io/badge/TypeScript-7-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)

End-to-end tests for [coffee-cart.app](https://coffee-cart.app), written in **Cypress** and **TypeScript**. The project uses Page Objects, reusable cart flows, catalog-driven test data, and scenarios linked to GitHub Issues.

## 📊 Allure report

[View the latest Allure report for `main`](https://yprokhorenko.github.io/coffee-cart-cypress/reports/main/)

The GitHub Actions workflow runs the Cypress suite on pushes to `main` and pull requests targeting `main`. It generates an Allure HTML report, publishes reports to GitHub Pages for `main` and same-repository PRs, and uploads a report artifact for each run. Reports for fork PRs are available as workflow artifacts.

- Latest `main` report: [GitHub Pages](https://yprokhorenko.github.io/coffee-cart-cypress/reports/main/)
- PR report: `https://yprokhorenko.github.io/coffee-cart-cypress/reports/pr-<PR-number>/`
- Per-run artifacts and Cypress failure screenshots: available in the corresponding [GitHub Actions run](https://github.com/yprokhorenko/coffee-cart-cypress/actions/workflows/e2e.yml)

## 🧪 Test cases

- **TC-01:** Menu displays every catalog coffee with its price
- **TC-02:** Adding coffee updates the cart counter and total
- **TC-03:** Adding coffee by right-click requires confirmation
- **TC-04:** Cart page displays its empty state and order contents
- **TC-05:** Cart quantity controls update quantities and totals; items can be removed
- **TC-06:** Cart contents persist after a page reload

More scenarios are tracked in [GitHub Issues](https://github.com/yprokhorenko/coffee-cart-cypress/issues).

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
├── e2e/
│   ├── menu/
│   │   ├── menu-page.cy.ts
│   │   ├── add-to-cart.cy.ts
│   │   └── add-to-cart-confirmation.cy.ts
│   └── cart/
│       ├── cart-empty.cy.ts
│       ├── cart-content.cy.ts
│       ├── cart-quantity.cy.ts
│       └── cart-persistence.cy.ts
├── data/
│   └── coffees.ts             # Catalog data
└── support/
    ├── pages/                  # Page Objects
    ├── components/             # Reusable UI components
    ├── modals/                 # Confirmation and promotion dialogs
    ├── flows/                  # Shared test setup flows
    └── utils/                  # Cart and money helpers

.github/
└── workflows/
    └── e2e.yml                 # Cypress CI, Allure generation, and publishing
```

## 🔧 Architecture and CI

- **Page Object pattern** separates page interactions from test scenarios.
- **Catalog-driven test data** keeps coffee names and prices in one place.
- **Reusable flows and helpers** reduce duplicated setup and assertions.
- **TypeScript** provides typed test and support code.
- Tests run in Chrome against [coffee-cart.app](https://coffee-cart.app) at a desktop viewport.
- GitHub Actions runs checks for pushes to `main` and pull requests targeting `main`.
- Allure reports are published to GitHub Pages; failed runs also upload Cypress screenshots.
