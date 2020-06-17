import PDF from './pdf'

// https://www.leboncoin.fr/ventes_immobilieres/1785194713.htm/

export default class Ad {

    import (data) {

        const json = JSON.parse (data)

        this.json = json.props.pageProps.ad
    
    }

    format (pdf) {

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
                'text': `Prix : ${this.json.price[0].toString ()}`,
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

        ]
    
    }

    export () {

        const pdf = new PDF ()
        const data = this.format (pdf)

        console.log (this.json)

        const name = `${this.json.list_id}-${this.json.subject}`

        pdf.run (data, name)
    
    }

}