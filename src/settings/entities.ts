import type { DrawerConfig } from "@/types/common";
import { FieldsTypes } from "@/types/common";

export enum IEntity {
  Credential = "credential",
  CredentialType = "credentialType",
  CredentialTypeName = "credentialTypeName",
  CredentialName = "credentialName",
  CredentialDescription = "credentialDescription",
  CredentialPassword = "credentialPassword",
}

interface IUniversalObject {
  id: string;
  databaseId: string;
  description: string;
}

export const universalObjects: IUniversalObject[] = [
  {
    id: "2c98151d-4995-49c9-b49e-0070058d951c",
    databaseId: "50bda5a6-b1a0-4d73-b7db-301392037f87",
    description: "Credentials",
  },
  {
    id: "75ef436e-3d2d-4061-8e60-970e001f40aa",
    databaseId: "50bda5a6-b1a0-4d73-b7db-301392037f87",
    description: "Credential types",
  },
];

export const drawersConfigs: Record<string, DrawerConfig> = {
  "2c98151d-4995-49c9-b49e-0070058d951c": [
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
      //sourceObjectId: "75ef436e-3d2d-4061-8e60-970e001f40aa",
      sourceObjectId: "2c98151d-4995-49c9-b49e-0070058d951c",
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

export const getDatabaseIdByObjectId = (objectId: string) => {
  const object = universalObjects.find((item) => item.id === objectId);
  return object?.databaseId ?? null;
};

export const getDrawerConfigByObjectId = (objectId: string): DrawerConfig => {
  const config = drawersConfigs[objectId];

  if (!config) {
    throw new Error(
      `Cannot find drawer config for universal object with id '${objectId}'`
    );
  }

  return config;
};
