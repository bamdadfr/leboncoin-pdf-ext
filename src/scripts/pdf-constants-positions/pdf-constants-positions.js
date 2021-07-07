import { PdfConstantsFontSizes } from '../pdf-constants-font-sizes/pdf-constants-font-sizes'

export const PdfConstantsPositions = {
    'init': {
        'x': 0.5,
        'y': 0.5,
    },
    'x': 0.5,
    'y': 0.5,
    'spacer': (size = PdfConstantsFontSizes.normal, coef = 1) => {

        this.y += (0.5 * size / 24) * coef

    },
    'reset': () => {

        this.x = this.init.x

        this.y = this.init.y

    },
}