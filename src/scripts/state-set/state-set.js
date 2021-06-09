import { Browser } from '../browser/browser'

export async function StateSet (type, payload) {

    const state = await Browser ().storage.local.get ()
    const set = await Browser ().storage.local.set

    // reducer
    switch (type) {

        case 'isTriggered':
            await set ({
                ...state,
                'isTriggered': payload,
            })

            break

        case 'isTriggeredAndRefreshed':
            await set ({
                ...state,
                'isTriggered': false,
                'isTriggeredAndRefreshed': payload,
            })

            break

        default:
            return null

    }

}