import { useMutation, useQuery } from '@apollo/client';
import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from 'src/contexts/userContext';
import {
  COMMENT_POI_MUTATION,
  UPDATE_COMMENT_POI_MUTATION,
} from 'src/services/mutations/commentMutations';
import {
  GET_COMMENTS_NUMBER_PER_POI,
  GET_USER_COMMENT_POI_QUERY,
} from 'src/services/queries/commentQueries';
import { DELETE_COMMENT } from 'src/services/queries/commentQueries';
import { HiPencilSquare } from 'react-icons/hi2';
import StarRating from './StarRating';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  Button,
  DialogTitle,
} from '@mui/material';
import { DialogHeader } from '@material-tailwind/react';
import { GET_POI_QUERY } from 'src/services/queries/POIqueries';

interface POIDetailsProps {
  className?: string;
  poiId: number;
  userId: number;
  type: 'delete' | 'update' | 'create';
  openDeleteDialog?: boolean;
  handleDeleteDialogClose?: () => void;
  openUpdateDialog?: boolean;
  handleUpdateDialogClose?: () => void;
  openCreateDialog?: boolean;
  handleCreateDialogClose?: () => void;
  commentId?: number;
  userRate?: number;
  userComment?: string;
}

const POIComment: React.FC<POIDetailsProps> = ({
  className = '',
  poiId,
  userId,
  type,
  openDeleteDialog,
  handleDeleteDialogClose,
  openCreateDialog,
  handleCreateDialogClose,
  openUpdateDialog,
  handleUpdateDialogClose,
  commentId,
  userRate,
  userComment,
}) => {
  const [currentComment, setCurrentComment] = useState<string | undefined>('');
  const [currentRate, setcurrentRate] = useState<number>(0);

  useEffect(() => {
    if (userComment) setCurrentComment(userComment);
    if (userRate) setcurrentRate(userRate);
  }, [userComment, userRate]);

  const { user } = useContext(UserContext);

  const { loading: userCommentLoading, data: userCommentData } = useQuery(
    GET_USER_COMMENT_POI_QUERY,
    {
      variables: { userId, poiId },
    }
  );

  const [deleteComment] = useMutation(DELETE_COMMENT, {
    refetchQueries: [
      { query: GET_POI_QUERY },
      'getAllPoi',
      { query: GET_COMMENTS_NUMBER_PER_POI, variables: { poiId } },
      'getNumberOfCommentsPerPOI',
    ],
  });

  const [commentPOI] = useMutation(COMMENT_POI_MUTATION, {
    context: {
      headers: {
        authorization: `Bearer ${user?.id}`,
      },
    },
    refetchQueries: [
      { query: GET_POI_QUERY },
      'getAllPoi',
      { query: GET_COMMENTS_NUMBER_PER_POI, variables: { poiId } },
      'getNumberOfCommentsPerPOI',
    ],
  });

  const [updateCommentPOI] = useMutation(UPDATE_COMMENT_POI_MUTATION, {
    context: {
      headers: {
        authorization: `Bearer ${user?.id}`,
      },
    },
    refetchQueries: [{ query: GET_POI_QUERY }, 'getAllPoi'],
  });

  const handleCommentDelete = async () => {
    try {
      await deleteComment({
        variables: {
          commentId,
          userId,
        },
      });
      handleDeleteDialogClose && handleDeleteDialogClose();
    } catch (error: any) {
      console.log(error);
      alert(`Erreur lors de la suppression du commentaire: ${error.message}`);
    }
  };

  const handleCommentSubmit = async () => {
    const variables = {
      comment: currentComment,
      rate: currentRate,
      userId,
      poiId,
    };
    try {
      if (userComment) {
        await updateCommentPOI({
          variables: {
            comment: currentComment,
            rate: currentRate,
            commentId,
            userId,
            poiId,
          },
        });
      } else {
        await commentPOI({ variables });
      }
      handleCreateDialogClose && handleCreateDialogClose();
      handleUpdateDialogClose && handleUpdateDialogClose();
      setCurrentComment(undefined);
      setcurrentRate(0);
    } catch (error) {
      console.log(error);
    }

    if (userCommentLoading) {
      return <div>Loading user comment...</div>;
    }
  };

  // ============================ HANDLE COMMENT CHANGE ============================
  const handleCommentChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setCurrentComment(event.target.value);
  };

  return (
    <div>
      {/* <div className={className ? className : 'mt-4'}>
        <h2 className="text-lg font-bold">Commentaires</h2>
        {editingComment ? (
          <form onSubmit={handleCommentSubmit} className="mt-4">
            <label htmlFor="currentComment" className="block font-medium">
              Modifiez votre commentaire
            </label>
            <textarea
              id="currentComment"
              name="currentComment"
              className="border-2 border-gray-200 p-2 w-full mt-2"
              value={currentComment}
              onChange={handleCommentChange}
            />
            <button type="submit" className="bg-blue-500 text-white p-2 mt-2">
              Enregistrer
            </button>
            <button
              type="button"
              className="bg-gray-300 text-gray-700 p-2 ml-2 mt-2"
              onClick={() => setEditingComment(false)}
            >
              Annuler
            </button>
          </form>
        ) : isFirstCommentSent ? (
          <div className="border-2 border-gray-200 p-2 mt-2">
            <p>"{currentComment}"</p>
            <p className="font-medium">
              - {user?.firstname} {user?.lastname}
            </p>
            <StarRating
              className="border-2 flex items-center justify-left"
              poiId={poiId}
              userId={userId}
            />
            <button
              type="button"
              className="bg-gray-300 text-gray-700 p-2 mt-2"
              onClick={handleEditClick}
            >
              <HiPencilSquare size={16} className="inline-block mr-1" /> Editer
            </button>
          </div>
        ) : (
          <form onSubmit={handleCommentSubmit} className="mt-4">
            <label htmlFor="currentComment" className="block font-medium">
              Ajouter un commentaire
            </label>
            <textarea
              id="currentComment"
              name="currentComment"
              className="border-2 border-gray-200 p-2 w-full mt-2"
              value={currentComment}
              onChange={handleCommentChange}
            />
            <button type="submit" className="bg-blue-500 text-white p-2 mt-2">
              Soumettre
            </button>
          </form>
        )}
      </div> */}
      {type === 'delete' && openDeleteDialog && handleDeleteDialogClose ? (
        <Dialog open={openDeleteDialog} onClose={handleDeleteDialogClose}>
          <DialogTitle
            sx={{
              textAlign: 'center',
              backgroundColor: 'rgb(254, 74, 74)',
              color: 'white',
              marginBottom: '15px',
            }}
          >
            Suppresion commentaire
          </DialogTitle>
          <DialogContent>
            <DialogContentText
              sx={{
                margin: '1rem 2rem',
                padding: '1rem 2rem',
              }}
            >
              Etes-vous sûr de vouloir supprimer votre commentaire ?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleDeleteDialogClose}>Annuler</Button>
            <Button onClick={handleCommentDelete} color="error">
              Supprimer
            </Button>
          </DialogActions>
        </Dialog>
      ) : type === 'create' && openCreateDialog && handleCreateDialogClose ? (
        <Dialog open={openCreateDialog} onClose={handleCreateDialogClose}>
          <DialogTitle
            sx={{
              textAlign: 'center',
              backgroundColor: 'rgb(0, 134, 179)',
              color: 'white',
              marginBottom: '15px',
            }}
          >
            Ajout d'un commentaire
          </DialogTitle>
          <DialogContent>
            <form
              onSubmit={handleCommentSubmit}
              className="mx-8 px-8 my-4 py-4"
            >
              <label htmlFor="currentComment" className="block font-medium">
                <textarea
                  id="currentComment"
                  name="currentComment"
                  rows={4}
                  cols={50}
                  className="border-2 border-gray-200 p-2 w-full mt-2"
                  value={currentComment}
                  onChange={handleCommentChange}
                />
              </label>
              <StarRating
                className="flex items-center justify-left"
                userRate={currentRate}
                setUserRate={setcurrentRate}
                isEditing={true}
              />
            </form>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCreateDialogClose}>Annuler</Button>
            <Button type="submit" onClick={handleCommentSubmit}>
              Ajouter
            </Button>
          </DialogActions>
        </Dialog>
      ) : type === 'update' &&
        userRate &&
        openUpdateDialog &&
        handleUpdateDialogClose ? (
        <Dialog open={openUpdateDialog} onClose={handleUpdateDialogClose}>
          <DialogTitle
            sx={{
              textAlign: 'center',
              backgroundColor: 'rgb(0, 134, 179)',
              color: 'white',
              marginBottom: '15px',
            }}
          >
            Modification d'un commentaire
          </DialogTitle>
          <DialogContent>
            <form
              onSubmit={handleCommentSubmit}
              className="mx-8 px-8 my-4 py-4"
            >
              <label htmlFor="currentComment" className="block font-medium">
                <textarea
                  id="currentComment"
                  name="currentComment"
                  rows={4}
                  cols={50}
                  className="border-2 border-gray-200 p-2 w-full mt-2"
                  value={currentComment}
                  onChange={handleCommentChange}
                />
              </label>
              <StarRating
                className="flex items-center justify-left"
                userRate={currentRate}
                setUserRate={setcurrentRate}
                isEditing={true}
              />
            </form>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleUpdateDialogClose}>Annuler</Button>
            <Button type="submit" onClick={handleCommentSubmit}>
              Modifier
            </Button>
          </DialogActions>
        </Dialog>
      ) : null}
    </div>
  );
};

export default POIComment;
