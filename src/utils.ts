/* eslint-disable @typescript-eslint/no-explicit-any */
import { RGAAURLSType } from './types.js';

const groupResultsByBaseUrl = (results: Array<{ url: string; result: any }>, URLS: RGAAURLSType[]) => {
  const groupedResults = new Map<string, Array<{ url: string; result: any }>>();
  URLS.forEach(urlObj => {
    const resultObj = results.find(r => r.url === urlObj.url);
    const baseUrl = new URL(urlObj.url).origin;

    // Group by base URL
    if (!groupedResults.has(baseUrl)) {
      groupedResults.set(baseUrl, []);
    }
    groupedResults.get(baseUrl)?.push({ url: urlObj.url, result: resultObj?.result });
  });
  return groupedResults;
};
export { groupResultsByBaseUrl };
