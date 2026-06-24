import {getBrowser} from '../utils/get-browser';

export interface StateType {
  isTriggered: boolean;
  isReloading: boolean;
}

export function getState(): Promise<StateType> {
  const browser = getBrowser();
  return new Promise((resolve) => {
    browser.storage.local.get(null, async (state: StateType) => {
      resolve(state);
    });
  });
}
