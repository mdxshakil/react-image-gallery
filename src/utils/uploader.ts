/* eslint-disable @typescript-eslint/no-explicit-any */
export const uploadImageToCloudinary = async (imageData: any) => {
  const formData = new FormData();
  formData.append("file", imageData);
  formData.append(
    "upload_preset",
    import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET
  );
  formData.append("cloud_name", import.meta.env.VITE_CLOUDINARY_CLOUD_NAME);

  const res = await fetch(import.meta.env.VITE_CLOUDINARY_URL, {
    method: "post",
    body: formData,
  });
  const result = await res.json();
  return result;
};
