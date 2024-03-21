import ImageKit from 'imagekit';
import { ImageKitConfigs } from '../../app.config.mjs';
import { Logger } from '../../services/logger/logger.mjs';

let imageKit;

const uploadImage = async (fileName, file, useUniqueFileName = false) => {
  try {
    const base64 = file.buffer.toString('base64');
    const result = await imageKit.upload({
      fileName,
      file: base64,
      useUniqueFileName,
    });
    return result;
  } catch (error) {
    return {
      success: false,
      error,
    };
  }
};

const bootstrap = async () => {
  if (ImageKitConfigs.ENABLE_IMAGEKIT) {
    /**
     * @see https://www.npmjs.com/package/imagekit
     * @see https://docs.imagekit.io/api-reference/api-introduction/api-keys
     */
    imageKit = new ImageKit({
      publicKey: ImageKitConfigs.IMAGEKIT_PUBLIC_KEY,
      privateKey: ImageKitConfigs.IMAGEKIT_PRIVATE_KEY,
      urlEndpoint: ImageKitConfigs.IMAGEKIT_URL_ENDPOINT,
    });

    Logger.log('info', `ImageKit is ready to use`);
  }
};

export { bootstrap, uploadImage };
