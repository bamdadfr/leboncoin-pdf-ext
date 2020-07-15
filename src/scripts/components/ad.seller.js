export const AdSeller = (json, pdf) => {

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

