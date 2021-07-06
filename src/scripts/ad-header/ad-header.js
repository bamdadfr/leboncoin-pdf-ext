import { AdHeaderDates } from '../ad-header-dates/ad-header-dates'

/**
 * @function
 * @name AdHeader
 * @description pdf: header block
 * @param {object} json - state in JSON format
 * @param {*} pdf - PDF instance
 * @returns {Array.<object>} - header data
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