import { defineConfig } from '@pplancq/eslint-config';

export default defineConfig({
  enableVitest: false,
  enablePrettier: 'on',
  extendConfig: [
    {
      files: ['**/*.ts', '**/*.js'],
      rules: {
        'class-methods-use-this': 'off',
        'no-await-in-loop': 'off',
        'no-restricted-syntax': 'off',
      },
    },
  ],
});
