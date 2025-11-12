import { fileURLToPath } from 'url';
import path from 'path';
import type { Page } from 'playwright/test';
import A11ylint from '@a11ylint/core';
import type { SvgImageArea, VirtualContrastsElement, FormFieldElement } from '@a11ylint/core';
import type { RGAAURLSType } from './types.js';
import { groupResultsByBaseUrl } from './utils.js';

type PlaywrightOptions = {
  html: boolean;
  json: boolean;
  cli: boolean;
};

export class Playwright {
  public async analyze({ options, page, urls }: { options: PlaywrightOptions; page: Page; urls: RGAAURLSType[] }) {
    const A11ylintInstance = new A11ylint();
    const resultsOfPages: { url: string; result: unknown }[] = [];

    // Expose RGAA8 methods to the browser context
    await page.exposeFunction(
      'accessibilityTesting',
      (
        document: Document,
        images: Array<SvgImageArea>,
        frames: Array<HTMLIFrameElement | HTMLFrameElement>,
        colors: Array<VirtualContrastsElement>,
        inputs: Array<FormFieldElement | HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
      ) =>
        A11ylintInstance.run({
          mode: 'virtual',
          document,
          images,
          frames,
          colorsElements: colors,
          customIframeBannedWords: [],
          formFields: inputs,
        }),
    );

    // Injecte les helpers DOM dans le contexte navigateur
    const filename = fileURLToPath(import.meta.url);
    const dirname = path.dirname(filename);
    await page.addInitScript({ path: path.join(dirname, '..', 'browserHelpers', 'browserUtils.js') });

    for (const urlObj of urls) {
      await page.goto(urlObj.url);
      await page.waitForLoadState('domcontentloaded');
      await urlObj.waitingPredicate(page);
      const results = await page.evaluate(() => {
        const frames = window.A11YLINT_PLAYWRIGHT.extractFrames();
        const images = window.A11YLINT_PLAYWRIGHT.extractImages();
        const documentData = window.A11YLINT_PLAYWRIGHT.extractDocumentData();
        const colorsContrast = window.A11YLINT_PLAYWRIGHT.extractColorContrasts();
        const inputs = window.A11YLINT_PLAYWRIGHT.extractFormFields();
        // @ts-expect-error: accessibilityTesting is injected by exposeFunction
        return window.accessibilityTesting(documentData, images, frames, colorsContrast, inputs);
      });
      resultsOfPages.push({ url: urlObj.url, result: results });
    }

    const groupedResults = groupResultsByBaseUrl(resultsOfPages, urls);
    Array.from(groupedResults).forEach(([baseUrl, urlsGroup]) => {
      A11ylintInstance.generateAudit({
        results: urlsGroup,
        options: {
          ...options,
          baseUrl,
        },
      });
    });
  }
}
