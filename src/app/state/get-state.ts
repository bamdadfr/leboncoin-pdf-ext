import {getBrowser} from '../utils/get-browser';

export interface StateType {
  isTriggered: boolean;
  isReloading: boolean;
  isPhoneChecked: boolean;
}

/**
 * Get state of the app stored in the browser's local storage.
 *
 * @returns {Promise<StateType>} - Promise resolving to the state of the app.
 */
export function getState(): Promise<StateType> {
  const browser = getBrowser();
  return new Promise((resolve) => {
    browser.storage.local.get(null, async (state: StateType) => {
      resolve(state);
    });
  });
}
