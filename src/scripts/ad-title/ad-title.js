/**
 * @function
 * @name AdTitle
 * @description function generating the title block
 * @param {Object} json - state in JSON format
 * @param {PDF} pdf - PDF instance
 * @returns {Array<Object>}
 */
export function AdTitle (json, pdf) {

    return [
        {
            'isHR': true,
        },
        {
            // title
            'text': json.subject,
            'type': pdf.type.bold,
        },
        {
            // price
            'text': `Prix : ${json.price[0].toString ()} euros`,
            'size': pdf.size.small,
        },
        {
            'text': `Lieu : ${json.location.city}, ${json.location.zipcode}, ${json.location.department_name}`,
            'size': pdf.size.small,
        },
        {
            'text': `GPS : ${json.location.lat}, ${json.location.lng}`,
            'size': pdf.size.small,
        },
        {
            'isLink': true,
            'text': 'Google Maps',
            'url': `https://www.google.com/maps/place/${json.location.lat},${json.location.lng}`,
            'size': pdf.size.xsmall,
        },
    ]

}
