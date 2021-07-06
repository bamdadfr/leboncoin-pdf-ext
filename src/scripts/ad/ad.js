import { PDF } from '../pdf/pdf'
import { AdHeader } from '../ad-header/ad-header'
import { AdTitle } from '../ad-title/ad-title'
import { AdSeller } from '../ad-seller/ad-seller'
import { AdDescription } from '../ad-description/ad-description'
import { AdAttributes } from '../ad-attributes/ad-attributes'
import { AdImages } from '../ad-images/ad-images'

/**
 * @class
 * @public
 * @name Ad
 * @description class representing an Ad
 */
export class Ad {

    /**
     * @function
     * @public
     * @name importData
     * @description import data
     * @param {object} data - NextJS data from leboncoin
     */
    importData (data) {

        const json = JSON.parse (data)

        this.json = json.props.pageProps.ad

    }

    /**
     * @function
     * @public
     * @name export
     * @description export data into a PDF container
     * @returns {Promise<void>}
     */
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

        pdf.run (data)
    
    }

}