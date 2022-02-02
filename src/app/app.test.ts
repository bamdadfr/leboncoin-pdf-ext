import {background, content, popup} from './app';

it('should have content', () => {
  expect(content).toBeDefined();
  expect(background).toBeDefined();
  expect(popup).toBeDefined();
});
