import { Browser } from './browser/browser'
import { StateSet } from './state-set/state-set'
import { AdInit } from './ad-init/ad-init'
import { State } from './state/state'

async function ContentOnLoad () {

    const browser = await Browser ()
    const state = await State ()

    browser.storage.onChanged.addListener (async (changes) => {

        if (changes.isTriggered.newValue === true) {

            await AdInit ()

            await StateSet ('isTriggered', false)

        }
        
    })

}

window.addEventListener ('load', ContentOnLoad)