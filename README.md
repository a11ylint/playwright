# @a11ylint/playwright

[![Build](https://github.com/a11ylint/playwright/actions/workflows/build.yaml/badge.svg)](https://github.com/a11ylint/playwright/actions/workflows/build.yaml)
[![GitHub License](https://img.shields.io/github/license/pplancq/svg-tools)](https://github.com/pplancq/svg-tools?tab=MIT-1-ov-file#readme)

A Playwright integration for [@a11ylint/core](https://github.com/a11ylint/core) that enables automated accessibility testing according to French RGAA (Référentiel Général d'Amélioration de l'Accessibilité) guidelines in your end-to-end tests.

## 🎯 About

@a11ylint/playwright is a specialized wrapper around [@a11ylint/core](https://github.com/a11ylint/core) designed to seamlessly integrate French RGAA accessibility testing into your Playwright test suites. It automates the process of running accessibility audits on real web pages during your browser automation workflows.

This project continues the work of [@a11ylint/core](https://github.com/a11ylint/core) by providing an easy-to-use Playwright implementation, making RGAA compliance testing accessible to developers using browser automation.

For more information on RGAA guidelines, visit [https://accessibilite.numerique.gouv.fr](https://accessibilite.numerique.gouv.fr).

## 🚧 Under Construction

This repository is currently under active development as part of the broader @a11ylint ecosystem.
While the core functionality is stable and ready for use, we're continuously adding new features and improvements.

**Current Status**: Alpha version available - suitable for testing and feedback

**Upcoming Features**:
- Enhanced error handling and debugging
- Custom reporter plugins
- Integration with popular CI/CD platforms  
- Performance optimizations for large test suites
- Extended RGAA rule coverage as @a11ylint/core evolves

## ✨ Features

- **Seamless Playwright Integration**: Drop-in solution for existing Playwright test suites
- **Real Browser Testing**: Test accessibility on actual rendered pages with user interactions
- **Multiple Report Formats**: Generate HTML, JSON, and CLI reports directly from your tests
- **RGAA Compliance**: Full support for French accessibility standards via @a11ylint/core
- **CI/CD Ready**: Perfect for automated accessibility testing in continuous integration pipelines
- **Multi-URL Support**: Test complete user journeys across multiple pages in a single audit
- **Custom Wait Conditions**: Define custom waiting predicates for dynamic content
- **Alpha Version Available**: Ready for testing and feedback

## 🚀 Quick Start

### Installation

```bash
npm install @a11ylint/playwright
```

### Basic Usage

```typescript
import { test } from '@playwright/test';
import PlaywrightA11ylint from '@a11ylint/playwright';

test('RGAA accessibility audit', async ({ page }) => {
  const a11ylint = new PlaywrightA11ylint();
  
  await a11ylint.analyze({
    options: { 
      html: true,   // Generate HTML report
      json: true,   // Generate JSON report  
      cli: true     // Show CLI output
    },
    page,
    urls: [
      { 
        url: 'https://example.com', 
        waitingPredicate: async () => {
          // Wait for specific content to load
          await page.waitForSelector('[data-testid="main-content"]');
        }
      }
    ]
  });
});
```

### Advanced Example with Multiple Pages

```typescript
import { test } from '@playwright/test';
import PlaywrightA11ylint from '@a11ylint/playwright';

test('Complete user journey accessibility audit', async ({ page }) => {
  const a11ylint = new PlaywrightA11ylint();
  
  await a11ylint.analyze({
    options: { 
      html: true, 
      json: true, 
      cli: false 
    },
    page,
    urls: [
      {
        url: 'https://myapp.com',
        waitingPredicate: async () => {
          await page.waitForSelector('header nav');
        }
      },
      {
        url: 'https://myapp.com/products',
        waitingPredicate: async () => {
          await page.waitForLoadState('networkidle');
          await page.waitForSelector('.product-grid');
        }
      },
      {
        url: 'https://myapp.com/contact',
        waitingPredicate: async () => {
          await page.waitForSelector('form[name="contact"]');
        }
      }
    ]
  });
});
```

### Using with Playwright Fixtures

Create a fixture file for reusable URL configurations:

```typescript
// fixtures/accessibility.ts
import { test as base } from '@playwright/test';

export type RGAAURLSType = {
  url: string;
  waitingPredicate: () => Promise<void>;
};

export const test = base.extend<{ URLS: RGAAURLSType[] }>({
  URLS: [[], { option: true }],
});
```

Then use it in your Playwright config:

```typescript
// playwright.config.ts
import { defineConfig } from '@playwright/test';

export default defineConfig({
  // ...existing config...
  projects: [
    {
      name: 'Accessibility',
      use: {
        URLS: [
          {
            url: 'https://playwright.dev',
            waitingPredicate: async () => {
              await page.waitForSelector('text=Playwright enables');
            }
          },
          {
            url: 'https://example.com/about',
            waitingPredicate: async () => {
              await page.waitForLoadState('networkidle');
            }
          }
        ],
      },
    },
  ],
});
```

## 📊 Report Generation

The tool generates comprehensive accessibility reports in multiple formats:

### HTML Reports
- Interactive visual reports with detailed issue descriptions
- RGAA rule references and remediation guidance
- Element-specific code examples and context
- Grouped by severity and rule categories

### JSON Reports  
- Machine-readable format for CI/CD integration
- Structured data for custom processing and dashboard integration
- Perfect for automated quality gates and metrics tracking

### CLI Reports
- Terminal output for immediate feedback during development
- Summary of issues grouped by severity and page
- Quick overview for continuous integration logs

## 🔧 API Reference

### `PlaywrightA11ylint.analyze(options)`

Analyzes the specified URLs for RGAA accessibility compliance.

#### Parameters

- **`options.page`** (Page): Playwright page instance
- **`options.urls`** (Array): Array of URL objects to test
  - `url` (string): The URL to test
  - `waitingPredicate` (function): Async function to wait for page readiness
- **`options.options`** (Object): Report generation options
  - `html` (boolean): Generate HTML report
  - `json` (boolean): Generate JSON report
  - `cli` (boolean): Show CLI output

#### Example waitingPredicate Functions

```typescript
// Wait for specific text content
waitingPredicate: async () => {
  await page.waitForSelector('text=Welcome to our site');
}

// Wait for network to be idle
waitingPredicate: async () => {
  await page.waitForLoadState('networkidle');
}

// Wait for multiple conditions
waitingPredicate: async () => {
  await page.waitForSelector('.main-content');
  await page.waitForSelector('.navigation');
  await page.waitForLoadState('domcontentloaded');
}

// Custom waiting logic
waitingPredicate: async () => {
  await page.waitForFunction(() => {
    return document.querySelectorAll('.dynamic-content').length > 0;
  });
}
```

## 💡 Why Playwright + a11ylint?

Combining Playwright's powerful browser automation with @a11ylint/core's comprehensive RGAA testing provides:

- **Real User Scenarios**: Test accessibility as users actually experience your site
- **Dynamic Content Support**: Handle SPAs, lazy loading, and interactive elements
- **Comprehensive Coverage**: Test complete user journeys, not just static pages
- **CI/CD Integration**: Automated accessibility testing in your deployment pipeline
- **French Compliance**: Specific support for RGAA guidelines required by French regulations
- **Easy Integration**: Simple API that fits naturally into existing Playwright workflows

## 🤝 Contributing

We welcome contributions! This project follows the same contributing guidelines as [@a11ylint/core](https://github.com/a11ylint/core). Please see our [Contributing Guide](CONTRIBUTING.md) for details.

## 📚 Related Projects

- [@a11ylint/core](https://github.com/a11ylint/core) - The core accessibility testing engine
- [Playwright](https://playwright.dev/) - Browser automation framework

## 📄 License

MIT

---

**Made with ❤️ for French web accessibility testing**
