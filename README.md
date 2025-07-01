# @a11ylint/playwright

[![Build](https://github.com/a11ylint/playwright/actions/workflows/build.yaml/badge.svg)](https://github.com/a11ylint/playwright/actions/workflows/build.yaml)
[![GitHub License](https://img.shields.io/github/license/pplancq/svg-tools)](https://github.com/pplancq/svg-tools?tab=MIT-1-ov-file#readme)

This package demonstrates how to use [@a11ylint/playwright](https://github.com/a11ylint/core) with [Playwright](https://playwright.dev/) to automate accessibility testing according to the French RGAA (Référentiel Général d'Amélioration de l'Accessibilité) guidelines.  
For more information on RGAA, visit [https://accessibilite.numerique.gouv.fr](https://accessibilite.numerique.gouv.fr).

## Why Playwright + a11ylint?

Playwright is a powerful browser automation tool, and combining it with `@a11ylint/playwright` allows you to:
- Run automated accessibility audits on real web pages and user flows.
- Integrate RGAA compliance checks into your CI/CD pipelines.
- Generate detailed accessibility reports (HTML, JSON, CLI).

## How to use it

### 1. Install dependencies

```sh
npm install @a11ylint/playwright
```

### 2. Write your Playwright test

```typescript
import { test } from '@playwright/test';
import PlaywrightA11ylint from '@a11ylint/playwright';

test('RGAA audit on example.com', async ({ page }) => {
  const a11ylint = new PlaywrightA11ylint();
  await a11ylint.analyze({
    options: { html: true, json: true, cli: true },
    page,
    urls: [
      { url: 'https://example.com', textToWait: 'Example Domain' }
    ]
  });
});
```

### 3. Run your tests

```sh
npx playwright test
```

### 4. View the reports

- Audit reports (HTML, JSON, CLI) are generated in your project directory (see your test or config for output location).

## 🚧 Under Construction

This repository is currently under active development.
While the foundation is being laid, please note that certain features and components may still be incomplete.
Stay tuned for updates as we build a robust and cohesive design system.

## License

MIT
