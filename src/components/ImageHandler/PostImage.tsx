import { useState } from 'react';
import axios from 'axios';
import DragAndDrop from './DragAndDrop';

const PostImage = ({
  type,
  postUrl,
  updateBackendUrlImg,
}: {
  type: 'avatar' | 'poi';
  postUrl: string;
  updateBackendUrlImg: (imgUrl: string | null) => Promise<any>;
}) => {
  const [selectedImage, setSelectedImage] = useState<{
    image: Blob | null;
    imageUrl: string;
    preview: string | null;
  }>({
    image: null,
    imageUrl: '',
    preview: null,
  });

  const resetImage = () => {
    setSelectedImage({
      image: null,
      imageUrl: '',
      preview: null,
    });
  };

  const handleImageChange = (event: any) => {
    setSelectedImage({
      ...selectedImage,
      image: event.target.files[0],
      preview: URL.createObjectURL(event.target.files[0]),
    });
  };

  const handleImageUpload = async () => {
    const formData = new FormData();
    if (selectedImage.image)
      formData.append('file', selectedImage.image, selectedImage.image.name);

    const token = localStorage.getItem('token');
    try {
      const { data } = await axios.post(
        `http://localhost:9000${postUrl}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(data);
      await updateBackendUrlImg(data.filename);
      setSelectedImage({ ...selectedImage, imageUrl: data.filename });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <DragAndDrop
        handleImageUpload={handleImageUpload}
        handleImageChange={handleImageChange}
        image={selectedImage}
        reset={resetImage}
        type={type}
      />
    </>
  );
};

export default PostImage;
