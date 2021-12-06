/**
 * @description Utility function to iterate over an array asynchronously
 * @param {Array.<*>} array - Array to iterate over
 * @param {Function} callback - Function to call for each element
 */
export async function UtilsAsyncForEach(array, callback) {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array);
  }
}
