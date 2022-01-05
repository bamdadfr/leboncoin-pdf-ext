import {PdfConstants} from '../../pdf/pdf.constants';

/**
 * @description Ad title.
 * @param {object} json - Data.
 * @returns {Array.<object>} - Title block.
 */
export function Title(json) {
  return [
    {
      isHR: true,
    },
    {
      // title
      text: json.subject,
      type: PdfConstants.fontWeight.bold,
    },
    {
      // price
      text: `Prix : ${json.price[0].toString() || '?'} euros`,
      size: PdfConstants.fontSize.small,
    },
    {
      // location
      text: `Lieu : ${json.location.city}, ${json.location.zipcode}, ${json.location.department_name}`,
      size: PdfConstants.fontSize.small,
    },
    {
      // satellite
      text: `GPS : ${json.location.lat}, ${json.location.lng}`,
      size: PdfConstants.fontSize.small,
    },
    {
      // google maps
      isLink: true,
      text: 'Google Maps',
      url: `https://www.google.com/maps/place/${json.location.lat},${json.location.lng}`,
      size: PdfConstants.fontSize.xsmall,
    },
  ];
}
