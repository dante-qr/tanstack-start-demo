import { defineNitroConfig } from 'nitro/config';

export default defineNitroConfig({
  preset: 'aws-amplify',
  runtimeConfig: {
    demoEnvVar: process.env.DEMO_ENV_VAR || '',
  },
});
