/// <reference types="vite/client" />
/// <reference types="vite/client" />

// Add type declarations for your environment variables here if needed
interface ImportMetaEnv {
  readonly VITE_APP_TITLE: string
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}