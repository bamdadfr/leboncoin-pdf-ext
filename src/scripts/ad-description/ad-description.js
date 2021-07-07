import { PdfConstantsFontSizes } from '../pdf-constants-font-sizes/pdf-constants-font-sizes'
import { PdfConstantsFontWeights } from '../pdf-constants-font-weights/pdf-constants-font-weights'

/**
 * @function
 * @name AdDescription
 * @description pdf: description block
 * @param {object} json - state in JSON format
 * @returns {Array.<object>} - description data
 */
export function AdDescription (json) {

    return [
        {
            'isHR': true,
        },
        {
        // description title
            'text': 'Description',
            'size': PdfConstantsFontSizes.normal,
            'type': PdfConstantsFontWeights.bold,
        },
        {
        // description
            'isBlock': true,
            'text': json.body,
            'size': PdfConstantsFontSizes.small,
        },
    ]

}