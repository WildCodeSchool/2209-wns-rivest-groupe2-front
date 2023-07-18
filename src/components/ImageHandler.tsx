import { BsFillCameraFill } from 'react-icons/bs';
import type { ImagesProps } from 'src/types/POIType';

interface Props {
  handleImageChange: (event: any) => void;
  images: ImagesProps[] | [];
  reset: (id: number) => void;
  type?: string | null;
  dataImg: string[] | [];
  deleteImg?: (imgUrl: string) => Promise<void>;
}

const ImageHandler = ({
  handleImageChange,
  images,
  reset,
  type,
  dataImg,
  deleteImg,
}: Props) => {
  const image_url = process.env.REACT_APP_IMAGE_URL;

  return (
    <div className="flex flex-col items-center gap-2">
      {images.length === 0 && (!dataImg || dataImg.length === 0) && (
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

      {images.length !== 0 && images[0].preview && (
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
          {!dataImg ||
            (dataImg.length === 0 && (
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
              </div>
            ))}
        </div>
      )}

      {dataImg && dataImg.length > 0 && deleteImg && (
        <div className="flex justify-center flex-wrap items-center px-3">
          {dataImg.map((img, index) => (
            <div className="flex flex-col justify-center py-3" key={index}>
              <figure
                className={`${
                  type === 'avatar'
                    ? 'w-full max-w-sm aspect-square rounded-full'
                    : 'w-48 h-24'
                } overflow-hidden flex justify-center items-center border border-white`}
              >
                <img
                  src={`${image_url}${img}`}
                  alt="blog cover"
                  className="object-cover min-w-full min-h-full"
                  width="400"
                  height="400"
                />
              </figure>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => {
                  deleteImg(img);
                }}
              >
                Supprimer
              </button>
            </div>
          ))}
          <label className="flex justify-center items-center text-opalblue p-2 h-10 mx-2 transition bg-primary border-2 border-opalblue rounded-2xl appearance-none cursor-pointer focus:outline-none">
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
        </div>
      )}
    </div>
  );
};

export default ImageHandler;
