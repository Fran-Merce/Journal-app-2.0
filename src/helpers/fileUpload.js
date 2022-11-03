export const fileUpload = async file => {
  if (!file) return null;
  const cloudUrl = 'https://api.cloudinary.com/v1_1/dpvinqanp/upload';
  const formData = new FormData();
  formData.append('upload_preset', 'journal-2-0');
  formData.append('file', file);
  try {
    const resp = await fetch(cloudUrl, {
      method: 'POST',
      body: formData,
    });
    if (!resp.ok) throw new Error('no se pudo subir imagen');
    const cloudResp = await resp.json();
    return cloudResp.url;
  } catch (error) {
    console.log(error)
    return {
      ok: false,
      msg: 'no se pudo subir imagen',
    };
  }
};
