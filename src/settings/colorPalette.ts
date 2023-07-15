const paletteColors = [
  "#7DE2D1",
  "#F4F0BB",
  "#DFE2CF",
  "#FFFBDB",
  "#EFBDEB",
  "#FBFAF8",
  "#BFD8BD",
  "#EFF1F3",
  "#DDE2C6",
  "#81B29A",
];
export const getPaletteColor = (index: number): string => {
  return paletteColors[index % paletteColors.length];
};
