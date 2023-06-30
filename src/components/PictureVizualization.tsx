import { useState, useEffect } from 'react';
import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';

type PictureVizualizationProps = {
  poiImages: string[];
};

const image_url = process.env.REACT_APP_IMAGE_URL;

const PictureVizualization = (props: PictureVizualizationProps) => {
  const { poiImages } = props;
  const [images, setImages] = useState<{}[]>([]);
  console.log(poiImages, images);
  useEffect(() => {
    const formatedImages = poiImages.map((image) => {
      return {
        original: image_url + image,
        thumbnail: image_url + image,
      };
    });
    console.log(formatedImages);
    setImages(formatedImages);
  }, []);

  return (
    <div className="image-gallery-wrapper">
      <ImageGallery items={images} showIndex={true} />
    </div>
  );
};

export default PictureVizualization;
