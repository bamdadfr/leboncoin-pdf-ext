// preferring `chrome` instead of `browser` (cross-browser)
// eslint-disable-next-line no-undef
export const getBrowser = () => chrome

export const getState = async () => await getBrowser ().storage.local.get ([], () => {
    // dummy for chrome
})

export const setState = async (type, payload) => {

    const state = await getState ()

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