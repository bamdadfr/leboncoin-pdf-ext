/**
 * Convert a file to base64
 *
 * @param {Blob} blob - File to convert
 * @returns {string} - Base64 string
 */
export function convertToBase64(blob: Blob): Promise<string> {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.readAsDataURL(blob);
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        resolve(reader.result);
      }
    };
  });
}
