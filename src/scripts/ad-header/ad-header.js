import {
  PdfConstantsFontSizes,
} from '../pdf-constants-font-sizes/pdf-constants-font-sizes';
import {UtilsGetDate} from '../utils-get-date/utils-get-date';
import manifest from '../../manifest.json';

/**
 * @description Ad header.
 * @param {object} json - Ad data.
 * @returns {Array.<object>} - Header block.
 */
export function AdHeader(json) {
  const now = UtilsGetDate();
  const {version} = manifest;

  return [
    {
      // url
      isLink: true,
      text: json.url,
      url: json.url,
      size: PdfConstantsFontSizes.small,
    },
    {
      // category
      text: json.category_name,
      size: PdfConstantsFontSizes.small,
    },
    {
      // date of first publication
      text: `Première publication : ${json.first_publication_date}`,
      size: PdfConstantsFontSizes.xsmall,
    },
    {
      // date of latest update
      text: `Dernière mise à jour : ${json.index_date}`,
      size: PdfConstantsFontSizes.xsmall,
    },
    {
      text: `Edité le ${now.date} ${now.time}, version ${version}`,
      size: PdfConstantsFontSizes.xsmall,
    },
  ];
}
