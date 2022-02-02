type GetDimensionsFromBase64 = {
  width: number;
  height: number;
}

/**
 * Get the dimensions of an image from a base64 string
 *
 * @param {string} base64 - The base64 string
 * @returns {Promise<GetDimensionsFromBase64>} - The dimensions of the image
 */
export function getDimensionsFromBase64(base64: string): Promise<GetDimensionsFromBase64> {
  return new Promise((resolve) => {
    const image = new Image();
    image.src = base64;
    image.onload = () => {
      resolve({
        width: image.naturalWidth,
        height: image.naturalHeight,
      });
    };
  });
}
