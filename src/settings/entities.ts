import type { DrawerConfig } from "@/types/common";
import { tablesConfigs } from "@/universal/tablesConfigs";
import type { TableConfig } from "@/types/tables";
import { drawersConfigs } from "@/universal/drawersConfigs";
import { UniversalDatabasesIds, UniversalObjectsIds } from "@/universal/enums";

export enum IEntity {
  Credential = "credential",
  CredentialType = "credentialType",
  CredentialTypeName = "credentialTypeName",
  CredentialName = "credentialName",
  CredentialDescription = "credentialDescription",
  CredentialPassword = "credentialPassword",
}

interface IUniversalObject {
  id: UniversalObjectsIds;
  databaseId: UniversalDatabasesIds;
  description: string;
}

export const universalObjects: IUniversalObject[] = [
  {
    id: UniversalObjectsIds.Verbs,
    databaseId: UniversalDatabasesIds.MainDatabase,
    description: "Credentials",
  },
  {
    id: UniversalObjectsIds.VerbsForms,
    databaseId: UniversalDatabasesIds.MainDatabase,
    description: "Credentials types",
  },
];

export const getDatabaseIdByObjectId = (objectId: string): string => {
  const object = universalObjects.find((item) => item.id === objectId);

  if (!object) {
    throw new Error(
      `Cannot find database for universal object with id '${objectId}'`
    );
  }

  return object.databaseId;
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

export const getTableConfigByObjectId = (objectId: string): TableConfig => {
  const config = tablesConfigs[objectId];

  if (!config) {
    throw new Error(
      `Cannot find table config for universal object with id '${objectId}'`
    );
  }

  return config;
};
