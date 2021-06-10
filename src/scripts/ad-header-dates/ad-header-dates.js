import manifest from '../../manifest.json'
import { UtilsGetDate } from '../utils-get-date/utils-get-date'

/**
 * @function
 * @name AdHeaderDates
 * @description function generating the header dates block
 * @param {Object} json - state in JSON format
 * @param {PDF} pdf - PDF instance
 * @return {Array.<Object>}
 */
export function AdHeaderDates (json, pdf) {

    const now = UtilsGetDate ()
    const { version } = manifest

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

