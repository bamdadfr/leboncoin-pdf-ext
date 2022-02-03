import {getBrowser} from '../utils/get-browser';
import {StateType} from './get-state';

export enum StateKeys {
  isTriggered = 'isTriggered',
  isReloading = 'isReloading',
  setReloaded = 'setReloaded',
}

/**
 * Set the state of the application.
 *
 * @param {StateKeys} actionType - The action type.
 * @param {boolean} payload - The payload.
 */
export async function setState(actionType: StateKeys, payload: boolean): Promise<void> {
  const browser = getBrowser();

  // reducer
  switch (actionType) {
    case StateKeys.isTriggered: {
      const obj: Pick<StateType, StateKeys.isTriggered> = {
        isTriggered: payload,
      };

      await browser.storage.local.set(obj);
      break;
    }

    case StateKeys.isReloading: {
      const obj: Pick<StateType, StateKeys.isReloading> = {
        isReloading: payload,
      };

      await browser.storage.local.set(obj);
      break;
    }

    case StateKeys.setReloaded: {
      const obj: StateType = {
        isTriggered: false,
        isReloading: false,
      };

      await browser.storage.local.set(obj);
      break;
    }

    default: {
      throw new Error('Action type not found.');
    }
  }
}
