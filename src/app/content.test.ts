import {content} from './content';
import {getState} from './state/get-state';
import {defaultState, initializeState} from './state/initialize-state';

describe('content', () => {
  it('should be defined', () => {
    expect(content).toBeDefined();
  });

  it('should return an initialized state', async () => {
    await initializeState();
    const state = await getState();
    expect(state.isTriggered).toBe(defaultState.isTriggered);
    expect(state.isReloading).toBe(defaultState.isReloading);
  });
});
