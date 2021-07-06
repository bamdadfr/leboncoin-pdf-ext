/**
 * @function
 * @name AdDescription
 * @description pdf: description block
 * @param {object} json - state in JSON format
 * @param {*} pdf - PDF instance
 * @returns {Array.<object>} - description data
 */
export function AdDescription (json, pdf) {

    return [
        {
            'isHR': true,
        },
        {
        // description title
            'text': 'Description',
            'size': pdf.size.normal,
            'type': pdf.type.bold,
        },
        {
        // description
            'isBlock': true,
            'text': json.body,
            'size': pdf.size.small,
        },
    ]

}