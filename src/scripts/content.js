import { getBrowser, setState } from './services/browser'
import { Ad } from './components/ad'

const run = () => {
    
    if (document.visibilityState === 'visible') {
        
        const nextData = document.getElementById ('__NEXT_DATA__').innerHTML
        const ad = new Ad ()
        
        ad.import (nextData)
        
        ad.export ()
        
    }
    
}

const setEvents = () => {
    
    getBrowser ().storage.onChanged.addListener (changes => {
        
        // eslint-disable-next-line no-console
        // console.log (changes)
        
        // runtime
        switch (changes.isTriggered.newValue) {
            
            case true:
                
                run ()

                setState ('isTriggered', false)

                break

            default:
                return null
        
        }
    
    })

}

(() => {

    setEvents ()

}) ()
