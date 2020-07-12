/* eslint-disable new-cap */
import * as jsPDF from 'jspdf'

export const PDF = class PDF {

    constructor (name) {

        this.doc = new jsPDF ('p', 'in', 'letter')

        this.name = name

        this.type = {
            'n': 'normal',
            'b': 'bold',
            'i': 'italic',
        }

        this.size = {
            'small': 10,
            'normal': 12,
            'heading': 14,
        }

        this.pos = {
            'init': {
                'x': 0.5,
                'y': 0.5,
            },
            'x': 0.5,
            'y': 0.5,
            'spacer': (size = this.size.normal, coef = 1) => {

                this.pos.y += (0.5 * size / 24) * coef

            },
            'reset': () => {

                this.pos.x = this.pos.init.x

                this.pos.y = this.pos.init.y
            
            },
        }
    
    }

    init () {

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

    print (text, size = this.size.normal, type = this.type.n) {

        this.doc.setFontSize (size).setFontType (type)

        this.doc.text (this.pos.x, this.pos.y, text)
    
        this.pos.spacer (size)
    
    }

    printBlock (text, size = this.size.normal, type = this.type.n) {

        const lines = this.doc
            .setFontSize (size)
            .setFontType (type)
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

    printImage (id) {

        if (this.pos.x !== this.pos.init.x || this.pos.y !== this.pos.init.y) {
                
            this.printNewPage ()
                
        }
            
        this.print (this.name, this.size.small)
            
        this.print (`Image ${id}`, this.size.small)
            
        // this.doc.addImage (imgData, 'JPEG', this.pos.x, this.pos.y, this.pos.width - 0.5, this.pos.height - 0.5)

    }

    iterate (array) {
            
        array.forEach ((el) => {
            
            if (el.isSpacer) return this.pos.spacer ()

            if (el.isBlock) return this.printBlock (el.text)

            if (el.isPageBreak) return this.printNewPage ()
            
            if (el.isHR) return this.printHR ()

            if (el.isImage) return
            
            return this.print (el.text, el.size, el.type)
        
        }) 

    }

    run (data) {

        this.init ()

        this.iterate (data)

        this.save ()

    }

}

