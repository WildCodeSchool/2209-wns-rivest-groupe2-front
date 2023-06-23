import {
  Card,
  CardBody,
  Avatar,
  Typography,
  Tooltip,
} from '@material-tailwind/react';
import { useQuery } from '@apollo/client';

import { PencilIcon } from '@heroicons/react/24/solid';
import { ProfileInfoCard } from '../../widgets/cards/profile-info-card';
import { UserContext } from 'src/contexts/userContext';
import { useContext, useState, useEffect, useRef } from 'react';
import { GET_POI_QUERY } from 'src/services/queries/POIqueries';
import POIMap from 'src/components/POIMap';
import { useMutation } from '@apollo/client';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import { DELETE_USER } from 'src/services/mutations/userMutations';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export function Profile() {
  const { user, setUser } = useContext(UserContext);
  const [isEditMode, setIsEditMode] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [deleteUser, { loading: deleteLoading, error: deleteError }] =
    useMutation(DELETE_USER);

  const navigate = useNavigate();

  const handleDeleteUser = async () => {
    try {
      await deleteUser({ variables: { deleteUserId: user?.id } });
      setOpenDeleteDialog(false);
      localStorage.removeItem('user');
      setUser(null);
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const handleDeleteDialogClose = () => {
    setOpenDeleteDialog(false);
  };

  const handleDeleteDialogOpen = () => {
    setOpenDeleteDialog(true);
  };

  const POIData = useQuery(GET_POI_QUERY);

  const [isTruncated, setIsTruncated] = useState(false);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = textRef.current;
    if (element?.clientHeight) {
      const lineHeight = parseInt(getComputedStyle(element).lineHeight);
      const maxHeight = lineHeight * 2;
      if (element.clientHeight > maxHeight) {
        setIsTruncated(true);
      }
    }
  }, []);

  useEffect(() => {
    if (user === null) {
      navigate('/');
    }
  }, [user, navigate]);

  return (
    <>
      <div className="relative mt-8 h-72 w-full overflow-hidden rounded-xl bg-[url(https://images.unsplash.com/photo-1531512073830-ba890ca4eba2?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80)] bg-cover	bg-center">
        <div className="absolute inset-0 h-full w-full bg-blue-500/50" />
      </div>
      <Card className="mx-3 -mt-16 mb-6 lg:mx-4">
        <CardBody className="p-4">
          <div className="mb-10 flex items-center justify-between gap-6">
            <div className="flex items-center gap-6">
              <Avatar
                src="/img/bruce-mars.jpeg"
                alt="bruce-mars"
                size="xl"
                className="rounded-lg shadow-lg shadow-blue-gray-500/40"
              />
              <div>
                <Typography variant="h5" color="blue-gray" className="mb-1">
                  {user && user.firstname}
                </Typography>
                <Typography
                  variant="small"
                  className="font-normal text-blue-gray-600"
                >
                  Eclaireur
                </Typography>
              </div>
            </div>
          </div>
          <div className="gird-cols-1 mb-12 grid gap-6 px-4 xl:grid-cols-3">
            <ProfileInfoCard
              title="Informations de profil"
              details={{
                "Nom d'utilisateur": user ? user.username : 'undefined',
                prénom: user ? user.firstname : 'undefined',
                nom: user ? user.lastname : 'undefined',
                email: user ? user.email : 'undefined',
              }}
              action={
                <Tooltip content="Edit Profile">
                  <button
                    type="submit"
                    form="userForm"
                    value="Update"
                    onClick={() => {
                      if (isEditMode === false) {
                        setIsEditMode(!isEditMode);
                      }
                      if (isEditMode === true) {
                        document.body.style.cursor = 'wait';
                        setTimeout(() => {
                          document.body.style.cursor = 'default';
                          setIsEditMode(!isEditMode);
                        }, 2000);
                      }
                    }}
                  >
                    {isEditMode === false ? (
                      <PencilIcon className="h-4 w-4 cursor-pointer text-blue-gray-500" />
                    ) : (
                      <div className="border-2 px-2 text-blue-gray-500">
                        Save
                      </div>
                    )}
                  </button>
                </Tooltip>
              }
              isEditMode={isEditMode}
            />

            <div className="pl-2 xl:col-span-2">
              <Typography variant="h6" color="blue-gray" className="mb-2">
                Point of interests - Migth interest you
              </Typography>
              <ul className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
                <POIMap />
              </ul>
              <Typography variant="h6" color="blue-gray" className="mb-2">
                Vos lieux favoris
              </Typography>
              <ul className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
                <POIMap />
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
  );
}

export default Profile;
