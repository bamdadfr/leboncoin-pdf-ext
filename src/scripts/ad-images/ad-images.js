import { asyncForEach, imageToBase64, getDimensionsFromURL } from '../utils/utils'

export async function AdImages (json) {

    const data = []
    let images = undefined

    if (json.images.urls_large) {

        images = json.images.urls_large
        
    } else if (json.images.urls) {
        
        images = json.images.urls
        
    }

    if (images === undefined) return data

    await asyncForEach (images, async (image, k) => {

        const base64 = await imageToBase64 (image)
        const dimensions = await getDimensionsFromURL (image)

        data.push (
            {
                'isImage': true,
                'id': k + 1,
                'total': images.length,
                'url': image,
                'base64': base64,
                'width': dimensions.width,
                'height': dimensions.height,
            },
        )
    
    })

    return data

}

