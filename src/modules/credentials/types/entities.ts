export interface ICredentialType {
  name: string;
  label: string;
}

export interface ICredential {
  id: string;
  type: string;
  u_field: string;
  p_field: string;
  comment: string;
}
