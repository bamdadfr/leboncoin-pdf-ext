import { AdHeaderDates } from '../ad-header-dates/ad-header-dates'

/**
 * @function
 * @name AdHeader
 * @description function generating the header block
 * @param {Object} json - state in JSON format
 * @param {PDF} pdf - PDF instance
 * @return {Array.<Object>}
 */
export function AdHeader (json, pdf) {

    return [
        {
            // url
            'isLink': true,
            'text': json.url,
            'url': json.url,
            'size': pdf.size.small,
        },
        {
            // category
            'text': json.category_name,
            'size': pdf.size.small,
        },
        ...AdHeaderDates (json, pdf),
    ]

}