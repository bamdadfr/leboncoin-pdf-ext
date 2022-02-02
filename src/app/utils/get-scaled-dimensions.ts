type GetScaledDimensions = {
  width: number;
  height: number;
}

const defaultProps = {
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
  const compute = (margin: number) => {
    let maxWidth = canvasWidth - margin;

    // TODO: write a better fix because this one is clunky
    // (case when image get zoomed in too much and right margin is negative)
    if (maxWidth > canvasWidth) {
      maxWidth = canvasWidth - 0.5;
    }

    const ratio = maxWidth / width;
    const maxHeight = height * ratio;

    return {
      width: maxWidth,
      height: maxHeight,
    };
  };

  const dimensions = compute(margin);
  const bottomDifference = canvasHeight - dimensions.height;

  // if true, this means the bottom margin is not big enough
  if (bottomDifference <= margin) {
    return compute(margin + bottomDifference);
  }

  return dimensions;
}
