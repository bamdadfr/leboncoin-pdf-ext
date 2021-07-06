/**
 * @function
 * @name UtilsAsyncForEach
 * @description utils: for each function for async items in an array
 * @param {Array.<*>} array - array to iterate, containing async elements
 * @param {Function} callback - callback function
 * @returns {void}
 */
export async function UtilsAsyncForEach (array, callback) {

    for (let index = 0; index < array.length; index++) {

        await callback (array[index], index, array)

    }

}