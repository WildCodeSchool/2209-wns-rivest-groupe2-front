import { BsFillCameraFill } from 'react-icons/bs';
import type { ImagesProps } from 'src/types/POIType';

interface Props {
  handleImageUpload: (event: any) => void;
  handleImageChange: (event: any) => void;
  images: ImagesProps[] | [];
  reset: (id: number) => void;
  type?: string | null;
}

const DragAndDrop = ({
  handleImageUpload,
  handleImageChange,
  images,
  reset,
  type = null,
}: Props) => {
  return (
    <div className="flex flex-col items-center gap-2">
      {images.length === 0 && (
        <label className="flex justify-center w-full text-opalblue h-20 px-4 transition bg-primary border-2 border-opalblue rounded-2xl appearance-none cursor-pointer hover:border-info hover:text-info focus:outline-none">
          <span className="flex items-center">
            <BsFillCameraFill />
            <div className="flex flex-col items-center pl-2">
              <span className="font-bold">Choisissez une/des image(s)</span>
              <span className="text-sm">SVG, PNG, JPG ou AVIF</span>
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

      {images.length !== 0 && images[0].preview && !images[0]?.imageUrl && (
        <div className="flex flex-col items-center justify-center">
          {images.map((image) => (
            <figure className="relative my-3" key={image.id}>
              <div className="absolute top-5 left-5 -translate-x-1/4 -translate-y-1/2 flex gap-2">
                <button
                  className="bg-secondary rounded-full text-white w-8 h-8 flex items-center justify-center hover:scale-110"
                  onClick={() => reset(image.id)}
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
          ))}
          <div className="flex justify-center items-center">
            <label className="flex justify-center items-center text-opalblue p-2 h-10 mr-2 transition bg-primary border-2 border-opalblue rounded-2xl appearance-none cursor-pointer focus:outline-none">
              <BsFillCameraFill />
              <span className="text-xl pl-2">+</span>
              <input
                type="file"
                name="file_upload"
                onChange={handleImageChange}
                className="hidden"
                multiple
              />
            </label>
            <button
              type="button"
              onClick={handleImageUpload}
              className="p-2 h-10 text-opalblue text-center font-bold border-2 border-opalblue rounded-2xl"
            >
              {images.length === 1
                ? "Sauvegarder l'image"
                : 'Sauvegarder les images'}
            </button>
          </div>
        </div>
      )}
      {images.length !== 0 && images[0]?.preview && images[0]?.imageUrl && (
        <div className="flex flex-col items-center justify-center">
          <div className="flex justify-center flex-wrap items-center pb-3">
            {images.map((image) => (
              <figure key={image.id} className="pr-3">
                <img
                  src={image.preview}
                  alt="image"
                  className="w-24 h-16 bg-cover bg-center bg-no-repeat"
                />
              </figure>
            ))}
          </div>
          <span className="font-bold text-opalblue">
            {images.length > 1
              ? 'Images enregistrées !'
              : 'Image enregistrée !'}
          </span>
        </div>
      )}
    </div>
  );
};

export default DragAndDrop;
