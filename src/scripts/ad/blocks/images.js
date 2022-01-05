import {
  convertToBase64,
} from '../../utils/convert-to-base64';
import {
  getDimensionsFromUrl,
} from '../../utils/get-dimensions-from-url';
import {asyncForEach} from '../../utils/async-for-each';

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
    const base64 = await convertToBase64(image);
    const dimensions = await getDimensionsFromUrl(image);

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
