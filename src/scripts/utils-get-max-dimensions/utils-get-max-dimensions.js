/**
 * @function
 * @name UtilsGetMaxDimensions
 * @description compute max dimensions for an image to fit in a given canvas' space
 * @param {number} width - width of image
 * @param {number} height - height of image
 * @param {number} canvasWidth - width of canvas
 * @param {number} canvasHeight - height of canvas
 * @param {number} [margin=0.5] - margin to apply on borders of canvas
 * @returns {{width: number, height: number}} - dimensions
 */
export function UtilsGetMaxDimensions (width, height, canvasWidth, canvasHeight, margin = 0.5) {

    const compute = (margin) => {

        let maxWidth = canvasWidth - margin

        // todo: write a better fix because this one is clunky
        // (case when image get zoomed in too much and right margin is negative)
        if (maxWidth > canvasWidth) maxWidth = canvasWidth - 0.5

        const ratio = maxWidth / width
        const maxHeight = height * ratio

        return {
            'width': maxWidth,
            'height': maxHeight,
        }

    }

    const dimensions = compute (margin)
    const bottomDifference = canvasHeight - dimensions.height

    // if true, this means the bottom margin is not big enough
    if (bottomDifference <= margin) return compute (margin + bottomDifference)

    return dimensions

}
