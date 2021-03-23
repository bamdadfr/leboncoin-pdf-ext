export const PDFFontWeights = {
    'normal': 'normal',
    'bold': 'bold',
    'italic': 'italic',
}

export const PDFFontSizes = {
    'xsmall': 8,
    'small': 10,
    'normal': 12,
    'heading': 14,
}

export const PDFPosition = {
    'init': {
        'x': 0.5,
        'y': 0.5,
    },
    'x': 0.5,
    'y': 0.5,
    'spacer': (size = PDFFontSizes.normal, coef = 1) => {

        PDFPosition.y += (0.5 * size / 24) * coef

    },
    'reset': () => {

        PDFPosition.x = PDFPosition.init.x

        PDFPosition.y = PDFPosition.init.y
    
    },
}