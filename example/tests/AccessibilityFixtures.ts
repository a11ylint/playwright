// eslint-disable-next-line import/no-extraneous-dependencies
import { test as base } from '@playwright/test';

export type RGAAURLSType = {
  url: string;
  textToWait: string;
};

export type RGAATestsOptions = {
  URLS: RGAAURLSType[];
};

export const test = base.extend<{ URLS: RGAAURLSType[] }>({
  URLS: [[], { option: true }],
});
