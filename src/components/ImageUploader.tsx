interface ImageUploaderProps {
  handleImageChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  image: string | null;
}

export function ImageUploader({
  handleImageChange,
  image,
}: ImageUploaderProps) {
  return (
    <section className="flex flex-col items-center justify-center w-full">
      <label
        htmlFor="image-upload"
        className="block text-gray-700 font-bold mb-2 mt-4"
      >
        Upload a jpeg image
      </label>
      <div className="border-2 border-gray-400 border-dashed rounded-md p-4 w-full flex flex-col justify-center items-center">
        <input
          id="image-upload"
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="hidden"
        />
        <label htmlFor="image-upload" className="cursor-pointer">
          <svg
            className="w-6 h-6 text-gray-400 mx-auto"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            />
          </svg>
          <span className="text-gray-600 block mt-2 text-center">
            Choose a file.
          </span>
        </label>
        {image && (
          <div className="mt-4">
            <img src={image} alt="uploaded" width="300" className="max-h-96" />
          </div>
        )}
      </div>
    </section>
  );
}
