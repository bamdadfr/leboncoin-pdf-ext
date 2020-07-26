export const imageToBase64 = async (url) => {

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

export const getDimensionsFromURL = (url) => {

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

export const asyncForEach = async (array, callback) => {

    for (let index = 0; index < array.length; index++) {

        await callback (array[index], index, array)
    
    }

}

export const getMaxDimensions = (width, height, canvasWidth, canvasHeight, margin = 0.5) => {

    const compute = (margin) => {

        const maxWidth = canvasWidth - margin
        const ratio = maxWidth / width
        const maxHeight = height * ratio

        return {
            'width': maxWidth,
            'height': maxHeight,
        }
        
    }

    const dimensions = compute (margin)
    const bottomDifference = canvasHeight - dimensions.height

    // if true, this means the bottom margin is not big enough
    if (bottomDifference <= margin) return compute (margin + bottomDifference)
    
    return dimensions
 
}

export const getDate = () => {

    const test = new Date ()
    const diff = -test.getTimezoneOffset () * 60 * 1000 // example UTC+2: returns -(-120)
    const now = new Date (Date.now () + diff)
    const iso = now.toISOString ()
    const date = iso.slice (0, 10)
    const time = iso.slice (11, 19)

    return {
        date,
        time,
    }

}