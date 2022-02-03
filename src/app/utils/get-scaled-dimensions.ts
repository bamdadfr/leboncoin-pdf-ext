type GetScaledDimensions = {
  width: number;
  height: number;
}

export const defaultProps = {
  margin: 0.5,
};

/**
 * Get dimensions of an image scaled to fit within a given width and height.
 * 
 * @param {number} width - The original image width.
 * @param {number} height - The original image height.
 * @param {number} canvasWidth - The width to scale the image to.
 * @param {number} canvasHeight - The height to scale the image to.
 * @param {number} [margin] - The margin to add to the scaled image.
 * @returns {GetScaledDimensions} - The scaled image.
 */
export function getScaledDimensions(
  width: number,
  height: number,
  canvasWidth: number,
  canvasHeight: number,
  margin = defaultProps.margin,
): GetScaledDimensions {
  const targetW = canvasWidth - margin * 2;
  const targetH = canvasHeight - margin * 2;

  const ratio = width / height;
  let newWidth = targetW;
  let newHeight = newWidth / ratio;

  if (newHeight > targetH) {
    newHeight = targetH;
    newWidth = newHeight * ratio;
  }

  return {
    width: newWidth,
    height: newHeight,
  };
}
