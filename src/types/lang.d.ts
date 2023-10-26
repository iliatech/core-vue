// Any, because we cannot cast types in templates;
import { lang } from "@/lang";

export type Lang = Record<string, any>;

declare module "@vue/runtime-core" {
  export interface ComponentCustomProperties {
    $lang: typeof lang;
  }
}
