/**
 * @function
 * @name UtilsGetDimensionsFromUrl
 * @description get the dimensions of an image after fetching from an URL
 * @param {string} url - URL to image
 * @returns {Promise<{width: number, height: number}>} - dimensions
 */
export function UtilsGetDimensionsFromUrl (url) {

    const image = new Image ()

    image.src = url

    return new Promise ((resolve) => {

        image.addEventListener ('load', () => {

            resolve ({
                'width': image.naturalWidth,
                'height': image.naturalHeight,
            })

        })

    })

}

