// prefering `chrome` instead of `browser` (cross-browser)
// eslint-disable-next-line no-undef
export const getBrowser = () => chrome

export const getState = async () => {

    const state = await getBrowser ().storage.local.get ([], () => {
        // dummy for chrome
    })

    return state

}

export const setState = async (type, payload) => {

    const state = await getState ()

    // console.log ('type', type)

    // console.log ('payload', payload)

    switch (type) {

        case 'isTriggered':
            await getBrowser ().storage.local.set ({
                ...state,
                'isTriggered': payload,
            })

            break

        default:
            return null    
    
    }
    
}