const paletteColors = [
  "#7DE2D1",
  "#F4F0BB",
  "#DFE2CF",
  "#FF595E",
  "#FFFBDB",
  "#EFBDEB",

  "#FBFAF8",
  "#DD614A",
  "#BFD8BD",
  "#F1A66A",
  "#EFF1F3",
  "#F4E04D",
  "#DDE2C6",
  "#81B29A",
];
export const getPaletteColor = (index: number): string => {
  return paletteColors[index % paletteColors.length];
};
