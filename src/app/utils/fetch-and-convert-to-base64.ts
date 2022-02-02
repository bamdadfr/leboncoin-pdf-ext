type FetchAndConvertToBase64 = string|void

/**
 * Fetch and convert an image to base64
 *
 * @param {string} url - The url of the image to fetch
 * @returns {Promise<FetchAndConvertToBase64>} - The base64 representation of the image
 */
export function fetchAndConvertToBase64(url: string): Promise<FetchAndConvertToBase64> {
  return new Promise((resolve) => {
    let response;
    let blob: Blob;

    (async () => {
      response = await fetch(url);
      blob = await response.blob();
    })()
      .then(() => {
        const reader = new FileReader();
        reader.readAsDataURL(blob);
        reader.onloadend = () => {
          const base64 = reader.result as string;
          resolve(base64);
        };
      })
      .catch(() => {
        resolve();
      });
  });
}
