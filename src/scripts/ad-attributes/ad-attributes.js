/**
 * @function
 * @name AdAttributes
 * @description pdf: attributes block
 * @param {object} json - state in JSON format
 * @param {*} pdf - PDF instance
 * @returns {Array.<object>} - attributes data
 */
export function AdAttributes (json, pdf) {

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

