import { getBrowser, setState } from './services/browser'
import Ad from './components/ad'

const run = () => {

    const reduxDOM = document.getElementById ('__NEXT_DATA__').innerHTML
    const ad = new Ad ()

    ad.import (reduxDOM)

    ad.export ()

}

const setEvents = () => {
    
    getBrowser ().storage.onChanged.addListener (changes => {

        // runtime
        switch (changes.isTriggered.newValue) {
            
            case true:

                // TODO: wrap run() in promise
                run ()

                // TODO: add a transiant isLoading state
                
                setState ('isTriggered', false)

                break

            default:
                return null
        
        }
    
    })

}

const init = () => {

    setEvents ()

}

init ()