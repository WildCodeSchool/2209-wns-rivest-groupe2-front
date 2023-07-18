import { useMutation } from '@apollo/client';
import { Dialog, DialogContent, DialogTitle } from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { UPDATE_USER } from 'src/services/mutations/userMutations';
import { IUser } from 'src/types/IUserContext';
import { ImagesProps } from 'src/types/POIType';

type ModalUpdateImageProps = {
  openModalUpdateImage: boolean;
  setOpenModalUpdateImage: React.Dispatch<React.SetStateAction<boolean>>;
  user: IUser;
  /* handleImageChange: (event: any) => void;
  reset: () => void;
  deleteImg: (imgUrl: string) => Promise<void>; */
};

const ModalUpdateImage = (props: ModalUpdateImageProps) => {
  const {
    openModalUpdateImage,
    setOpenModalUpdateImage,
    user,
    /* handleImageChange,
    reset,
    deleteImg, */
  } = props;
  const image_url = process.env.REACT_APP_IMAGE_URL;
  const token = localStorage.getItem('token');
  const [selectedImage, setSelectedImage] = useState<{
    image: Blob | null;
    imageUrl: string | null;
    preview: string | null;
  }>({
    image: null,
    imageUrl: null,
    preview: null,
  });
  const [dataImg, setDataImg] = useState<string | null>(null);

  useEffect(() => {
    if (user.profilePicture) setDataImg(`${image_url}${user.profilePicture}`);
  }, []);

  const [updateAvatarImg] = useMutation(UPDATE_USER, {
    context: {
      headers: {
        authorization: `Bearer ${token}`,
      },
    },
  });

  const resetImage = () => {
    setSelectedImage({
      image: null,
      imageUrl: '',
      preview: null,
    });
  };

  const deleteImg = async () => {
    try {
      await axios.delete(`${image_url}/delete${user.profilePicture}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      /* await deleteBackendUrlImg(imgUrl); */
    } catch (err) {
      console.error(err);
    }
  };

  const handleImageChange = (event: any) => {
    setSelectedImage({
      ...selectedImage,
      image: event.target.files[0],
      preview: URL.createObjectURL(event.target.files[0]),
    });
  };

  /*   const updateBackendUrlImg = async (
    data: { status: string; filename: string }
  ) => {
    try {
      await updateAvatarImg({
        variables: {
          data: {
            id: user.id,
            pictureUrl: pictureUrlArray,
          },
        },
      });
    } catch (error: any) {
      console.log(error);
      alert(`Erreur lors de la modification de l'image: ${error.message}`);
    }
  }; */

  /*   const deleteBackendUrlImg = async (imgUrl: string) => {
    try {
      console.log('imgUrl', imgUrl);
      await updateAvatarImg({
        variables: {
          data: {
            id: user.id,
            pictureUrl: '',
          },
        },
      });
    } catch (error: any) {
      console.log(error);
      alert(`Erreur lors de la suppression de l'image: ${error.message}`);
    }
  }; */

  const handleImageUpload = async () => {
    const formData = new FormData();
    if (selectedImage.image)
      formData.append('file', selectedImage.image, selectedImage.image.name);

    const postUrl = `/upload/avatar/${user.id}`;
    try {
      const { data } = await axios.post(`${image_url}${postUrl}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(data);
      /* await updateBackendUrlImg(data); */
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Dialog
      open={openModalUpdateImage}
      onClose={() => setOpenModalUpdateImage(false)}
      PaperProps={{
        sx: { width: '750px', maxWidth: '1000px' },
      }}
    >
      <DialogTitle
        sx={{
          textAlign: 'center',
          backgroundColor: 'rgb(68, 189, 190)',
          color: 'white',
          marginBottom: '15px',
        }}
      >
        Modifier la photo de profil
      </DialogTitle>
      <DialogContent>
        {user.profilePicture ? (
          <div className="flex flex-col justify-center py-3">
            <figure className="w-full max-w-sm aspect-square rounded-full overflow-hidden flex justify-center items-center border border-white">
              <img
                src={`${image_url}${user.profilePicture}`}
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
                deleteImg();
              }}
            >
              Supprimer
            </button>
          </div>
        ) : (
          <div></div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ModalUpdateImage;
