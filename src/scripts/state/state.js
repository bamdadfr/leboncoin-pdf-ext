import { Browser } from '../browser/browser'
import { StateSet } from '../state-set/state-set'

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

    if (Object.keys (state).length === 0 && state.constructor === Object) {

        await StateSet ('isTriggered', false)

        await StateSet ('isTriggeredAndRefreshed', false)

        await State ()
    
    }

    return state

}