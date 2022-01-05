/**
 * @description Scale the image to fit the container
 * @param {number} width - The width of the image
 * @param {number} height - The height of the image
 * @param {number} canvasWidth - The width of the container
 * @param {number} canvasHeight - The height of the container
 * @param {number} [margin=0.5] - Margin between the image and the container
 * @returns {{width: number, height: number}} - The scaled image dimensions
 */
export function getMaxDimensions(
  width,
  height,
  canvasWidth,
  canvasHeight,
  margin = 0.5,
) {
  const compute = (margin) => {
    let maxWidth = canvasWidth - margin;

    // todo: write a better fix because this one is clunky
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
