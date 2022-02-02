import {getState} from './get-state';
import {setState} from './set-state';

export async function initializeState(): Promise<void> {
  const state = await getState();

  if (typeof state.isTriggered === 'undefined') {
    await setState('isTriggered', false);
  }

  if (typeof state.isReloading === 'undefined') {
    await setState('isReloading', false);
  }
}
