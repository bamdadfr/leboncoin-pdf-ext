import {setState} from './state/set-state';

/**
 * Popup script entry point.
 */
async function popup(): Promise<void> {
  const link = document.getElementById('export');

  link.addEventListener('click', async () => {
    await setState('isTriggered', true);
  });
}

window.addEventListener('load', popup);
