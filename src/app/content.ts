import {getState, State} from './state/get-state';
import {initializeState} from './state/initialize-state';
import {setState} from './state/set-state';
import {Ad} from './ad/ad';

/**
 * Content script entry point.
 *
 * @returns {Promise<State>} - The state of the extension.
 */
export async function content(): Promise<State> {
  await initializeState();
  const state = await getState();

  if (state.isReloading === true && state.isTriggered === true) {
    await setState('SET_RELOADED', true);

    if (document.visibilityState === 'visible') {
      const ad = new Ad();
      await ad.build();
      ad.export();
    }
  }

  return state;
}

window.addEventListener('load', content);
