import { useState } from 'react';
import axios from 'axios';
import DragAndDrop from './DragAndDrop';
import { ImagesProps } from 'src/types/POIType';

const image_url = process.env.REACT_APP_IMAGE_URL;

const PostImage = ({
  type,
  postUrl,
  updateBackendUrlImg,
}: {
  type: 'avatar' | 'poi';
  postUrl: string;
  updateBackendUrlImg: (
    data: Array<{ status: string; filename: string }>
  ) => Promise<any>;
}) => {
  const [selectedImage, setSelectedImage] = useState<Array<ImagesProps>>([]);

  const resetImage = (id: number) => {
    const newImageArray = selectedImage.filter((image) => image.id !== id);
    setSelectedImage(newImageArray);
  };

  const handleImageChange = (event: any) => {
    const filesAmount = event.target.files.length;
    for (let i = 0; i < filesAmount; i++) {
      const image = {
        image: event.target.files[i],
        preview: URL.createObjectURL(event.target.files[i]),
        id: selectedImage.length + i + 1,
        imageUrl: null,
      };
      setSelectedImage((selectedImage) => [...selectedImage, image]);
    }
  };

  const handleImageUpload = async () => {
    const formData = new FormData();

    if (selectedImage.length > 0) {
      for (let i = 0; i < selectedImage.length; i++) {
        formData.append(
          'file',
          selectedImage[i].image,
          selectedImage[i].image.name
        );
      }
    }

    const token = localStorage.getItem('token');
    try {
      const { data } = await axios.post(`${image_url}${postUrl}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(data);
      await updateBackendUrlImg(data);
      setSelectedImage(
        selectedImage.map((item, i) => ({
          ...item,
          imageUrl: data[i].filename,
        }))
      );
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <DragAndDrop
        handleImageUpload={handleImageUpload}
        handleImageChange={handleImageChange}
        images={selectedImage}
        reset={resetImage}
        type={type}
      />
    </>
  );
};

export default PostImage;
