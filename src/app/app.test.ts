import {content} from './app';
import {State} from './state/get-state';
import {defaultState} from './state/initialize-state';

describe('content', () => {
  it('should be defined', () => {
    expect(content).toBeDefined();
  });

  it('should return an initialized state', async () => {
    const state: State = await content();
    expect(state.isTriggered).toBe(defaultState.isTriggered);
    expect(state.isReloading).toBe(defaultState.isReloading);
  });
});
