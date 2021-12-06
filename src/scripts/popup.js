import {StateSet} from './state-set/state-set';

/**
 * @description Script for the popup.
 */
async function PopupOnLoad() {
  const link = document.getElementById('link');

  link.addEventListener('click', async () => {
    await StateSet('isTriggered', true);
  });
}

window.addEventListener('load', PopupOnLoad);
