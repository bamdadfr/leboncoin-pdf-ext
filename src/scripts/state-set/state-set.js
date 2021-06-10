import { Browser } from '../browser/browser'

export async function StateSet (type, payload) {

    const browser = await Browser ()

    // reducer
    switch (type) {

        case 'isTriggered':
            await browser.storage.local.set ({
                'isTriggered': payload,
            })

            break

        case 'isTriggeredAndRefreshed':
            await browser.storage.local.set ({
                'isTriggered': false,
                'isTriggeredAndRefreshed': payload,
            })

            break

        default:
            return null

    }

}