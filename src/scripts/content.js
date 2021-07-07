import { StateSet } from './state-set/state-set'
import { State } from './state/state'
import { Ad } from './ad/ad'

/**
 * @function
 * @name ContentOnLoad
 * @description content: on load
 * @returns {void}
 */
async function ContentOnLoad () {

    const state = await State ()

    if (state.isReloading === true && state.isTriggered === true) {

        await StateSet ('isReloaded', true)

        if (document.visibilityState === 'visible') {

            const nextData = document.getElementById ('__NEXT_DATA__').innerHTML

            await new Ad (nextData)
        
        }
    
    }

}

window.addEventListener ('load', ContentOnLoad)