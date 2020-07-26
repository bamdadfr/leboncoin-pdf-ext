import manifest from '../../manifest.json'

export const AdHeader = (json, pdf) => {

    const version = manifest.version
    const now = new Date ().toISOString ()
    const date = now.slice (0, 10)
    const time = now.slice (11, 19)

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
        {
            'text': `Edité le ${date} ${time}, version ${version}`,
            'size': pdf.size.xsmall,
        },
    ]

}

