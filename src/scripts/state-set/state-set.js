import {Browser} from '../browser/browser';

/**
 * @description Set the state of the browser.
 * @param {string} type - Type of state to set.
 * @param {boolean} payload - Payload of state to set.
 * @returns {Promise<void>}
 */
export async function StateSet(type, payload) {
  const browser = await Browser();

  // reducer
  switch (type) {
    case 'isTriggered': {
      await browser.storage.local.set({
        isTriggered: payload,
      });
      break;
    }

    case 'isReloading': {
      await browser.storage.local.set({
        isReloading: payload,
      });
      break;
    }

    case 'isReloaded': {
      await browser.storage.local.set({
        isTriggered: false,
        isReloading: false,
        isReloaded: payload,
      });
      await browser.storage.local.set({
        isReloaded: false,
      });
      break;
    }

    default: {
      throw new Error('state error');
    }
  }
}
