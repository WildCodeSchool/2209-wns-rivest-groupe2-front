import { useMutation } from '@apollo/client';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material';
import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { BsFillCameraFill } from 'react-icons/bs';
import { UserContext } from 'src/contexts/userContext';
import { UPDATE_USER } from 'src/services/mutations/userMutations';

type ModalUpdateImageProps = {
  openModalUpdateImage: boolean;
  setOpenModalUpdateImage: React.Dispatch<React.SetStateAction<boolean>>;
};

const ModalUpdateImage = (props: ModalUpdateImageProps) => {
  const { openModalUpdateImage, setOpenModalUpdateImage } = props;
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
  const { user, setUser } = useContext(UserContext);

  if (!user) return <div></div>;

  useEffect(() => {
    if (user.profilePicture && user.profilePicture.length > 0)
      setDataImg(`${image_url}${user.profilePicture}`);
  }, [user]);

  const [updateAvatarImg] = useMutation(UPDATE_USER, {
    context: {
      headers: {
        authorization: `Bearer ${token}`,
      },
    },
    onCompleted(data) {
      localStorage.setItem('user', JSON.stringify(data.updateUser));
      setUser(data.updateUser);
    },
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

  const deleteBackendUrlImg = async () => {
    try {
      await updateAvatarImg({
        variables: {
          data: {
            id: user.id,
            profilePicture: '',
          },
        },
      });
      resetImage();
      setDataImg(null);
    } catch (error: any) {
      console.log(error);
      alert(`Erreur lors de la suppression de l'image: ${error.message}`);
    }
  };

  const deleteImg = async () => {
    try {
      await axios.delete(`${image_url}/delete${user.profilePicture}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      await deleteBackendUrlImg();
    } catch (err) {
      console.error(err);
    }
  };

  const updateBackendUrlImg = async (data: {
    status: string;
    filename: string;
  }) => {
    try {
      await updateAvatarImg({
        variables: {
          data: {
            id: user.id,
            profilePicture: data.filename,
          },
        },
      });
      resetImage();
      setOpenModalUpdateImage(false);
      alert('Photo de profil ajoutée avec succès');
    } catch (error: any) {
      console.log(error);
      alert(`Erreur lors de la modification de l'image: ${error.message}`);
    }
  };

  const handleImageUpload = async () => {
    if (!dataImg || dataImg.length === 0) setOpenModalUpdateImage(false);
    const formData = new FormData();
    if (selectedImage.image)
      formData.append('file', selectedImage.image, selectedImage.image.name);

    const postUrl = `/upload/avatars/${user.id}`;
    try {
      const { data } = await axios.post(`${image_url}${postUrl}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      await updateBackendUrlImg(data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Dialog
      open={openModalUpdateImage}
      onClose={() => setOpenModalUpdateImage(false)}
      PaperProps={{
        sx: { width: '500px', maxWidth: '750px' },
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
        {dataImg && (
          <div className="flex flex-col justify-center items-center py-3">
            <figure className="w-full max-w-sm aspect-square rounded-full overflow-hidden flex justify-center items-center border border-white">
              <img
                src={dataImg}
                alt="blog cover"
                className="object-cover min-w-full min-h-full"
                width="400"
                height="400"
              />
            </figure>
            <button
              type="button"
              className="btn btn-secondary pt-5"
              onClick={() => {
                deleteImg();
              }}
            >
              Supprimer
            </button>
          </div>
        )}

        {selectedImage.preview && (
          <figure className="relative my-3 mx-auto">
            <div className="absolute top-5 left-5 -translate-x-1/4 -translate-y-1/2 flex gap-2">
              <button
                className="bg-secondary rounded-full w-8 h-8 flex items-center justify-center hover:scale-110"
                onClick={() => resetImage()}
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
            <figure className="aspect-square rounded-full overflow-hidden flex justify-center items-center">
              <img
                src={selectedImage.preview}
                alt="image"
                className="min-w-full min-h-full object-cover"
              />
            </figure>
          </figure>
        )}
        {!selectedImage.preview && !dataImg && (
          <label className="flex justify-center w-full mx-auto my-5 text-opalblue h-20 px-4 transition bg-primary border-2 border-opalblue rounded-2xl appearance-none cursor-pointer hover:border-info hover:text-info focus:outline-none">
            <span className="flex items-center">
              <BsFillCameraFill />
              <div className="flex flex-col items-center pl-2">
                <span className="font-bold">
                  Choisissez une photo de profil
                </span>
                <span className="text-sm">SVG, PNG, JPG ou AVIF</span>
              </div>
            </span>
            <input
              type="file"
              name="file_upload"
              onChange={handleImageChange}
              className="hidden"
            />
          </label>
        )}
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => {
            resetImage();
            setOpenModalUpdateImage(false);
          }}
        >
          Annuler
        </Button>
        <Button type="button" onClick={() => handleImageUpload()}>
          Sauvegarder
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ModalUpdateImage;
