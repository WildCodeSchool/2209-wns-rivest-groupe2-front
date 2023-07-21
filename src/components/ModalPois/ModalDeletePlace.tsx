import { useMutation } from '@apollo/client';
import {
  GET_POI_QUERY,
  GET_POI_QUERY_BY_CITY,
} from 'src/services/queries/POIqueries';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  Button,
  DialogTitle,
} from '@mui/material';
import { DELETE_POI_MUTATION } from 'src/services/mutations/POIMutations';
import { useNavigate } from 'react-router-dom';
import { LatLngExpression } from 'leaflet';
import { useContext } from 'react';
import { NotificationContext } from 'src/contexts/NotificationsContext';

interface POICommentModalProps {
  poiId: number;
  openDeleteDialog: boolean;
  handleDeleteDialogClose?: () => void;
  city: {
    coordinates: LatLngExpression;
    id: number;
    name: string;
    __typename: string;
  };
}

const ModalDeletePlace: React.FC<POICommentModalProps> = ({
  poiId,
  openDeleteDialog,
  handleDeleteDialogClose,
  city,
}) => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const { setMessage } = useContext(NotificationContext);

  const [deletePoi] = useMutation(DELETE_POI_MUTATION, {
    context: {
      headers: {
        authorization: `Bearer ${token}`,
      },
    },
    refetchQueries: [
      { query: GET_POI_QUERY },
      { query: GET_POI_QUERY_BY_CITY, variables: { cityId: city.id } },
    ],
  });

  async function onDeletePoi() {
    try {
      await deletePoi({ variables: { deletePoiId: poiId } });
      handleDeleteDialogClose && handleDeleteDialogClose();
      setMessage({
        text: "Point d'intérêt supprimé avec succès",
        type: 'success',
      });
      navigate(`/point-of-interest/list/${city.id}/${city.name}`);
    } catch (error: any) {
      console.log(error);
      setMessage({
        text: `Erreur lors de la suppression du point d'intérêt: ${error.message}`,
        type: 'error',
      });
    }
  }

  return (
    <div>
      <Dialog open={openDeleteDialog} onClose={handleDeleteDialogClose}>
        <DialogTitle
          sx={{
            textAlign: 'center',
            backgroundColor: 'rgb(254, 74, 74)',
            color: 'white',
            marginBottom: '15px',
          }}
        >
          Suppression d'un point d'intérêt
        </DialogTitle>
        <DialogContent>
          <DialogContentText
            sx={{
              margin: '1rem 2rem',
              padding: '1rem 2rem',
            }}
          >
            Etes-vous sûr de vouloir supprimer ce point d'intérêt ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteDialogClose}>Annuler</Button>
          <Button onClick={onDeletePoi} color="error">
            Supprimer
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ModalDeletePlace;
