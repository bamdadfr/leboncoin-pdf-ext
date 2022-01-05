import {PdfConstants} from '../../pdf/pdf.constants';

/**
 * @description Ad seller
 * @param {object} json - Data
 * @returns {Array.<object>} - Seller block
 */
export function Seller(json) {
  let type = json.owner.type;

  if (type === 'private') {
    type = 'particulier';
  }

  const data = [
    {
      isHR: true,
    },
    {
      text: 'Vendeur',
      size: PdfConstants.fontSize.normal,
      type: PdfConstants.fontWeight.bold,
    },
    {
      isLink: true,
      text: `Vendeur ${type} : ${json.owner.name}`,
      url: `https://www.leboncoin.fr/profil/${json.owner.user_id}`,
      size: PdfConstants.fontSize.small,
    },
  ];

  if (json.owner.siren !== undefined) {
    data.push({
      text: `SIREN : ${json.owner.siren}`,
      size: PdfConstants.fontSize.xsmall,
    });
  }

  return data;
}
