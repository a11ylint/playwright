export type RGAAURLSType = {
  url: string;
  waitingPredicate: () => Promise<unknown>;
};
