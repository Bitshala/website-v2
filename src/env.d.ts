/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly GOOGLE_KEY?: string;
  readonly X_API_KEY?: string;
  readonly X_API_SECRET?: string;
  readonly X_BEARER_TOKEN?: string;
  readonly X_USERNAME?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
