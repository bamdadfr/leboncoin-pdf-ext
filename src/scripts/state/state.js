import { Browser } from '../browser/browser'
import { StateSet } from '../state-set/state-set'

export async function State () {

    const state = await Browser ().storage.local.get ()

    if (typeof state.isTriggered === 'undefined') {

        await StateSet ('isTriggered', false)
    
    }

    if (typeof state.isTriggeredAndRefreshed === 'undefined') {

        await StateSet ('isTriggeredAndRefreshed', false)
    
    }

    console.log ('state', state)

    return state

}