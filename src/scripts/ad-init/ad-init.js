import { Ad } from '../ad/ad'

/**
 * @function
 * @name AdInit
 * @description pdf: get data from current tab and import
 * @returns {Promise<void>}
 */
export async function AdInit () {

    if (document.visibilityState === 'visible') {

        const nextData = document.getElementById ('__NEXT_DATA__').innerHTML
        const ad = new Ad ()

        ad.importData (nextData)

        await ad.export ()

    }

}