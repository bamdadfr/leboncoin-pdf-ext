import {
  PdfConstantsFontWeights,
} from '../pdf-constants-font-weights/pdf-constants-font-weights';
import {
  PdfConstantsFontSizes,
} from '../pdf-constants-font-sizes/pdf-constants-font-sizes';

/**
 * @description Ad title.
 * @param {object} json - Data.
 * @returns {Array.<object>} - Title block.
 */
export function AdTitle(json) {
  return [
    {
      isHR: true,
    },
    {
      // title
      text: json.subject,
      type: PdfConstantsFontWeights.bold,
    },
    {
      // price
      text: `Prix : ${json.price[0].toString() || '?'} euros`,
      size: PdfConstantsFontSizes.small,
    },
    {
      // location
      text: `Lieu : ${json.location.city}, ${json.location.zipcode}, ${json.location.department_name}`,
      size: PdfConstantsFontSizes.small,
    },
    {
      // satellite
      text: `GPS : ${json.location.lat}, ${json.location.lng}`,
      size: PdfConstantsFontSizes.small,
    },
    {
      // google maps
      isLink: true,
      text: 'Google Maps',
      url: `https://www.google.com/maps/place/${json.location.lat},${json.location.lng}`,
      size: PdfConstantsFontSizes.xsmall,
    },
  ];
}
