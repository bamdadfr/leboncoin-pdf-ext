import { PDF } from './pdf'
import { imageToBase64, asyncForEach } from './utils'

export const Ad = class Ad {

    import (data) {

        const json = JSON.parse (data)

        this.json = json.props.pageProps.ad
    
    }

    header (json, pdf) {

        return [
            {
                // url
                'isLink': true,
                'text': json.url,
                'url': json.url,
                'size': pdf.size.small,
            },
            {
                // category
                'text': json.category_name,
                'size': pdf.size.small,   
            },
            {
                // date of first publication
                'text': `Première publication : ${json.first_publication_date}`,
                'size': pdf.size.xsmall,
            },
            {
                // date of latest update
                'text': `Dernière mise à jour : ${json.index_date}`,
                'size': pdf.size.xsmall,
            },
        ]
    
    }

    title (json, pdf) {

        return [
            {
                'isHR': true,
            },
            {
                // title
                'text': json.subject,
                'type': pdf.type.bold,
            },
            {
                // price
                'text': `Prix : ${json.price[0].toString ()} €`,
                'size': pdf.size.small,
            },
            {
                'text': `Lieu : ${json.location.city}, ${json.location.zipcode}, ${json.location.department_name}`,
                'size': pdf.size.small,
            },
            {
                'text': `GPS : ${json.location.lat}, ${json.location.lng}`,
                'size': pdf.size.small,
            },
            {
                'isLink': true,
                'text': 'Google Maps',
                'url': `https://www.google.com/maps/place/${json.location.lat},${json.location.lng}`,
                'size': pdf.size.xsmall,
            },
        ]
    
    }

    seller (json, pdf) {

        return [
            {
                'isHR': true,
            },
            {
                'text': 'Vendeur',
                'size': pdf.size.normal,
                'type': pdf.type.bold,
            },
            {
                'text': `Vendeur ${json.owner.type} : ${json.owner.name}`,
                'size': pdf.size.small,
            },
            {
                'text': `SIREN : ${json.owner.siren}`,
                'size': pdf.size.xsmall,
            },
        ]
    
    }

    description (json, pdf) {

        return [
            {
                'isHR': true,
            },
            {
                // description title
                'text': 'Description',
                'size': pdf.size.normal,
                'type': pdf.type.bold,
            },
            {
                // description
                'isBlock': true,
                'text': json.body,
                'size': pdf.size.small,
            },
        ]
    
    }

    attributes (json, pdf) {

        const data = [
            {
                'isHR': true,
            },
            {
                'text': 'Critères',
                'type': pdf.type.bold,
            },
        ]

        json.attributes.forEach ((attribute) => {

            const title = attribute.key_label
            const value = attribute.value_label

            if (title !== undefined) {
                
                data.push ({
                    'text': `${title} : ${value}`,
                    'size': pdf.size.small,
                })
                
            }
        
        })

        return data
    
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
                    'id': k + 1,
                    'total': images.length,
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
        const header = this.header (this.json, pdf)
        const title = this.title (this.json, pdf)
        const seller = this.seller (this.json, pdf)
        const description = this.description (this.json, pdf)
        const attributes = this.attributes (this.json, pdf)
        const images = await this.images (this.json)

        const data = [
            ...header,
            ...title,
            ...seller,
            ...attributes,
            ...description,
            ...images,
        ]

        // eslint-disable-next-line no-console
        console.log (this.json)

        pdf.run (data)
    
    }

}