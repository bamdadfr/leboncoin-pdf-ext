/**
 * @description Get dimensions from base64 string
 * @param {string} base64 - base64 string
 * @returns {Promise<{width: number, height: number}>} - Dimensions
 */
export function getDimensionsFromBase64(base64) {
  return new Promise((resolve) => {
    const image = new Image();
    image.src = base64;
    image.addEventListener('load', () => {
      resolve({
        width: image.naturalWidth,
        height: image.naturalHeight,
      });
    });
  });
}
