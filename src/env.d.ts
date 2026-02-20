/// <reference types="vite/client" />

interface ImportMetaEnv {
	readonly VITE_APP_NAME: string;
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}

// Server-side environment variables
declare global {
	namespace NodeJS {
		interface ProcessEnv {
			readonly DEMO_ENV_VAR: string;
		}
	}
}

export {};
