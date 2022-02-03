import {convertToBase64} from './convert-to-base64';

export const blob = new Blob(['test'], {type: 'image/jpeg'});
export const base64 = 'data:image/jpeg;base64,dGVzdA==';

describe('convertToBase64', () => {
  it('should return a base64 string', async () => {
    const response = await convertToBase64(blob);
    expect(response).toBe(base64);
  });
});
