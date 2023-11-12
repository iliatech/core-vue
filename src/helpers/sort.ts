export const sortCollator = Intl.Collator(undefined, {
  numeric: true,
  sensitivity: "base",
});

export const sortWithCollator = (items: any[], byField: string): any[] =>
  items.sort((a, b) => {
    return sortCollator.compare(a?.[byField], b?.[byField]);
  });
