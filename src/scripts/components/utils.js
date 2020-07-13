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

export const asyncForEach = async (array, callback) => {

    for (let index = 0; index < array.length; index++) {

        await callback (array[index], index, array)
    
    }

}