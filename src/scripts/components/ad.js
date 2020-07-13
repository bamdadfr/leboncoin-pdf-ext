import { PDF } from './pdf'
import { imageToBase64, asyncForEach } from './utils'

// https://www.leboncoin.fr/ventes_immobilieres/1785194713.htm/
// https://www.leboncoin.fr/ventes_immobilieres/1799700458.htm/

export const Ad = class Ad {

    import (data) {

        const json = JSON.parse (data)

        this.json = json.props.pageProps.ad
    
    }

    text (pdf) {

        return [
            {
                // url
                'text': this.json.url,
                'size': pdf.size.small,
            },
            {
                // category
                'text': this.json.category_name,
                'size': pdf.size.small,   
            },
            {
                // date of first publication
                'text': `Première publication : ${this.json.first_publication_date}`,
                'size': pdf.size.small,
            },
            {
                // date of latest update
                'text': `Dernière mise à jour : ${this.json.index_date}`,
                'size': pdf.size.small,
            },
            {
                'isSpacer': true,
            },
            {
                // title
                'text': this.json.subject,
                'size': pdf.size.heading,
                'type': pdf.type.b,
            },
            {
                // price
                'text': `Prix : ${this.json.price[0].toString ()} €`,
            },
            {
                'isSpacer': true,
            },
            {
                'text': `Vendeur ${this.json.owner.type} : ${this.json.owner.name}`,
                'size': pdf.size.small,
            },
            {
                'text': `Lieu : ${this.json.location.city}, ${this.json.location.zipcode}, ${this.json.location.department_name}`,
                'size': pdf.size.small,
            },
            {
                'text': `GPS : ${this.json.location.lat}, ${this.json.location.lng}`,
                'size': pdf.size.small,
            },
            {
                'isSpacer': true,
            },
            {
                // description title
                'text': 'Description',
                'size': pdf.size.normal,
                'type': pdf.type.b,
            },
            {
                // description
                'isBlock': true,
                'text': this.json.body,
            },
            {
                // page break before images
                'isPageBreak': true,
            },
            {
                // url
                'text': this.json.url,
                'size': pdf.size.small,
            },
            {
                'isHR': true,
            },
            {
                // category
                'text': this.json.category_name,
                'size': pdf.size.small,   
            },
        ]
    
    }

    async images (json) {

        const data = []
        let images = undefined

        if (json.images.urls_large) {

            images = json.images.urls_large
            
        } else if (json.images.urls) {
            
            images = json.images.urls
            
        }

        await asyncForEach (images, async (image, k) => {

            const base64 = await imageToBase64 (image)

            data.push (
                {
                    'isImage': true,
                    'id': k,
                    'url': image,
                    'base64': base64,
                },
            )
        
        })

        return data
    
    }

    async export () {
        
        const name = `${this.json.list_id}-${this.json.subject}`
        const pdf = new PDF (name)
        const text = this.text (pdf)
        const images = await this.images (this.json)

        const data = [
            ...text,
            ...images,
        ]

        // eslint-disable-next-line no-console
        // console.log (data)

        pdf.run (data)
    
    }

}