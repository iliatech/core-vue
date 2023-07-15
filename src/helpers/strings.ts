export const trimAndCollapse = (value: string): string => {
  return value.trim().replace(/\s+/g, " ");
};
