/**
 * @function
 * @name UtilsImageToBase64
 * @description utils: encode an image file to a base64 blob
 * @param {String} url - URL to image
 * @returns {Promise<String>}
 */
export async function UtilsImageToBase64 (url) {

    const response = await fetch (url)
    const blob = await response.blob ()
    const reader = new FileReader ()

    reader.readAsDataURL (blob)

    return new Promise (resolve => {

        reader.onloadend = () => {

            const base64 = reader.result
            // const validBase64 = base64.split (',')[1]

            resolve (base64)

        }

    })

}
