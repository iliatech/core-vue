import type { TableConfig } from "@/types/tables";

import { UniversalObjectsIds } from "@/universal/enums";
import { drawersConfigs } from "@/universal/drawersConfigs";
import { idColumn, standardActionColumn } from "@/universal/standardColumns";

export const tablesConfigs: Record<string, TableConfig> = {
  [UniversalObjectsIds.Verbs]: [
    idColumn,
    ...(drawersConfigs[UniversalObjectsIds.Verbs] as TableConfig),
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
    ...(drawersConfigs[UniversalObjectsIds.VerbsForms] as TableConfig),
    standardActionColumn,
  ],
  [UniversalObjectsIds.VerbsPronombres]: [
    idColumn,
    ...(drawersConfigs[UniversalObjectsIds.VerbsPronombres] as TableConfig),
    standardActionColumn,
  ],
};
