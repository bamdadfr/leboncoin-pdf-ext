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