import { setState } from './services/browser'

const link = document.getElementById ('link')

link.addEventListener ('click', async () => {

    await setState ('isTriggered', true)

})
