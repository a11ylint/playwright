// eslint-disable-next-line import/no-extraneous-dependencies
import { test as base, Page } from '@playwright/test';

export type RGAAURLSType = {
  url: string;
  waitingPredicate: (page: Page) => Promise<void>;
};

export type RGAATestsOptions = {
  URLS: RGAAURLSType[];
};

export const test = base.extend<{ URLS: RGAAURLSType[] }>({
  URLS: [[], { option: true }],
});
