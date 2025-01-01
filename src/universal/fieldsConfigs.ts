import type { DrawerConfig } from "@/types/common";
import { FieldsTypes } from "@/types/common";

import { UniversalObjectsIds } from "@/universal/enums";

export const fieldsConfigs: Record<string, DrawerConfig> = {
  [UniversalObjectsIds.Verbs]: [
    {
      id: "7265b3a6-92e1-436e-bea1-7587b20f0459",
      type: FieldsTypes.String,
      label: "Verbo",
      required: true,
      defaultSort: true,
      sortable: true,
      filterable: true,
    },
    {
      id: "9a696f7c-64eb-4b0c-b97b-f93d5e0dc294",
      type: FieldsTypes.Selector,
      selectorFilter: {
        fieldId: "a1334c91-bade-46ba-92e1-87a9cc4321a3",
        value: "09a157c9-96c8-49a5-a40f-8dcf8bbcc61d",
      },
      label: "Infinitivo",
      linkedObjectId: UniversalObjectsIds.Verbs,
      linkedObjectFieldId: "7265b3a6-92e1-436e-bea1-7587b20f0459",
      required: true,
      filterable: true,
    },
    {
      id: "a1334c91-bade-46ba-92e1-87a9cc4321a3",
      type: FieldsTypes.Selector,
      label: "Form",
      linkedObjectId: UniversalObjectsIds.VerbsForms,
      linkedObjectFieldId: "7beefc42-7fd7-4322-b9a8-c48bad098f01",
      required: true,
      filterable: true,
    },
    {
      id: "5c4db1ff-25f1-4c0b-937e-9bfe3bdf2d54",
      type: FieldsTypes.Selector,
      label: "Pronombre",
      linkedObjectId: UniversalObjectsIds.VerbsPronombres,
      linkedObjectFieldId: "12d1dd74-4caf-4310-b392-fd6fea1ca1e0",
      required: true,
      filterable: true,
    },
  ],
  [UniversalObjectsIds.VerbsForms]: [
    {
      id: "7beefc42-7fd7-4322-b9a8-c48bad098f01",
      type: FieldsTypes.String,
      label: "Form",
      required: true,
      filterable: true,
    },
    {
      id: "b4c209aa-36ad-4dab-8a38-662d01b188fd",
      type: FieldsTypes.Text,
      label: "Description",
    },
    {
      id: "ea7a8faf-2103-4504-a299-96bfadd77c6c",
      type: FieldsTypes.Order,
      label: "Order",
      defaultSort: true,
      sortable: true,
      hidden: true,
    },
  ],
  [UniversalObjectsIds.VerbsPronombres]: [
    {
      id: "12d1dd74-4caf-4310-b392-fd6fea1ca1e0",
      type: FieldsTypes.String,
      label: "Pronombre",
      required: true,
      filterable: true,
    },
    {
      id: "6734b0a5-ed94-4a92-9f2b-b82263d535e1",
      type: FieldsTypes.Order,
      label: "Order",
      defaultSort: true,
      sortable: true,
      hidden: true,
    },
    {
      id: "ca62662a-778e-4f9f-9354-532ee7a93c6f",
      type: FieldsTypes.Text,
      label: "Description",
    },
  ],
};
