import {
  PdfConstantsFontSizes,
} from '../pdf-constants-font-sizes/pdf-constants-font-sizes';
import {
  PdfConstantsFontWeights,
} from '../pdf-constants-font-weights/pdf-constants-font-weights';

/**
 * @description Ad description.
 * @param {object} json - Ad data.
 * @returns {Array.<object>} - Description block
 */
export function AdDescription(json) {
  return [
    {
      isHR: true,
    },
    {
      // description title
      text: 'Description',
      size: PdfConstantsFontSizes.normal,
      type: PdfConstantsFontWeights.bold,
    },
    {
      // description
      isBlock: true,
      text: json.body,
      size: PdfConstantsFontSizes.small,
    },
  ];
}
