// used for type declarations in the browser context for Playwright
// This file should not be imported directly, it is used to declare global types
declare global {
  interface Window {
    A11YLINT_PLAYWRIGHT: {
      extractFrames: () => unknown;
      extractImages: () => unknown;
      extractDocumentData: () => unknown;
      extractColorContrasts: () => unknown;
      extractFormFields: () => unknown;
    };
  }
}
export {};
