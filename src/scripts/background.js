import { StateSet } from './state-set/state-set'

const { Browser } = require ('./browser/browser')

async function BackgroundInit () {

    const browser = await Browser ()

    browser.storage.onChanged.addListener (async (changes) => {

        if (changes.isTriggered.newValue === true) {

            await StateSet ('isReloading', true)

            await browser.tabs.reload ()

        }
    
    })

}

BackgroundInit ()