import { StateSet } from './state-set/state-set'
import { Browser } from './browser/browser'

/**
 * @function
 * @name BackgroundInit
 * @description background initialization script
 * @returns {void}
 */
async function BackgroundInit () {

    const browser = await Browser ()

    browser.storage.onChanged.addListener (async (changes) => {

        if (changes.isTriggered && changes.isTriggered.newValue === true) {

            await StateSet ('isReloading', true)

            await browser.tabs.reload ()

        }
    
    })

}

BackgroundInit ()