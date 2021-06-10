/* eslint-disable new-cap */
import { jsPDF } from 'jspdf'
import { PDFFontWeights, PDFFontSizes, PDFPosition } from '../pdf-constants/pdf-constants'
import { UtilsGetMaxDimensions } from '../utils-get-max-dimensions/utils-get-max-dimensions'

/**
 * @class
 * @public
 * @name PDF
 * @description class representing the PDF file to export
 */
export class PDF {

    /**
     * @method
     * @private
     * @name constructor
     * @description create the PDF file with name and settings
     * @param {String} name - PDF filename
     */
    constructor (name) {

        this.doc = new jsPDF ('p', 'in', 'letter')

        this.name = name

        this.font = 'times'

        this.type = PDFFontWeights

        this.size = PDFFontSizes

        this.pos = PDFPosition

    }

    /**
     * @method
     * @private
     * @name init
     * @description initialize cursor
     */
    init () {

        this.pos.reset ()

        this.pos.width = this.doc.internal.pageSize.getWidth () - this.pos.x

        this.pos.height = this.doc.internal.pageSize.getHeight () - this.pos.y
    
    }

    /**
     * @method
     * @private
     * @name save
     * @description export PDF file by triggering a browser download
     */
    save () {

        const blobData = this.doc.output ('blob')
        const a = document.createElement ('a')

        document.body.appendChild (a)
    
        a.style = 'display: none'
    
        const blob = new Blob ([blobData], { 'type': 'application/pdf' })
        const url = window.URL.createObjectURL (blob)
    
        a.href = url
    
        a.download = this.name + '.pdf'
    
        a.click ()
    
        window.URL.revokeObjectURL (url)
    
    }

    /**
     * @method
     * @private
     * @name printText
     * @description print a line of text
     * @param {String} text - text to print
     * @param {Number} size - font size
     * @param {String} type - font weight (todo: rename type to weight)
     */
    printText (text, size = this.size.normal, type = this.type.normal) {

        this.doc.setFontSize (size).setFont (this.font, type)

        this.doc.text (this.pos.x, this.pos.y, text)
    
        this.pos.spacer (size)
    
    }

    /**
     * @method
     * @private
     * @name printLink
     * @description print a line of clickable text
     * @param {String} text - text to print
     * @param {String} url - target link
     * @param {Number} size - font size
     * @param {String} type - font weight
     */
    printLink (text, url, size = this.size.normal, type = this.type.normal) {

        this.doc.setFontSize (size).setFont (this.font, type)

        this.doc.textWithLink (text, this.pos.x, this.pos.y, { url })
    
        this.pos.spacer (size)
    
    }

    /**
     * @method
     * @private
     * @name printBlock
     * @description print a block / paragraph of text
     * @param {String} text - text to print
     * @param {Number} size - font size
     * @param {String} type - font weight
     */
    printBlock (text, size = this.size.normal, type = this.type.normal) {

        const lines = this.doc
            .setFontSize (size)
            .setFont (this.font, type)
            .splitTextToSize (text, 7.5)

        this.doc.text (this.pos.x, this.pos.y, lines)

        this.pos.spacer (size, lines.length)
    
    }

    /**
     * @method
     * @private
     * @name printNewPage
     * @description add a new page
     */
    printNewPage () {

        this.doc.addPage ()

        this.pos.reset ()

    }

    /**
     * @method
     * @private
     * @name printHR
     * @description print a horizontal line
     */
    printHR () {

        this.doc.setLineWidth (0.01)

        this.doc.line (this.pos.x, this.pos.y, this.pos.width, this.pos.y)

        this.pos.spacer ()
    
    }

    /**
     * @method
     * @private
     * @name printImage
     * @description print an image
     * @param {Number} id - image number
     * @param {Number} total - total number of image
     * @param {String} _url - unused URL string
     * @param {String} base64 - image in base 64 blob format
     * @param {Number} width - width of image
     * @param {Number} height - height of image
     */
    printImage (id, total, _url, base64, width, height) {

        if (this.pos.x !== this.pos.init.x || this.pos.y !== this.pos.init.y) {

            this.printNewPage ()
        
        }
        
        this.printText (this.name, this.size.small)
        
        this.printText (`Image ${id} / ${total}`, this.size.small)

        this.printHR ()

        const maxWidth = this.pos.width
        const maxHeight = this.pos.height
        const dimensions = UtilsGetMaxDimensions (width, height, maxWidth, maxHeight)

        this.doc.addImage (base64, 'JPEG', this.pos.x, this.pos.y, dimensions.width, dimensions.height)
    
    }

    /**
     * @method
     * @private
     * @name iterate
     * @description iterate function to parse the incoming state data
     * @param {Array<*>} array - state
     */
    iterate (array) {
            
        array.forEach ((el) => {
            
            if (el.isSpacer) {

                return this.pos.spacer () 

            } else if (el.isBlock) {

                return this.printBlock (el.text, el.size, el.type) 

            } else if (el.isPageBreak) {

                return this.printNewPage () 

            } else if (el.isHR) {

                return this.printHR () 

            } else if (el.isImage) {

                return this.printImage (el.id, el.total, el.url, el.base64, el.width, el.height) 

            } else if (el.isLink) {

                return this.printLink (el.text, el.url, el.size) 

            } else {

                return this.printText (el.text, el.size, el.type)
            
            }
        
        }) 

    }

    /**
     * @method
     * @public
     * @name run
     * @description run this after class instantiation
     * @param {Array} data - state to parse and print
     */
    run (data) {

        this.init ()

        this.iterate (data)

        this.save ()

    }

}

