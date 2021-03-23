import { PDF } from './pdf'
import { AdHeader } from './ad-header'
import { AdTitle } from './ad-title'
import { AdSeller } from './ad-seller'
import { AdDescription } from './ad-description'
import { AdAttributes } from './ad-attributes'
import { AdImages } from './ad-images'

export const Ad = class Ad {

    import (data) {

        const json = JSON.parse (data)

        this.json = json.props.pageProps.ad
    
    }

    async export () {
        
        const name = `${this.json.location.zipcode} - ${this.json.list_id} - ${this.json.subject} - ${this.json.price[0].toString ()} euros`
        const pdf = new PDF (name)
        const header = AdHeader (this.json, pdf)
        const title = AdTitle (this.json, pdf)
        const seller = AdSeller (this.json, pdf)
        const description = AdDescription (this.json, pdf)
        const attributes = AdAttributes (this.json, pdf)
        const images = await AdImages (this.json)

        const data = [
            ...header,
            ...title,
            ...seller,
            ...attributes,
            ...description,
            ...images,
        ]

        // eslint-disable-next-line no-console
        // console.log (this.json)

        pdf.run (data)
    
    }

}