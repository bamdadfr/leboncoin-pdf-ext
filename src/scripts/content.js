import { StateSet } from './state-set/state-set'
import { AdInit } from './ad-init/ad-init'
import { State } from './state/state'

/**
 * @function
 * @name ContentOnLoad
 * @description content: on load
 * @return {undefined}
 */
async function ContentOnLoad () {

    const state = await State ()

    console.log (state)

    if (state.isReloading === true && state.isTriggered === true) {

        await StateSet ('isReloaded', true)

        await AdInit ()

    }

}

window.addEventListener ('load', ContentOnLoad)