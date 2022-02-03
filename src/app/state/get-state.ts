import {getBrowser} from '../utils/get-browser';

export interface State {
  isTriggered: boolean;
  isReloading: boolean;
}

/**
 * Get state of the app stored in the browser's local storage.
 *
 * @returns {Promise<State>} - Promise resolving to the state of the app.
 */
export function getState(): Promise<State> {
  const browser = getBrowser();
  return new Promise((resolve) => {
    browser.storage.local.get(
      null,
      async (state: State) => {
        resolve(state);
      },
    );
  });
}
