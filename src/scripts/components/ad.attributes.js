export const AdAttributes = (json, pdf) => {

    const data = [
        {
            'isHR': true,
        },
        {
            'text': 'Critères',
            'type': pdf.type.bold,
        },
    ]

    json.attributes.forEach ((attribute) => {

        const title = attribute.key_label
        const value = attribute.value_label

        if (title !== undefined) {
            
            data.push ({
                'text': `${title} : ${value}`,
                'size': pdf.size.small,
            })
            
        }
    
    })

    return data

}

