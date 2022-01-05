import {PdfConstants} from '../../pdf/pdf.constants';

/**
 * @description Ad attributes.
 * @param {object} json - Ad data.
 * @returns {Array.<object>} - Attributes block.
 */
export function Attributes(json) {
  const data = [
    {isHR: true},
    {
      text: 'Critères',
      type: PdfConstants.fontWeight.bold,
    },
  ];

  json.attributes.forEach((attribute) => {
    const title = attribute.key_label;
    const value = attribute.value_label;

    if (title !== undefined) {
      data.push({
        text: `${title} : ${value}`,
        size: PdfConstants.fontSize.small,
      });
    }
  });

  return data;
}
