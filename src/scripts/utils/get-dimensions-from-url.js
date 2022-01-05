/**
 * @description Get dimensions from URL
 * @param {string} url - URL
 * @returns {Promise<{width: number, height: number}>} - Dimensions
 */
export function getDimensionsFromUrl(url) {
  const image = new Image();
  image.src = url;

  return new Promise((resolve) => {
    image.addEventListener('load', () => {
      resolve({
        width: image.naturalWidth,
        height: image.naturalHeight,
      });
    });
  });
}
