import {
  PdfConstantsFontSizes,
} from '../pdf-constants-font-sizes/pdf-constants-font-sizes';

export const PdfConstantsPositions = {
  init: {
    x: 0.5,
    y: 0.5,
  },
  x: 0.5,
  y: 0.5,
  spacer: (size = PdfConstantsFontSizes.normal, coef = 1) => {
    PdfConstantsPositions.y += (0.5 * size / 24) * coef;
  },
  reset: () => {
    PdfConstantsPositions.x = PdfConstantsPositions.init.x;
    PdfConstantsPositions.y = PdfConstantsPositions.init.y;
  },
};
