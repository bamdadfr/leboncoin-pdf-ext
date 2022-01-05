import {PdfConstants} from '../../pdf/pdf.constants';

/**
 * @description Ad description.
 * @param {object} json - Ad data.
 * @returns {Array.<object>} - Description block
 */
export function Description(json) {
  return [
    {
      isHR: true,
    },
    {
      // description title
      text: 'Description',
      size: PdfConstants.fontSize.normal,
      type: PdfConstants.fontWeight.bold,
    },
    {
      // description
      isBlock: true,
      text: json.body,
      size: PdfConstants.fontSize.small,
    },
  ];
}
