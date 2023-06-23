import React, { useContext, useState } from 'react';
import StarRating from './StarRating';
import { POICommentType } from 'src/types/POIType';
import { Typography } from '@material-tailwind/react';
import moment from 'moment';
import { AverageRatingStar } from './AverageRatingStar';
import { UserContext } from 'src/contexts/userContext';
import { map } from 'lodash';
import { FiEdit } from 'react-icons/fi';
import { AiOutlineDelete } from 'react-icons/ai';
import POIComment from './POIComment';

interface POICommentsProps {
  className?: string;
  comments: POICommentType[] | [];
  poiId: number;
  averageRate: number;
  commentsCount: number;
  type: string;
}

const POIComments: React.FC<POICommentsProps> = ({
  className = '',
  comments,
  poiId,
  averageRate,
  commentsCount,
  type,
}) => {
  const { user } = useContext(UserContext);

  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

  const handleDeleteDialogClose = () => {
    setOpenDeleteDialog(false);
  };

  const handleDeleteDialogOpen = () => {
    setOpenDeleteDialog(true);
  };

  const userComment = comments.find((comment) => comment?.user.id === user?.id);
  const otherComments = comments.filter(
    (comment) => comment?.user.id !== user?.id
  );
  console.log(comments);
  return (
    <div className={className ? className : 'my-4 w-[80%] mx-auto pt-8'}>
      <Typography variant="h2">Commentaires</Typography>
      {comments.length === 0 ? (
        <Typography className="mt-4 mb-6">
          Pas de commentaires renseignés pour le moment
        </Typography>
      ) : (
        <div className="pt-4">
          <div className="flex justify-between items-center w-[80%] mx-auto">
            <div className="flex flex-col my-6 justify-center items-center">
              <Typography variant="h3" className="font-bold pb-3">
                Note moyenne
              </Typography>
              <AverageRatingStar
                averageRate={averageRate}
                className="flex justify-start pr-1 pb-3"
                starSize="text-5xl"
                textColor="black"
              />
              <Typography className="font-semibold">
                basé sur {commentsCount}{' '}
                {commentsCount > 1 ? 'commentaires' : 'commentaire'}
              </Typography>
            </div>
            {user && user.id && (
              <div className="flex flex-col justify-center text-center">
                <Typography variant="h4" className="pb-2">
                  Evaluer ce {type}
                </Typography>
                <Typography className="pb-4">
                  Partagez votre avis avec les autres utilisateurs
                </Typography>
                <button type="button" className="p-2 border-2 rounded-xl">
                  Ajouter un commentaire
                </button>
              </div>
            )}
          </div>

          {user && userComment && (
            <div>
              <div className="flex justify-between items-center text-gray-500">
                <StarRating
                  className="flex items-center justify-left"
                  userRate={userComment.rate}
                />
                <div className="flex w-20 p-3 justify-between border-2 rounded-full">
                  <FiEdit
                    style={{ width: 20, height: 20, cursor: 'pointer' }}
                  />
                  <AiOutlineDelete
                    onClick={handleDeleteDialogOpen}
                    style={{ width: 20, height: 20, cursor: 'pointer' }}
                  />
                  <POIComment
                    openDeleteDialog={openDeleteDialog}
                    handleDeleteDialogClose={handleDeleteDialogClose}
                    type="delete"
                    poiId={poiId}
                    userId={user.id}
                    commentId={userComment.id}
                  />
                </div>
              </div>
              <Typography className="font-bold pt-2">
                {userComment.text}
              </Typography>
              <Typography className="font-medium pt-4">
                {userComment.user?.username || userComment.user.email}
              </Typography>
              <Typography className="text-gray-500">
                Le {moment(userComment.createDate).format('DD-MM-YYYY')}
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
          )}
          {otherComments &&
            map(otherComments, (comment) => (
              <div key={comment.id}>
                <div className="flex justify-between items-center text-gray-500">
                  <StarRating
                    className="flex items-center justify-left"
                    userRate={comment.rate}
                  />
                </div>
                <Typography className="font-bold pt-2">
                  {comment.text}
                </Typography>
                <Typography className="font-medium pt-4">
                  {comment.user?.username || comment.user.email}
                </Typography>
                <Typography className="text-gray-500">
                  Le {moment(comment.createDate).format('DD-MM-YYYY')}
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
            ))}
        </div>
      )}
    </div>
  );
};

export default POIComments;
