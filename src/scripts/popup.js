import { StateSet } from './state-set/state-set'

/**
 * @function
 * @name PopupOnLoad
 * @description popup: on load
 * @return {Promise<void>}
 */
async function PopupOnLoad () {

    const link = document.getElementById ('link')

    link.addEventListener ('click', async () => {

        await StateSet ('isTriggered', true)

    })

}

window.addEventListener ('load', PopupOnLoad)