const paletteColors = ["#88B04B", "#FF6F61"];
export const getPaletteColor = (index: number): string => {
  return paletteColors[index % 2];
};
