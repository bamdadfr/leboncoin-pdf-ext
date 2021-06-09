/* eslint-disable new-cap */
import { jsPDF } from 'jspdf'
import { PDFFontWeights, PDFFontSizes, PDFPosition } from '../pdf-constants/pdf-constants'
import { getMaxDimensions } from '../utils/utils'

export class PDF {

    constructor (name) {

        this.doc = new jsPDF ('p', 'in', 'letter')

        this.name = name

        this.font = 'times'

        this.type = PDFFontWeights

        this.size = PDFFontSizes

        this.pos = PDFPosition

    }

    init () {

        this.pos.reset ()

        this.pos.width = this.doc.internal.pageSize.getWidth () - this.pos.x

        this.pos.height = this.doc.internal.pageSize.getHeight () - this.pos.y
    
    }

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

    printText (text, size = this.size.normal, type = this.type.normal) {

        this.doc.setFontSize (size).setFont (this.font, type)

        this.doc.text (this.pos.x, this.pos.y, text)
    
        this.pos.spacer (size)
    
    }

    printLink (text, url, size = this.size.normal, type = this.type.normal) {

        this.doc.setFontSize (size).setFont (this.font, type)

        this.doc.textWithLink (text, this.pos.x, this.pos.y, { url })
    
        this.pos.spacer (size)
    
    }

    printBlock (text, size = this.size.normal, type = this.type.normal) {

        const lines = this.doc
            .setFontSize (size)
            .setFont (this.font, type)
            .splitTextToSize (text, 7.5)

        this.doc.text (this.pos.x, this.pos.y, lines)

        this.pos.spacer (size, lines.length)
    
    }

    printNewPage () {

        this.doc.addPage ()

        this.pos.reset ()

    }

    printHR () {

        this.doc.setLineWidth (0.01)

        this.doc.line (this.pos.x, this.pos.y, this.pos.width, this.pos.y)

        this.pos.spacer ()
    
    }

    printImage (id, total, _url, base64, width, height) {

        if (this.pos.x !== this.pos.init.x || this.pos.y !== this.pos.init.y) {

            this.printNewPage ()
        
        }
        
        this.printText (this.name, this.size.small)
        
        this.printText (`Image ${id} / ${total}`, this.size.small)

        this.printHR ()

        const maxWidth = this.pos.width
        const maxHeight = this.pos.height
        const dimensions = getMaxDimensions (width, height, maxWidth, maxHeight)

        this.doc.addImage (base64, 'JPEG', this.pos.x, this.pos.y, dimensions.width, dimensions.height)
    
    }

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

    run (data) {

        this.init ()

        this.iterate (data)

        this.save ()

    }

}

