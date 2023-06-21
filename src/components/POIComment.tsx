import { useMutation, useQuery } from '@apollo/client';
import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from 'src/contexts/userContext';
import { COMMENT_POI_MUTATION } from 'src/services/mutations/commentMutations';
import { GET_USER_COMMENT_POI_QUERY } from 'src/services/queries/commentQueries';
import { HiPencilSquare } from 'react-icons/hi2';
import StarRating from './StarRating';

interface POIDetailsProps {
  className?: string;
  poiId: number;
  userId: number;
}

const POIComment: React.FC<POIDetailsProps> = ({
  className = '',
  poiId,
  userId,
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
      <div className={className ? className : 'mt-4'}>
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
              Soumetre
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default POIComment;
