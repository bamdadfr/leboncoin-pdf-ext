import {
  UtilsImageToBase64,
} from '../utils-image-to-base-64/utils-image-to-base-64';
import {
  UtilsGetDimensionsFromUrl,
} from '../utils-get-dimensions-from-url/utils-get-dimensions-from-url';
import {UtilsAsyncForEach} from '../utils-async-for-each/utils-async-for-each';

/**
 * @description Ad images
 * @param {object} json - Ad data
 * @returns {Promise<Array.<*>>} - Images block
 */
export async function AdImages(json) {
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

  await UtilsAsyncForEach(images, async (image, k) => {
    const base64 = await UtilsImageToBase64(image);
    const dimensions = await UtilsGetDimensionsFromUrl(image);

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
