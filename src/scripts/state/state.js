import { Browser } from '../browser/browser'
import { StateSet } from '../state-set/state-set'

/**
 * @function
 * @name State
 * @description get browser state
 * @return {Promise<Object>}
 */
export async function State () {

    const browser = await Browser ()

    const state = await new Promise ((resolve) => {

        browser.storage.local.get (
            null,
            async (state) => {

                resolve (state)
            
            },
        )
    
    })

    if (typeof state.isTriggered === 'undefined') {

        await StateSet ('isTriggered', false)
    
    }

    if (typeof state.isTriggeredAndRefreshed === 'undefined') {

        await StateSet ('isTriggeredAndRefreshed', false)

    }

    return state

}