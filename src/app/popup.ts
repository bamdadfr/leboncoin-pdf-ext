import {setState, StateKeys} from './state/set-state';

let isAttached = false;

async function attach(): Promise<void> {
  if (isAttached) {
    return;
  }

  isAttached = true;

  const exportButton = document.getElementById('export');

  if (!exportButton) {
    throw new Error('could not get export button');
  }

  exportButton.addEventListener('click', async () => {
    await setState(StateKeys.isTriggered, true);
  });
}

window.addEventListener('load', attach);
