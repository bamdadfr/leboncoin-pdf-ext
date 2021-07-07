import { jsPDF } from 'jspdf'
import { UtilsGetMaxDimensions } from '../utils-get-max-dimensions/utils-get-max-dimensions'
import { PdfConstantsFontWeights } from '../pdf-constants-font-weights/pdf-constants-font-weights'
import { PdfConstantsFontSizes } from '../pdf-constants-font-sizes/pdf-constants-font-sizes'
import { PdfConstantsPositions } from '../pdf-constants-positions/pdf-constants-positions'

/**
 * @class
 * @name PDF
 * @description class representing the PDF file to export
 */
export class PDF {

    #doc;
    
    #name;

    #font = 'times';

    #pos;

    /**
     * @function
     * @name constructor
     * @description create the PDF file with name and settings
     * @param {string} name - PDF filename
     */
    constructor (name) {
        
        // eslint-disable-next-line new-cap
        this.#doc = new jsPDF ('p', 'in', 'letter')

        this.#name = name

        this.#pos = PdfConstantsPositions

    }

    /**
     * @function
     * @name init
     * @description initialize cursor
     */
    #init () {

        this.#pos.reset ()

        this.#pos.width = this.#doc.internal.pageSize.getWidth () - this.#pos.x

        this.#pos.height = this.#doc.internal.pageSize.getHeight () - this.#pos.y
    
    }

    /**
     * @function
     * @name save
     * @description export PDF file by triggering a browser download
     */
    #save () {

        const blobData = this.#doc.output ('blob')
        const a = document.createElement ('a')

        document.body.appendChild (a)
    
        a.setAttribute ('style', 'display: none')
    
        const blob = new Blob ([blobData], { 'type': 'application/pdf' })
        const url = window.URL.createObjectURL (blob)
    
        a.href = url
    
        a.download = this.#name + '.pdf'
    
        a.click ()
    
        window.URL.revokeObjectURL (url)
    
    }

    /**
     * @function
     * @name printText
     * @description print a line of text
     * @param {string} text - text to print
     * @param {number} [size] - font size
     * @param {string} [weight] - font weight
     */
    #printText (text, size = PdfConstantsFontSizes.normal, weight = PdfConstantsFontWeights.normal) {

        this.#doc.setFontSize (size).setFont (this.#font, weight)

        this.#doc.text (this.#pos.x, this.#pos.y, text)
    
        this.#pos.spacer (size)
    
    }

    /**
     * @function
     * @name printLink
     * @description print a line of clickable text
     * @param {string} text - text to print
     * @param {string} url - target link
     * @param {number} [size] - font size
     * @param {string} [weight] - font weight
     */
    #printLink (text, url, size = PdfConstantsFontSizes.normal, weight = PdfConstantsFontWeights.normal) {

        this.#doc.setFontSize (size).setFont (this.#font, weight)

        this.#doc.textWithLink (text, this.#pos.x, this.#pos.y, { url })
    
        this.#pos.spacer (size)
    
    }

    /**
     * @function
     * @name printBlock
     * @description print a block / paragraph of text
     * @param {string} text - text to print
     * @param {number} [size] - font size
     * @param {string} [weight] - font weight
     */
    #printBlock (text, size = PdfConstantsFontSizes.normal, weight = PdfConstantsFontWeights.normal) {

        const lines = this.#doc
            .setFontSize (size)
            .setFont (this.#font, weight)
            .splitTextToSize (text, 7.5)

        this.#doc.text (this.#pos.x, this.#pos.y, lines)

        this.#pos.spacer (size, lines.length)
    
    }
    
    /**
     * @function
     * @name printNewPage
     * @description add a new page
     */
    #printNewPage () {

        this.#doc.addPage ()

        this.#pos.reset ()

    }

    /**
     * @function
     * @name printHR
     * @description print a horizontal line
     */
    #printHR () {

        this.#doc.setLineWidth (0.01)

        this.#doc.line (this.#pos.x, this.#pos.y, this.#pos.width, this.#pos.y)

        this.#pos.spacer ()
    
    }

    /**
     * @function
     * @name printImage
     * @description print an image
     * @param {number} id - image number
     * @param {number} total - total number of image
     * @param {string} _url - unused URL string
     * @param {string} base64 - image in base 64 blob format
     * @param {number} width - width of image
     * @param {number} height - height of image
     */
    #printImage (id, total, _url, base64, width, height) {

        if (this.#pos.x !== this.#pos.#init.x || this.#pos.y !== this.#pos.#init.y) {

            this.#printNewPage ()

        }
        
        this.#printText (this.#name, PdfConstantsFontSizes.small)

        this.#printText (`Image ${id} / ${total}`, PdfConstantsFontSizes.small)

        this.#printHR ()

        const maxWidth = this.#pos.width
        const maxHeight = this.#pos.height
        const dimensions = UtilsGetMaxDimensions (width, height, maxWidth, maxHeight)

        this.#doc.addImage (base64, 'JPEG', this.#pos.x, this.#pos.y, dimensions.width, dimensions.height)
    
    }

    /**
     * @function
     * @name iterate
     * @description iterate function to parse the incoming state data
     * @param {Array.<*>} array - state
     */
    #iterate (array) {
            
        array.forEach ((el) => {
            
            if (el.isSpacer) {

                return this.#pos.spacer ()

            } else if (el.isBlock) {

                return this.#printBlock (el.text, el.size, el.type)

            } else if (el.isPageBreak) {

                return this.#printNewPage ()

            } else if (el.isHR) {

                return this.#printHR ()

            } else if (el.isImage) {

                return this.#printImage (el.id, el.total, el.url, el.base64, el.width, el.height)

            } else if (el.isLink) {

                return this.#printLink (el.text, el.url, el.size)

            } else {

                return this.#printText (el.text, el.size, el.type)

            }
        
        }) 

    }

    /**
     * @function
     * @name run
     * @description run this after class instantiation
     * @param {Array} data - state to parse and print
     */
    run (data) {

        this.#init ()

        this.#iterate (data)

        this.#save ()

    }

}

