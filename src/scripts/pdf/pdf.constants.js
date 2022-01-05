export const PdfConstants = Object.create(null);

PdfConstants.fontSize = {
  xsmall: 8,
  small: 10,
  normal: 12,
  heading: 14,
};

PdfConstants.fontWeight = {
  normal: 'normal',
  bold: 'bold',
  italic: 'italic',
};

PdfConstants.position = {
  init: {
    x: 0.5,
    y: 0.5,
  },
  x: 0.5,
  y: 0.5,
  spacer: (size = PdfConstants.weight.normal, coef = 1) => {
    PdfConstants.position.y += (0.5 * size / 24) * coef;
  },
  reset: () => {
    PdfConstants.position.x = PdfConstants.position.init.x;
    PdfConstants.position.y = PdfConstants.position.init.y;
  },
};
