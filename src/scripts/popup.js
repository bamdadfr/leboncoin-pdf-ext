import { StateSet } from './state-set/state-set'

const link = document.getElementById ('link')

link.addEventListener ('click', async () => {

    await StateSet ('isTriggered', true)
    
})
