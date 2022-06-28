export const fileUpload = async file => {
  if (!file) throw new Error("no hay ningun archivo");

  const cloudUrl = "https://api.cloudinary.com/v1_1/dpvinqanp/upload";
  const formData = new FormData();
  formData.append("upload_preset", "journal-2-0");
  formData.append("file", file);
  try {
    const resp = await fetch(cloudUrl, {
      method: "POST",
      body: formData,
    });
    if (!resp.ok) throw new Error("no se pudo subir imagen");

    return await resp.json();
  } catch (error) {
    error;
    throw new Error(error.message);
  }
};
