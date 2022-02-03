import {getBrowser} from './utils/get-browser';
import {setState} from './state/set-state';

/**
 * Background script entry point.
 */
async function background(): Promise<void> {
  const browser = getBrowser();

  browser.storage.onChanged.addListener(async (changes) => {
    if (changes.isTriggered && changes.isTriggered.newValue === true) {
      await setState('isReloading', true);
      await browser.tabs.reload();
    }
  });
}

background().then(() => undefined);
