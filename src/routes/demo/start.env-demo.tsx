import { createFileRoute } from '@tanstack/react-router';
import { createServerFn } from '@tanstack/react-start';
import { useRuntimeConfig } from 'nitro/runtime-config';
import { useState } from 'react';

const getEnvVariable = createServerFn({
  method: 'GET',
}).handler(async () => {
  console.log('GETTING ENV VAR', process.env);
  const config = useRuntimeConfig();
  console.log('🚀 ~ config:', config.demoEnvVar);
  const serverEnv = config.demoEnvVar || 'Environment variable not set';
  return serverEnv;
});

const getEnvsVariable = createServerFn({
  method: 'GET',
}).handler(async () => {
  console.log('GETTING ENV VAR', process.env);
  return JSON.stringify(process.env);
});

export const Route = createFileRoute('/demo/start/env-demo')({
  component: Home,
  loader: async () => await getEnvVariable(),
});

function Home() {
  const originalServerEnv = Route.useLoaderData();
  const [serverEnv, setServerEnv] = useState(originalServerEnv);
  const [allEnvs, setAllEnvs] = useState<string>('');

  // Client-side environment variable (only VITE_ prefixed are available)
  const clientEnv = import.meta.env.VITE_APP_NAME || 'Client env not set';

  return (
    <div
      className="flex items-center justify-center min-h-screen bg-gradient-to-br from-zinc-800 to-black p-4 text-white"
      style={{
        backgroundImage:
          'radial-gradient(50% 50% at 20% 60%, #23272a 0%, #18181b 50%, #000000 100%)',
      }}
    >
      <div className="w-full max-w-2xl p-8 rounded-xl backdrop-blur-md bg-black/50 shadow-xl border-8 border-black/10">
        <h1 className="text-2xl mb-4">Start Environment Variables Demo</h1>
        <div className="flex flex-col gap-4">
          <div className="bg-gray-800/50 p-4 rounded-lg">
            <h2 className="text-lg font-semibold mb-2 text-green-400">
              Server-Side Environment Variable
            </h2>
            <div className="text-sm">
              Initial Server Value: {originalServerEnv}
            </div>
            <div className="text-sm">Current Server Value: {serverEnv}</div>
            <div className="text-xs text-gray-400 mt-2">
              This variable (DEMO_ENV_VAR) is only accessible on the server side
              and stays secure.
            </div>
          </div>

          <div className="bg-gray-800/50 p-4 rounded-lg">
            <h2 className="text-lg font-semibold mb-2 text-blue-400">
              Client-Side Environment Variable
            </h2>
            <div className="text-sm">Client Value: {clientEnv}</div>
            <div className="text-xs text-gray-400 mt-2">
              This variable (VITE_APP_NAME) is bundled with the client code and
              visible to users.
            </div>
          </div>

          <button
            type="button"
            className="bg-green-500 hover:bg-green-600 disabled:bg-green-500/50 disabled:cursor-not-allowed text-white font-bold py-3 px-4 rounded-lg transition-colors"
            onClick={async () => setServerEnv(await getEnvVariable())}
          >
            Refresh Server Environment Variable
          </button>
          <button
            type="button"
            className="bg-green-500 hover:bg-green-600 disabled:bg-green-500/50 disabled:cursor-not-allowed text-white font-bold py-3 px-4 rounded-lg transition-colors"
            onClick={async () => setAllEnvs(await getEnvsVariable())}
          >
            Get All Server Environment Variables
          </button>

          <div>
            {allEnvs && (
              <div className="bg-gray-800/50 p-4 rounded-lg mt-4">
                <h2 className="text-lg font-semibold mb-2 text-yellow-400">
                  All Server Environment Variables
                </h2>

                <pre className="text-xs text-gray-300">
                  {JSON.stringify(JSON.parse(allEnvs), null, 2)}
                </pre>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
