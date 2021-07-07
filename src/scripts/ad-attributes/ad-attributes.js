import { PdfConstantsFontWeights } from '../pdf-constants-font-weights/pdf-constants-font-weights'
import { PdfConstantsFontSizes } from '../pdf-constants-font-sizes/pdf-constants-font-sizes'

/**
 * @function
 * @name AdAttributes
 * @description pdf: attributes block
 * @param {object} json - state in JSON format
 * @returns {Array.<object>} - attributes data
 */
export function AdAttributes (json) {

    const data = [
        {
            'isHR': true,
        },
        {
            'text': 'Critères',
            'type': PdfConstantsFontWeights.bold,
        },
    ]

    json.attributes.forEach ((attribute) => {

        const title = attribute.key_label
        const value = attribute.value_label

        if (title !== undefined) {
            
            data.push ({
                'text': `${title} : ${value}`,
                'size': PdfConstantsFontSizes.small,
            })
            
        }
    
    })

    return data

}

