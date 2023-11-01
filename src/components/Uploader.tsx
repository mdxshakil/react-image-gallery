import { useState, FormEvent, useRef } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { uploadImageToCloudinary } from "../utils/uploader";
import { uploadNewImage } from "../api";

const Uploader = () => {
  const queryClient = useQueryClient();
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  //upload image to database
  const {
    mutateAsync: uploadImage,
    isPending,
    isError,
  } = useMutation({
    mutationFn: uploadNewImage,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["images"] });
    },
  });

  //handle form submit
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const result = await uploadImageToCloudinary(image);
      await uploadImage({ imageSrc: result.url });
      setLoading(false);
      setImage(null);
      // Clear the input field by resetting its value
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } catch (error) {
      setLoading(false);
    }
  };

  return (
    <>
      <form
        className="flex items-center justify-center"
        onSubmit={handleSubmit}
      >
        <div className="border-2 p-1 rounded-full bg-gray-200">
          <input
            type="file"
            accept="image/png, image/jpg, image/jpeg"
            ref={fileInputRef}
            required
            onChange={(e) => {
              const selectedFile = e.target.files?.[0];
              if (selectedFile) {
                setImage(selectedFile);
              }
            }}
            className="text-sm text-stone-500 file:mr-5 file:py-1 file:px-3 file:border-none file:text-xs file:font-medium file:bg-stone-300 file:rounded-full file:text-stone-700 hover:file:cursor-pointer hover:file:bg-blue-50 hover:file:text-blue-700"
          />
          <button
            type="submit"
            className="text-sm bg-blue-500 text-white rounded-full hover:bg-blue-700 hover:cursor-pointer px-2 py-1"
            disabled={loading || isPending}
          >
            {loading || isPending ? "Uploading..." : "Upload"}
          </button>
        </div>
      </form>
      {isError && (
        <p className="text-red-500 text-center text-sm mt-2">
          An Error occured. Try again
        </p>
      )}
    </>
  );
};

export default Uploader;
