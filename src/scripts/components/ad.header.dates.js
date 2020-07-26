import { version } from '../../manifest.json'
import { getDate } from './utils'

export const AdHeaderDates = (json, pdf) => {

    const now = getDate ()

    return [
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
            'text': `Edité le ${now.date} ${now.time}, version ${version}`,
            'size': pdf.size.xsmall,
        },
    ]

}

