import { Ad } from '../ad/ad'

/**
 * @function
 * @name AdInit
 * @description get data from current page, import to PDF and export as browser download
 * @returns {Promise<null>}
 */
export async function AdInit () {

    if (document.visibilityState === 'visible') {

        const nextData = document.getElementById ('__NEXT_DATA__').innerHTML
        const ad = new Ad ()

        ad.import (nextData)

        await ad.export ()

    }

    return null

}