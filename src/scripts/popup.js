import { setState } from './services/browser'

const link = document.getElementById ('link')

link.addEventListener ('click', () => {

    setState ('isTriggered', true)

})
