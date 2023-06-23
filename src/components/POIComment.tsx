import { useMutation, useQuery } from '@apollo/client';
import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from 'src/contexts/userContext';
import { COMMENT_POI_MUTATION } from 'src/services/mutations/commentMutations';
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
  openDeleteDialog: boolean;
  handleDeleteDialogClose: () => void;
  commentId?: number;
}

const POIComment: React.FC<POIDetailsProps> = ({
  className = '',
  poiId,
  userId,
  type,
  openDeleteDialog,
  handleDeleteDialogClose,
  commentId,
}) => {
  const [currentComment, setCurrentComment] = useState<string | undefined>('');
  const [editingComment, setEditingComment] = useState(false);
  const [isFirstCommentSent, setIsFirstCommentSent] = useState(false);

  const { user } = useContext(UserContext);

  const { loading: userCommentLoading, data: userCommentData } = useQuery(
    GET_USER_COMMENT_POI_QUERY,
    {
      variables: { userId, poiId },
    }
  );

  useEffect(() => {
    if (userCommentData?.getUserCommentForPOI) {
      setCurrentComment(userCommentData.getUserCommentForPOI.text);
      setIsFirstCommentSent(true);
    }
  }, [userCommentData]);

  const [deleteComment] = useMutation(DELETE_COMMENT, {
    refetchQueries: [
      { query: GET_POI_QUERY },
      'getAllPoi',
      { query: GET_COMMENTS_NUMBER_PER_POI, variables: { poiId } },
      'getNumberOfCommentsPerPOI',
    ],
  });

  const [commentPOI] = useMutation(COMMENT_POI_MUTATION, {
    variables: {
      poiId,
      userId,
    },
    update(cache, { data: { commentPOI } }) {
      const { getUserCommentForPOI } = cache.readQuery({
        query: GET_USER_COMMENT_POI_QUERY,
        variables: { userId, poiId },
      }) as { getUserCommentForPOI: { comment: string } };
      cache.writeQuery({
        query: GET_USER_COMMENT_POI_QUERY,
        variables: { userId, poiId },
        data: {
          getUserCommentForPOI: { ...getUserCommentForPOI, ...commentPOI },
        },
      });
      setCurrentComment(commentPOI.comment);
    },
  });

  const [updatePOIComment] = useMutation(COMMENT_POI_MUTATION, {
    variables: {
      poiId,
      userId,
    },
    update(cache, { data: { updatePOIComment } }) {
      const { getUserCommentForPOI } = cache.readQuery({
        query: GET_USER_COMMENT_POI_QUERY,
        variables: { userId, poiId },
      }) as { getUserCommentForPOI: { comment: string } };
      cache.writeQuery({
        query: GET_USER_COMMENT_POI_QUERY,
        variables: { userId, poiId },
        data: {
          getUserCommentForPOI: {
            ...getUserCommentForPOI,
            ...updatePOIComment,
          },
        },
      });
      setCurrentComment(updatePOIComment.comment);
    },
  });

  const handleCommentDelete = async () => {
    try {
      await deleteComment({
        variables: {
          commentId: commentId,
          userId,
        },
      });
      handleDeleteDialogClose();
    } catch (error: any) {
      console.log(error);
      alert(`Erreur lors de la suppression du commentaire: ${error.message}`);
    }
  };

  const handleCommentSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    const variables = {
      comment: currentComment,
      userId,
      poiId,
    };
    try {
      if (currentComment) {
        await updatePOIComment({ variables });
      } else {
        const result = await commentPOI({ variables });
        setCurrentComment(result.data.commentPOI.comment);
      }
    } catch (error) {
      console.log(error);
    }

    if (userCommentLoading) {
      return <div>Loading user comment...</div>;
    }
    setCurrentComment(undefined);
    setEditingComment(false);
    setIsFirstCommentSent(true);
  };

  // ============================ HANDLE COMMENT CHANGE ============================
  const handleCommentChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setCurrentComment(event.target.value);
  };

  // ============================ HANDLE EDIT CLICK ============================
  const handleEditClick = () => {
    setEditingComment(true);
    setIsFirstCommentSent(false);
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
      {type === 'delete' && (
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
            <DialogContentText>
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
      )}
    </div>
  );
};

export default POIComment;
