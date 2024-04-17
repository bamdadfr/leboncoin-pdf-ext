import {getState} from './state/get-state';
import {initializeState} from './state/initialize-state';
import {setState, StateKeys} from './state/set-state';
import {Ad} from './ad/ad';
import {addContentButton} from './utils/add-content-button';

export async function content(): Promise<void> {
  await initializeState();
  const state = await getState();

  if (state.isReloading === true && state.isTriggered === true) {
    await setState(StateKeys.setReloaded, true);

    if (document.visibilityState === 'visible') {
      const ad = new Ad({gatherPhone: state.isPhoneChecked});
      await ad.build();
      ad.export();
    }
  }

  addContentButton();
}

window.addEventListener('load', content);
