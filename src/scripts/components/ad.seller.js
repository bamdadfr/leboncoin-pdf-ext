export const AdSeller = (json, pdf) => {

    const data = [
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
    ]

    if (json.owner.siren !== undefined) {

        data.push ({
            'text': `SIREN : ${json.owner.siren}`,
            'size': pdf.size.xsmall,

        })
    
    }

    return data

}

