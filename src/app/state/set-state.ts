import {getBrowser} from '../utils/get-browser';
import {State} from './get-state';

type ActionType = keyof State | 'SET_RELOADED'

/**
 * Set the state of the application.
 *
 * @param {ActionType} actionType - The action type.
 * @param {boolean} payload - The payload.
 */
export async function setState(actionType: ActionType, payload: boolean): Promise<void> {
  const browser = getBrowser();

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
