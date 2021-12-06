import {StateSet} from './state-set/state-set';
import {Browser} from './browser/browser';

/**
 * @description Background script for the extension.
 */
async function BackgroundInit() {
  const browser = await Browser();

  browser.storage.onChanged.addListener(async (changes) => {
    if (changes.isTriggered && changes.isTriggered.newValue === true) {
      await StateSet('isReloading', true);

      await browser.tabs.reload();
    }
  });
}

BackgroundInit();
