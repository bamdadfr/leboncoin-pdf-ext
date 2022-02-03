import {getState} from './get-state';
import {setState} from './set-state';

export const defaultState = {
  isTriggered: false,
  isReloading: false,
};

export async function initializeState(): Promise<void> {
  const state = await getState();

  if (typeof state.isTriggered === 'undefined') {
    await setState('isTriggered', defaultState.isTriggered);
  }

  if (typeof state.isReloading === 'undefined') {
    await setState('isReloading', defaultState.isReloading);
  }
}
