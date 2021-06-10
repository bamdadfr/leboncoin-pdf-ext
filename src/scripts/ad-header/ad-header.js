import { AdHeaderDates } from '../ad-header-dates/ad-header-dates'

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