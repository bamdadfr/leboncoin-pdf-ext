import {getBrowser} from './get-browser';
import {setState} from './set-state';

/**
 * @description Get state instance.
 * @returns {Promise<object>} - State instance.
 */
export async function getState() {
  const browser = await getBrowser();

  const state = await new Promise((resolve) => {
    browser.storage.local.get(
      null,
      async (state) => {
        resolve(state);
      },
    );
  });

  if (typeof state.isTriggered === 'undefined') {
    await setState('isTriggered', false);
  }

  if (typeof state.isReloading === 'undefined') {
    await setState('isReloading', false);
  }

  if (typeof state.isReloaded === 'undefined') {
    await setState('isReloaded', false);
  }

  return state;
}
