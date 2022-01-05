import {getDate} from '../../utils/get-date';
import manifest from '../../../manifest.json';
import {PdfConstants} from '../../pdf/pdf.constants';

/**
 * @description Ad header.
 * @param {object} json - Ad data.
 * @returns {Array.<object>} - Header block.
 */
export function Header(json) {
  const now = getDate();
  const {version} = manifest;

  return [
    {
      // url
      isLink: true,
      text: json.url,
      url: json.url,
      size: PdfConstants.fontSize.small,
    },
    {
      // category
      text: json.category_name,
      size: PdfConstants.fontSize.small,
    },
    {
      // date of first publication
      text: `Première publication : ${json.first_publication_date}`,
      size: PdfConstants.fontSize.xsmall,
    },
    {
      // date of latest update
      text: `Dernière mise à jour : ${json.index_date}`,
      size: PdfConstants.fontSize.xsmall,
    },
    {
      text: `Edité le ${now.date} ${now.time}, version ${version}`,
      size: PdfConstants.fontSize.xsmall,
    },
  ];
}
