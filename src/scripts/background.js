import {setState} from './utils/set-state';
import {getBrowser} from './utils/get-browser';

/**
 * @description Background script for the extension.
 */
async function BackgroundInit() {
  const browser = await getBrowser();

  browser.storage.onChanged.addListener(async (changes) => {
    if (changes.isTriggered && changes.isTriggered.newValue === true) {
      await setState('isReloading', true);

      await browser.tabs.reload();
    }
  });
}

BackgroundInit();
