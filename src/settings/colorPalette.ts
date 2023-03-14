const paletteColors = [
  "#6497b1",
  "#f4b6c2",
  "#b3cde0",
  "#dec3c3",
  "#adcbe3",
  "#2a4d69",
];
export const getPaletteColor = (index: number): string => {
  return paletteColors[index % paletteColors.length];
};
