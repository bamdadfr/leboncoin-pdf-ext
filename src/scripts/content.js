import {StateSet} from './state-set/state-set';
import {State} from './state/state';
import {Ad} from './ad/ad';

/**
 * @description On load, the content script will be injected into the page.
 */
async function ContentOnLoad() {
  const state = await State();

  if (state.isReloading === true && state.isTriggered === true) {
    await StateSet('isReloaded', true);

    if (document.visibilityState === 'visible') {
      const nextData = document.getElementById('__NEXT_DATA__').innerHTML;
      const ad = await new Ad(nextData);

      ad.export();
    }
  }
}

window.addEventListener('load', ContentOnLoad);
