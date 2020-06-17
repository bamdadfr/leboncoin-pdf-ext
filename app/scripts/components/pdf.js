/* eslint-disable new-cap */
import * as jsPDF from 'jspdf'

export default class PDF {

    constructor () {

        this.doc = new jsPDF ('p', 'in', 'letter')

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
            'x': 0.5,
            'y': 0.5,
            'spacer': (size = this.size.normal, coef = 1) => {

                this.pos.y += (0.5 * size / 24) * coef

            },
        }
    
    }

    save (name) {

        const blobData = this.doc.output ('blob')
        const a = document.createElement ('a')

        document.body.appendChild (a)
    
        a.style = 'display: none'
    
        const blob = new Blob ([blobData], { 'type': 'application/pdf' })
        const url = window.URL.createObjectURL (blob)
    
        a.href = url
    
        a.download = name + '.pdf'
    
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

    runLoop (array) {

        for (let i = 0; i < array.length; ++i) {

            if (array[i].isSpacer) {

                this.pos.spacer ()

                continue

            }

            if (array[i].isBlock) {

                this.printBlock (array[i].text)

                continue
            
            }

            this.print (array[i].text, array[i].size, array[i].type)
        
        }

    }

    run (data, name) {

        this.runLoop (data)

        this.save (name)

    }

}

