import {getBrowser} from '../utils/get-browser';
import {State} from './get-state';

type ActionType = keyof State | 'SET_RELOADED'

/**
 * @description Set the state of the browser.
 * @param {string} actionType - Type of state to set.
 * @param {boolean} payload - Payload of state to set.
 * @returns {Promise<void>}
 */
export async function setState(actionType: ActionType, payload: boolean): Promise<void> {
  const browser = await getBrowser();

  // reducer
  switch (actionType) {
    case 'isTriggered': {
      const obj: Pick<State, 'isTriggered'> = {
        isTriggered: payload,
      };

      await browser.storage.local.set(obj);
      break;
    }

    case 'isReloading': {
      const obj: Pick<State, 'isReloading'> = {
        isReloading: payload,
      };

      await browser.storage.local.set(obj);
      break;
    }

    case 'SET_RELOADED': {
      const obj: State = {
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
