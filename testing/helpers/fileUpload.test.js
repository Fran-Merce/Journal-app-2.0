import { fileUpload } from '../../src/helpers/fileUpload';
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: 'dpvinqanp',
  api_key: '241385939995431',
  api_secret: 'ok4fSR4qLcmg24BlTZwxqti7aSw',
  secure: true,
});

describe('test on fileUpload', () => {
  test('should upload file and return the url', async () => {
    const fileUrl =
      'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/640px-Image_created_with_a_mobile_phone.png';
    const res = await fetch(fileUrl);
    const blob = await res.blob();
    const file = new File([blob], 'foto.png');
    const url = await fileUpload(file);
    expect(typeof url).toBe('string');
    const segments = url.split('/');
    const imageId = segments[segments.length - 1].replace('.png', '');
    await cloudinary.api.delete_resources(['journal-app/' + imageId]);
  });
  test('should return an error', async () => {
    const file = new File([], 'foto.png');
    const url = await fileUpload(file);
    expect(url).toEqual({
      ok: false,
      msg: 'no se pudo subir imagen',
    });
  });
});
