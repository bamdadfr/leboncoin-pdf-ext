import { getBrowser, setState } from './services/browser'
import { Ad } from './components/ad'

const run = async () => {

    if (document.visibilityState === 'visible') {
        
        const nextData = document.getElementById ('__NEXT_DATA__').innerHTML
        const ad = new Ad ()
        
        ad.import (nextData)
        
        await ad.export ()
        
    }
    
}

/**
 * Watch for changes in browser storage
 */
(() => {

    getBrowser ().storage.onChanged.addListener (async (changes) => {

        if (changes.isTriggered.newValue === true) {

            await run ()

            await setState ('isTriggered', false)

        }
    
    })

}) ()
