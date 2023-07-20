import { Card, CardBody, Avatar, Typography } from '@material-tailwind/react';
import { ProfileInfoCard } from '../../widgets/cards/profile-info-card';
import { UserContext } from 'src/contexts/userContext';
import { useContext, useState, useEffect } from 'react';
import POIMap from 'src/components/POIMap';
import { useMutation } from '@apollo/client';
import { DELETE_USER } from 'src/services/mutations/userMutations';
import {
  Button,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogActions,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { UserDetailsProps } from 'src/types/UserType';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import classes from './Profile.module.css';
import ModalUpdateImage from './ModalUpdateImage';

export function Profile() {
  const { user, setUser } = useContext(UserContext);
  const [isEditMode, setIsEditMode] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [openModalUpdateImage, setOpenModalUpdateImage] = useState(false);
  const image_url = process.env.REACT_APP_IMAGE_URL;
  const [deleteUser, { loading: deleteLoading }] = useMutation(DELETE_USER);

  const navigate = useNavigate();

  const handleDeleteUser = async () => {
    try {
      await deleteUser({ variables: { deleteUserId: user?.id } });
      setOpenDeleteDialog(false);
      localStorage.removeItem('user');
      setUser(null);
      alert('Suppression de votre compte terminée');
    } catch (error: any) {
      console.error('Error deleting user: ', error);
      alert(`Erreur lors de la suppression de votre compte : ${error.message}`);
    }
  };

  const handleDeleteDialogClose = () => {
    setOpenDeleteDialog(false);
  };

  const handleDeleteDialogOpen = () => {
    setOpenDeleteDialog(true);
  };

  useEffect(() => {
    if (user === null) {
      navigate('/');
    }
  }, [user, navigate]);

  const details: UserDetailsProps[] = [
    {
      name: 'username',
      title: "Nom d'utilisateur",
      value: user ? user.username : null,
    },
    {
      name: 'firstname',
      title: 'Prénom',
      value: user ? user.firstname : null,
    },
    {
      name: 'lastname',
      title: 'Nom',
      value: user ? user.lastname : null,
    },
  ];

  return (
    user && (
      <>
        <div className="relative mt-8 h-72 w-full overflow-hidden rounded-xl bg-[url(https://images.unsplash.com/photo-1531512073830-ba890ca4eba2?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80)] bg-cover	bg-center">
          <div className="absolute inset-0 h-full w-full bg-blue-500/50" />
        </div>
        <Card className="mx-3 -mt-16 mb-6 lg:mx-4">
          <CardBody className="p-4">
            <div className="mb-10 flex items-center justify-between gap-6">
              <div className="flex items-center gap-6">
                <div className={classes.container}>
                  <Avatar
                    src={
                      user.profilePicture && user.profilePicture.length > 0
                        ? `${image_url}${user.profilePicture}`
                        : '/img/image-de-lutilisateur.png'
                    }
                    alt="profile-picture"
                    size="xl"
                    className="rounded-lg shadow-lg shadow-blue-gray-500/40 block"
                  />
                  <div className={classes.overlay}>
                    <div
                      className={classes.icon}
                      onClick={() => setOpenModalUpdateImage(true)}
                    >
                      <AddPhotoAlternateIcon className={classes.faUser} />
                    </div>
                    {openModalUpdateImage && (
                      <ModalUpdateImage
                        openModalUpdateImage={openModalUpdateImage}
                        setOpenModalUpdateImage={setOpenModalUpdateImage}
                      />
                    )}
                  </div>
                </div>

                <div>
                  <Typography variant="h5" color="blue-gray" className="mb-1">
                    {user && user.username}
                  </Typography>
                </div>
              </div>
            </div>
            <div className="gird-cols-1 mb-12 grid gap-6 px-4 xl:grid-cols-3">
              <ProfileInfoCard
                title="Informations de profil"
                details={details}
                setIsEditMode={setIsEditMode}
                isEditMode={isEditMode}
              />

              <div className="pl-2 xl:col-span-2">
                <Typography variant="h6" color="blue-gray" className="mb-10">
                  Points d'intérêt pouvant vous intéresser
                </Typography>
                <ul className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
                  <POIMap favorite={false} />
                </ul>
                <Typography variant="h6" color="blue-gray" className="my-10">
                  Vos lieux favoris
                </Typography>
                <ul className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
                  <POIMap favorite={true} />
                </ul>
              </div>
            </div>
          </CardBody>
          <div className="p-4">
            <Button
              variant="outlined"
              color="secondary"
              onClick={handleDeleteDialogOpen}
              className="text-xs float-left"
            >
              Supprimer votre compte
            </Button>
            <Dialog open={openDeleteDialog} onClose={handleDeleteDialogClose}>
              <DialogContent>
                <DialogContentText>
                  Attention, vous allez supprimer votre compte !
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleDeleteDialogClose}>Annuler</Button>
                <Button
                  onClick={handleDeleteUser}
                  disabled={deleteLoading}
                  color="error"
                >
                  Supprimer
                </Button>
              </DialogActions>
            </Dialog>
          </div>
        </Card>
      </>
    )
  );
}

export default Profile;
