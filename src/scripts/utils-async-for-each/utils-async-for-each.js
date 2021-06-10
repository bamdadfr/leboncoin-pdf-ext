export async function UtilsAsyncForEach (array, callback) {

    for (let index = 0; index < array.length; index++) {

        await callback (array[index], index, array)

    }

}