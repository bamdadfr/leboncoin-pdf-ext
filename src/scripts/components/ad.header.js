export const AdHeader = (json, pdf) => {

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
        {
            // date of first publication
            'text': `Première publication : ${json.first_publication_date}`,
            'size': pdf.size.xsmall,
        },
        {
            // date of latest update
            'text': `Dernière mise à jour : ${json.index_date}`,
            'size': pdf.size.xsmall,
        },
    ]

}

