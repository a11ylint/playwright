import { defineConfig } from '@pplancq/eslint-config';

export default defineConfig({
  enableVitest: false,
  enablePrettier: 'on',
  extendConfig: [
    {
      files: ['**/*.ts', '**/*.js'],
      rules: {
        'class-methods-use-this': 'off',
      },
    },
  ],
});
