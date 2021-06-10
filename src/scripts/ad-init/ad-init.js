import { Ad } from '../ad/ad'

export async function AdInit () {

    if (document.visibilityState === 'visible') {

        const nextData = document.getElementById ('__NEXT_DATA__').innerHTML
        const ad = new Ad ()

        ad.import (nextData)

        await ad.export ()

    }

}