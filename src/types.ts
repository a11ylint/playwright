import { Page } from '@playwright/test';

export type RGAAURLSType = {
  url: string;
  waitingPredicate: (page: Page) => Promise<unknown>;
};
