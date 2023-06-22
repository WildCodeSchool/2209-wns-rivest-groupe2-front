import { useMutation, useQuery } from '@apollo/client';
import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from 'src/contexts/userContext';
import { COMMENT_POI_MUTATION } from 'src/services/mutations/commentMutations';
import { GET_USER_COMMENT_POI_QUERY } from 'src/services/queries/commentQueries';
import { HiPencilSquare } from 'react-icons/hi2';
import StarRating from './StarRating';
import { POIComment } from 'src/types/POIType';
import { Typography } from '@material-tailwind/react';
import moment from 'moment';

interface POICommentsProps {
  className?: string;
  comments: POIComment[] | [];
  poiId: number;
}

const POIComments: React.FC<POICommentsProps> = ({
  className = '',
  comments,
  poiId,
}) => {
  console.log(comments);
  return (
    <div>
      <div className={className ? className : 'mt-4 w-[80%] mx-auto'}>
        <Typography variant="h4">Commentaires</Typography>
        {comments.length === 0 ? (
          <p>Pas de commentaires renseignés pour le moment</p>
        ) : (
          comments.map((comment) => (
            <div key={comment.id}>
              <div className="flex justify-between items-center text-gray-500">
                <StarRating
                  className="flex items-center justify-left"
                  poiId={poiId}
                  userId={comment.user.id}
                />
                <Typography>
                  {moment(comment.createDate).format('DD-MM-YYYY')}
                </Typography>
              </div>
              <Typography className="font-bold">{comment.text}</Typography>
              <Typography className="font-medium text-gray-500">
                {comment.user?.username || comment.user.email}
              </Typography>
              <div
                style={{
                  height: 2,
                  width: '80%',
                  margin: '20px auto',
                  backgroundColor: 'rgb(198, 198, 198)',
                }}
              />
            </div>
          ))
        )}

        {/*  */}
      </div>
    </div>
  );
};

export default POIComments;
