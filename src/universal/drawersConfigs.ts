import type { DrawerConfig } from "@/types/common";
import { FieldsTypes } from "@/types/common";

import { UniversalObjectsIds } from "@/universal/enums";

export const drawersConfigs: Record<string, DrawerConfig> = {
  [UniversalObjectsIds.Credentials]: [
    {
      id: "7265b3a6-92e1-436e-bea1-7587b20f0459",
      type: FieldsTypes.String,
      label: "Name",
      required: true,
    },
    {
      id: "a1334c91-bade-46ba-92e1-87a9cc4321a3",
      type: FieldsTypes.Selector,
      label: "Type",
      // TODO Return for use credentials types to select.
      //sourceObjectId: UniversalObjectsIds.CredentialsTypes,
      sourceObjectId: UniversalObjectsIds.Credentials,
      sourceObjectFieldId: "7265b3a6-92e1-436e-bea1-7587b20f0459",
      required: true,
    },
    {
      id: "729c0e89-eb07-4209-8578-90871942bb6f",
      type: FieldsTypes.Password,
      label: "Password",
    },
    {
      id: "70e5e4805-ab32-4062-8ac2-0b228a6f8faa",
      type: FieldsTypes.Text,
      label: "Description",
    },
  ],
};
