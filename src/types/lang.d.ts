// Any, because we cannot cast types in templates;
export type Lang = Record<string, any>;

declare module "@vue/runtime-core" {
  export interface ComponentCustomProperties {
    $lang: Lang;
  }
}
