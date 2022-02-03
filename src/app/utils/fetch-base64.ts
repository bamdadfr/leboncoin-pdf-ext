import {convertToBase64} from './convert-to-base64';

export async function fetchBase64(url: string): Promise<string> {
  let response;
  try {
    response = await fetch(url);
  } catch {
    throw new Error('Failed to fetch image');
  }

  const blob = await response.blob();
  const base64 = await convertToBase64(blob);

  if (!base64) {
    throw new Error('Failed to convert image to base64');
  }

  return base64;
}
