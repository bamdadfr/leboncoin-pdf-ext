import {
  fetchAndConvertToBase64,
} from '../../utils/fetch-and-convert-to-base64';
import {asyncForEach} from '../../utils/async-for-each';
import {getDimensionsFromBase64} from '../../utils/get-dimensions-from-base64';

/**
 * @description Ad images
 * @param {object} json - Ad data
 * @returns {Promise<Array.<*>>} - Images block
 */
export async function Images(json) {
  const data = [];
  let images = undefined;

  if (json.images.urls_large) {
    images = json.images.urls_large;
  } else if (json.images.urls) {
    images = json.images.urls;
  }

  if (images === undefined) {
    return data;
  }

  await asyncForEach(images, async (image, k) => {
    const base64 = await fetchAndConvertToBase64(image);

    if (typeof base64 === 'undefined') {
      return;
    }

    const dimensions = await getDimensionsFromBase64(base64);

    data.push(
      {
        isImage: true,
        id: k + 1,
        total: images.length,
        url: image,
        base64,
        width: dimensions.width,
        height: dimensions.height,
      },
    );
  });

  return data;
}