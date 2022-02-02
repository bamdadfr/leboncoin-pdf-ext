import {initializeState} from './state/initialize-state';
import {getState} from './state/get-state';
import {setState} from './state/set-state';
import {Ad} from './ad/ad';
import {getBrowser} from './utils/get-browser';

export async function content(): Promise<void> {
  await initializeState();
  const state = await getState();

  if (state.isReloading === true && state.isTriggered === true) {
    await setState('SET_RELOADED', true);

    if (document.visibilityState === 'visible') {
      const node = document.getElementById('__NEXT_DATA__');
      const data = node.innerHTML;
      const json = JSON.parse(data);
      const ad = await new Ad(json.props.pageProps.ad);
      await ad.export();
    }
  }
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
