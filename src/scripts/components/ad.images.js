import { asyncForEach, imageToBase64 } from './utils'

export const AdImages = async (json) => {

    const data = []
    let images = undefined

    if (json.images.urls_large) {

        images = json.images.urls_large
        
    } else if (json.images.urls) {
        
        images = json.images.urls
        
    }

    await asyncForEach (images, async (image, k) => {

        const base64 = await imageToBase64 (image)

        data.push (
            {
                'isImage': true,
                'id': k + 1,
                'total': images.length,
                'url': image,
                'base64': base64,
            },
        )
    
    })

    return data

}

