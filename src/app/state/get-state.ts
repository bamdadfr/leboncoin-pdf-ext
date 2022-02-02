import {getBrowser} from '../utils/get-browser';

export interface State {
  isTriggered: boolean;
  isReloading: boolean;
}

/**
 * @description Get state instance.
 * @returns {Promise<object>} - State instance.
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
