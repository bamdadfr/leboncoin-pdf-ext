import {getState} from './get-state';
import {setState, StateKeys} from './set-state';

export const defaultState = {
  isTriggered: false,
  isReloading: false,
  isPhoneChecked: false,
};

/**
 * Initialize the state.
 */
export async function initializeState(): Promise<void> {
  const state = await getState();

  if (typeof state.isTriggered === 'undefined') {
    await setState(StateKeys.isTriggered, defaultState.isTriggered);
  }

  if (typeof state.isReloading === 'undefined') {
    await setState(StateKeys.isReloading, defaultState.isReloading);
  }

  if (typeof state.isPhoneChecked === 'undefined') {
    await setState(StateKeys.isPhoneChecked, defaultState.isPhoneChecked);
  }
}
