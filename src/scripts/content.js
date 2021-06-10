import { Browser } from './browser/browser'
import { StateSet } from './state-set/state-set'
import { AdInit } from './ad-init/ad-init'

/**
 * @function
 * @name ContentOnLoad
 * @description content: on load
 * @return {Promise<void>}
 */
async function ContentOnLoad () {

    const browser = await Browser ()

    browser.storage.onChanged.addListener (async (changes) => {

        if (changes.isTriggered.newValue === true) {

            await AdInit ()

            await StateSet ('isTriggered', false)

        }
        
    })

}

window.addEventListener ('load', ContentOnLoad)