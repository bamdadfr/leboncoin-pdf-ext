import { StateSet } from './state-set/state-set'
import { AdInit } from './ad-init/ad-init'
import { State } from './state/state'

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

        await AdInit ()

    }

}

window.addEventListener ('load', ContentOnLoad)