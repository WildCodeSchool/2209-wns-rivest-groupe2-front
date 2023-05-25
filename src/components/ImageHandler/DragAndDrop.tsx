import { BsFillCameraFill } from 'react-icons/bs';

interface Props {
  handleImageUpload: (event: any) => void;
  handleImageChange: (event: any) => void;
  image: {
    image: any;
    imageUrl: string;
    preview: any;
  };
  reset: () => void;
  type?: string | null;
}

const DragAndDrop = ({
  handleImageUpload,
  handleImageChange,
  image,
  reset,
  type = null,
}: Props) => {
  return (
    <div className="flex flex-col items-center gap-2">
      {!image.image && (
        <label className="flex justify-center w-full text-opalblue h-20 px-4 transition bg-primary border-2 border-opalblue rounded-2xl appearance-none cursor-pointer hover:border-info hover:text-info focus:outline-none">
          <span className="flex items-center">
            <BsFillCameraFill />
            <div className="flex flex-col items-center pl-2">
              <span className="font-bold">Choisissez une image</span>
              <span className="text-sm">SVG, PNG, JPG ou GIF</span>
            </div>
          </span>
          <input
            type="file"
            name="file_upload"
            onChange={handleImageChange}
            className="hidden"
            multiple
          />
        </label>
      )}

      {image.preview && !image.imageUrl && (
        <>
          <figure className="relative">
            <div className="absolute top-5 left-5 -translate-x-1/4 -translate-y-1/2 flex gap-2">
              <button
                className="bg-secondary rounded-full text-white w-8 h-8 flex items-center justify-center hover:scale-110"
                onClick={() => reset()}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
              <label className="bg-info rounded-full text-white w-8 h-8 flex items-center justify-center hover:scale-110">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                  />
                </svg>
                <input
                  type="file"
                  name="file_upload"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </label>
            </div>
            <figure
              className={`${
                type === 'avatar'
                  ? 'w-96 aspect-square rounded-full'
                  : 'w-50 h-25'
              } overflow-hidden flex justify-center items-center`}
            >
              <img
                src={image.preview}
                alt="image"
                className="min-w-full min-h-full object-cover"
              />
            </figure>
          </figure>
          <button
            type="button"
            onClick={handleImageUpload}
            className="btn btn-info z-300 px-4 py-2 text-opalblue font-bold border-2 border-opalblue rounded-2xl"
          >
            Sauvegarder l'image
          </button>
        </>
      )}
      {image.preview && image.imageUrl && (
        <>
          <figure>
            <img src={image.preview} alt="image" className="w-24" />
          </figure>
          <span className="font-bold text-opalblue">Image enregistrée !</span>
        </>
      )}
    </div>
  );
};

export default DragAndDrop;
