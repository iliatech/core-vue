export interface ICredentialType {
  id: string;
  name: string;
}

export interface ICredential {
  id: string;
  type: string;
  u_field: string;
  p_field: string;
  comment: string;
}
