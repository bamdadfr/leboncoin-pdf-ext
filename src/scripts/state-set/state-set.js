import { Browser } from '../browser/browser'

/**
 * @function
 * @name StateSet
 * @description set browser state
 * @param {String} type - type of action
 * @param {Boolean} payload - payload to write in state
 * @return {Promise<(null|undefined)>}
 */
export async function StateSet (type, payload) {

    const browser = await Browser ()

    // reducer
    switch (type) {

        case 'isTriggered':
            await browser.storage.local.set ({
                'isTriggered': payload,
            })

            break

        case 'isReloading':
            await browser.storage.local.set ({
                'isReloading': payload,
            })

            break

        case 'isReloaded':
            await browser.storage.local.set ({
                'isTriggered': false,
                'isReloading': false,
                'isReloaded': payload,
            })

            await browser.storage.local.set ({
                'isReloaded': false,
            })

            break

        default:
            return null

    }

}