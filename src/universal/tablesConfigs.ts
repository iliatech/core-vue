import type { TableConfig } from "@/types/tables";

import { UniversalObjectsIds } from "@/universal/enums";
import { fieldsConfigs } from "@/universal/fieldsConfigs";
import { idColumn, standardActionColumn } from "@/universal/standardColumns";

export const tablesConfigs: Record<string, TableConfig> = {
  [UniversalObjectsIds.Verbs]: [
    idColumn,
    ...(fieldsConfigs[UniversalObjectsIds.Verbs] as TableConfig),
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
    ...(fieldsConfigs[UniversalObjectsIds.VerbsForms] as TableConfig),
    standardActionColumn,
  ],
  [UniversalObjectsIds.VerbsPronombres]: [
    idColumn,
    ...(fieldsConfigs[UniversalObjectsIds.VerbsPronombres] as TableConfig),
    standardActionColumn,
  ],
};
