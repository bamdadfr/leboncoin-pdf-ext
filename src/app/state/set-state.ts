import {getBrowser} from '../utils/get-browser';
import {StateType} from './get-state';

export enum StateKeys {
  isTriggered = 'isTriggered',
  isReloading = 'isReloading',
  setReloaded = 'setReloaded',
  isPhoneChecked = 'isPhoneChecked',
}

/**
 * Set the state of the application.
 *
 * @param {StateKeys} actionType - The action type.
 * @param {boolean} payload - The payload.
 */
export async function setState(
  actionType: StateKeys,
  payload: boolean,
): Promise<void> {
  const browser = getBrowser();

  // reducer
  switch (actionType) {
    case StateKeys.isTriggered: {
      const obj: Partial<StateType> = {
        isTriggered: payload,
      };

      await browser.storage.local.set(obj);
      break;
    }

    case StateKeys.isReloading: {
      const obj: Partial<StateType> = {
        isReloading: payload,
      };

      await browser.storage.local.set(obj);
      break;
    }

    case StateKeys.setReloaded: {
      const obj: Partial<StateType> = {
        isTriggered: false,
        isReloading: false,
      };

      await browser.storage.local.set(obj);
      break;
    }

    case StateKeys.isPhoneChecked: {
      const obj: Partial<StateType> = {
        isPhoneChecked: payload,
      };

      await browser.storage.local.set(obj);
      break;
    }

    default: {
      throw new Error('Action type not found.');
    }
  }
}
