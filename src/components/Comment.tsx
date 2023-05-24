import { useMutation, useQuery } from '@apollo/client';
import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from 'src/contexts/userContext';
import { COMMENT_POI_MUTATION } from 'src/services/mutations/commentMutations';
import { GET_USER_COMMENT_POI_QUERY } from 'src/services/queries/commentQueries';
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
  const [newComment, setNewComment] = useState<string | undefined>('');

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
    }
  }, [userCommentData]);

  const [commentPOI] = useMutation(COMMENT_POI_MUTATION, {
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

  const handleCommentSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    const variables = {
      comment: newComment,
      userId,
      poiId,
    };
    try {
      if (!currentComment) {
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
  };

  const handleCommentChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setNewComment(event.target.value);
  };

  return (
    <div>
      <div className={className ? className : 'mt-4'}>
        <h2 className="text-lg font-bold">Comments</h2>
        {currentComment ? (
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
          </div>
        ) : (
          <form onSubmit={handleCommentSubmit} className="mt-4">
            <label htmlFor="newComment" className="block font-medium">
              Add a comment
            </label>
            <textarea
              id="newComment"
              name="newComment"
              className="border-2 border-gray-200 p-2 w-full mt-2"
              value={newComment}
              onChange={handleCommentChange}
            />
            <button type="submit" className="bg-blue-500 text-white p-2 mt-2">
              Submit
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default POIComment;
