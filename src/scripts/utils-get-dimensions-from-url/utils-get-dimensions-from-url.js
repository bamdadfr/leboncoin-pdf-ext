export function UtilsGetDimensionsFromUrl (url) {

    const image = new Image ()

    image.src = url

    return new Promise (resolve => {

        image.addEventListener ('load', () => {

            resolve ({
                'width': image.naturalWidth,
                'height': image.naturalHeight,
            })

        })

    })

}

