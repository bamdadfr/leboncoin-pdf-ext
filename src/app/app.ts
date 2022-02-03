import {initializeState} from './state/initialize-state';
import {getState, State} from './state/get-state';
import {setState} from './state/set-state';
import {Ad} from './ad/ad';
import {getBrowser} from './utils/get-browser';

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

/**
 * Background script entry point.
 */
export async function background(): Promise<void> {
  const browser = getBrowser();

  // TODO: type derivative of state
  browser.storage.onChanged.addListener(async (changes: any) => {
    if (changes.isTriggered && changes.isTriggered.newValue === true) {
      await setState('isReloading', true);
      await browser.tabs.reload();
    }
  });
}

/**
 * Popup script entry point.
 */
export async function popup(): Promise<void> {
  const link = document.getElementById('export');

  link.addEventListener('click', async () => {
    await setState('isTriggered', true);
  });
}
