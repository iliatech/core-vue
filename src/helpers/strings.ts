export const prepareName = (value: string | undefined): string => {
  return (value ?? "").trim().replace(/\s+/g, " ");
};
