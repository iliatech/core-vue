import { UniversalObjectsIds } from "@/universal/enums";
import { fieldsConfigs } from "@/universal/fieldsConfigs";
import { idColumn, standardActionColumn } from "@/universal/standardColumns";
import type { FieldConfig } from "@/types/common";

export const tablesConfigs: Record<string, FieldConfig[]> = {
  [UniversalObjectsIds.Verbs]: [
    idColumn,
    ...(fieldsConfigs[UniversalObjectsIds.Verbs] as FieldConfig),
    // TODO Didn't delete because I'm going to use same approach.
    // {
    //   id: "password",
    //   label: "Password",
    //   getComponents: ({ value }) => [
    //     {
    //       component: UniversalPassword,
    //       props: {
    //         value: value,
    //         entityLabel: "Password",
    //       },
    //     },
    //   ],
    // },
    standardActionColumn,
  ],
  [UniversalObjectsIds.VerbsForms]: [
    idColumn,
    ...(fieldsConfigs[UniversalObjectsIds.VerbsForms] as FieldConfig),
    standardActionColumn,
  ],
  [UniversalObjectsIds.VerbsPronombres]: [
    idColumn,
    ...(fieldsConfigs[UniversalObjectsIds.VerbsPronombres] as FieldConfig),
    standardActionColumn,
  ],
};
