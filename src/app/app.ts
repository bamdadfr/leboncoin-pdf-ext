import {initializeState} from './state/initialize-state';
import {getState, State} from './state/get-state';
import {setState} from './state/set-state';
import {Ad} from './ad/ad';
import {getBrowser} from './utils/get-browser';
import {PDF} from './pdf/pdf';

export async function content(): Promise<State> {
  await initializeState();
  const state = await getState();

  if (state.isReloading === true && state.isTriggered === true) {
    await setState('SET_RELOADED', true);

    if (document.visibilityState === 'visible') {
      const json = Ad.parseLeboncoin();
      const ad = await new Ad(json);
      const pdf = new PDF(ad.name);

      const data = await ad.build();
      pdf.export(data);
    }
  }

  return state;
}

export async function background(): Promise<void> {
  const browser = getBrowser();

  // TODO: type derivative of state
  browser.storage.onChanged.addListener(async (changes: any) => {
    if (changes.isTriggered && changes.isTriggered.newValue === true) {
      await setState('isReloading', true);

      await browser.tabs.reload();
    }
  });
}

export async function popup(): Promise<void> {
  const link = document.getElementById('link');

  link.addEventListener('click', async () => {
    await setState('isTriggered', true);
  });
}