import {getBrowser} from './utils/get-browser';
import {setState} from './state/set-state';

/**
 * Background script entry point.
 */
async function background(): Promise<void> {
  const browser = getBrowser();

  // TODO: type derivative of state
  browser.storage.onChanged.addListener(async (changes: any) => {
    if (changes.isTriggered && changes.isTriggered.newValue === true) {
      await setState('isReloading', true);
      await browser.tabs.reload();
    }
  });
}

background().then(() => undefined);
