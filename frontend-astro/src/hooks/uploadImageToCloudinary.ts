export const uploadImageToCloudinary = async (file:File):Promise<string> => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "troubleshooting");

  const res = await fetch(
    "https://api.cloudinary.com/v1_1/dqghdryuh/image/upload",
    {
      method: "POST",
      body: formData,
    }
  );
  if (!res.ok) {
    throw new Error("Failed to upload image");
  }
  const data = await res.json();
  return data.secure_url;
};
