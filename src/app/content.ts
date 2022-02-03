import {getState, StateType} from './state/get-state';
import {initializeState} from './state/initialize-state';
import {setState, StateKeys} from './state/set-state';
import {Ad} from './ad/ad';

/**
 * Content script entry point.
 *
 * @returns {Promise<StateType>} - The state of the extension.
 */
export async function content(): Promise<StateType> {
  await initializeState();
  const state = await getState();

  if (state.isReloading === true && state.isTriggered === true) {
    await setState(StateKeys.setReloaded, true);

    if (document.visibilityState === 'visible') {
      const ad = new Ad();
      await ad.build();
      ad.export();
    }
  }

  return state;
}

window.addEventListener('load', content);
