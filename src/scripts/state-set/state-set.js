import { Browser } from '../browser/browser'

/**
 * @function
 * @name StateSet
 * @description set browser state
 * @param {string} type - type of action
 * @param {boolean} payload - payload to write in state
 * @returns {Promise<void>}
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
            throw new Error ('state error')

    }

}