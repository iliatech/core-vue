export enum NodeMode {
  Development = "development",
}

export enum LocalStorageKeys {
  CredentialDatabaseKey = "credentialDatabaseKey",
}

export const CLOUDFLARE_TURNSTILE_SITE_KEY: string = import.meta.env
  .VITE_CLOUDFLARE_TURNSTILE_SITE_KEY;
