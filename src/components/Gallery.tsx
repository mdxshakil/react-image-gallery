import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import LoadingSpinner from "./LoadingSpinner";
import { IImage } from "../interface";
import MessageElement from "./MessageElement";
import { deleteImages, getImages } from "../api";

const Gallery = () => {
  const queryClient = useQueryClient();
  const [selectedImage, setSeletedImage] = useState<Array<string>>([]);

  //fetch images
  const { isPending, isError, data } = useQuery({
    queryKey: ["images"],
    queryFn: getImages,
  });

  //delete images
  const { mutateAsync: deleteImage, isPending: deletePending } = useMutation({
    mutationFn: deleteImages,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["images"] });
    },
  });

  //handle image selection for deleting images
  const handleImageSelection = (id: string) => {
    if (selectedImage.includes(id)) {
      setSeletedImage(selectedImage.filter((imageId) => id != imageId));
    } else {
      setSeletedImage([...selectedImage, id]);
    }
  };

  //handle imagesdeletion
  const handleImageDeletion = async () => {
    await deleteImage(selectedImage);
    setSeletedImage([]);
  };

  //decide what to render
  let content;
  if (isPending) {
    content = <LoadingSpinner />;
  } else if (!isPending && isError) {
    content = <MessageElement message=" Failed to fetch images" />;
  } else if (!isPending && !isError && data?.length === 0) {
    content = <MessageElement message="No images available" />;
  } else if (!isPending && !isError && data?.length > 0) {
    content = (
      <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-3 mt-6">
        {data?.map((image: IImage) => (
          <div className="mb-3 w-full break-inside-avoid" key={image._id}>
            <img
              className={`w-full rounded-lg transition-all cursor-pointer px-2 md:px-0 ${
                selectedImage.includes(image._id)
                  ? " opacity-50 border-red-400"
                  : "scale-100"
              }`}
              src={image.imageSrc}
              alt="Image"
              onClick={() => handleImageSelection(image._id)}
            />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="py-12 my-2">
      {selectedImage.length > 0 && (
        <div className="flex gap-3 my-2">
          <p className="font-bold">
            Total {selectedImage.length} images selected
          </p>
          <button
            className="bg-blue-400 px-2 text-white text-sm rounded-full"
            onClick={() => setSeletedImage([])}
          >
            Clear
          </button>
          <button
            className="bg-red-400 px-2 text-white text-sm rounded-full"
            onClick={handleImageDeletion}
            disabled={deletePending}
          >
            {deletePending ? "Deleting..." : "Delete"}
          </button>
        </div>
      )}
      {content}
    </div>
  );
};

export default Gallery;
