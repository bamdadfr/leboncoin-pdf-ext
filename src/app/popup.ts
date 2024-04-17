import {getState} from './state/get-state';
import {setState, StateKeys} from './state/set-state';

let isAttached = false;

async function attach(): Promise<void> {
  if (isAttached) {
    return;
  }

  isAttached = true;

  const state = await getState();

  const exportButton = document.getElementById('export');
  exportButton.addEventListener('click', async () => {
    await setState(StateKeys.isTriggered, true);
  });

  const phoneCheckbox = document.getElementById(
    'phoneCheckbox',
  ) as HTMLInputElement;
  phoneCheckbox.checked = state.isPhoneChecked;
  phoneCheckbox.addEventListener('change', async () => {
    await setState(StateKeys.isPhoneChecked, phoneCheckbox.checked);
  });
}

window.addEventListener('load', attach);
