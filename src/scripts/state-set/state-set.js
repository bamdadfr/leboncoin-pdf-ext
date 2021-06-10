import { Browser } from '../browser/browser'

/**
 * @function
 * @name StateSet
 * @description set browser state
 * @param {String} type - type of action
 * @param {Boolean} payload - payload to write in state
 * @returns {Promise<null>}
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

        case 'isTriggeredAndRefreshed':
            await browser.storage.local.set ({
                'isTriggered': false,
                'isTriggeredAndRefreshed': payload,
            })

            break

        default:
            return null

    }

}