export const getColorShineIndex = (color) => {
  const r = parseInt(color.slice(1, 3), 16);
  const g = parseInt(color.slice(3, 5), 16);
  const b = parseInt(color.slice(5, 7), 16);

  const luma = (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255;

  return luma;
}