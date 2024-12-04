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

export const getDatabaseByObjectId = (objectId: string) => {
  const object = universalObjects.find((item) => item.id === objectId);
  return object?.databaseId ?? null;
};
