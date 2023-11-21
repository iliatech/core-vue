export enum ClientsTableColumns {
  Name = "name",
  Action = "action",
}

export const clientsTableColumns = {
  [ClientsTableColumns.Name]: {
    title: "Name",
  },
  [ClientsTableColumns.Action]: {
    title: "Action",
    align: "center",
  },
};
