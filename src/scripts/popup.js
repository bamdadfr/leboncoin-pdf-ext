import {setState} from './utils/set-state';

window.addEventListener('load', async () => {
  const link = document.getElementById('link');

  link.addEventListener('click', async () => {
    await setState('isTriggered', true);
  });
});
