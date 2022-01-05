import {setState} from './utils/set-state';
import {getState} from './utils/get-state';
import {Ad} from './ad/ad';

window.addEventListener('load', async () => {
  const state = await getState();

  if (state.isReloading === true && state.isTriggered === true) {
    await setState('isReloaded', true);

    if (document.visibilityState === 'visible') {
      const data = document.getElementById('__NEXT_DATA__').innerHTML;
      const ad = await new Ad(data);
      await ad.export();
    }
  }
});
