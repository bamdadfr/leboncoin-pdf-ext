/**
 * @description Encodes an image to base64
 * @param {string} url - The url of the image to encode
 * @returns {Promise<string>} - The base64 encoded image
 */
export function fetchAndConvertToBase64(url) {
  return new Promise((resolve) => {
    let response;
    let blob;

    (async () => {
      response = await fetch(url);
      blob = await response.blob();
    })()
      .then(() => {
        const reader = new FileReader();
        reader.readAsDataURL(blob);
        reader.onloadend = () => {
          const base64 = reader.result;
          resolve(base64);
        };
      })
      .catch(() => {
        resolve();
      });
  });
}
