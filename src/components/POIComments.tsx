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
  const [openCreateDialog, setOpenCreateDialog] = useState(false);
  const [openUpdateDialog, setOpenUpdateDialog] = useState(false);

  const userComment = comments.filter(
    (comment) => comment?.user.id === user?.id
  );
  const otherComments = comments.filter(
    (comment) => comment?.user.id !== user?.id
  );

  console.log(userComment);

  return (
    <div className={className ? className : 'my-4 w-[80%] mx-auto pt-8'}>
      <Typography variant="h2">Commentaires</Typography>
      {comments.length === 0 ? (
        <div
          className={user && user.id ? 'flex justify-between items-center' : ''}
        >
          <Typography className="mt-4 mb-6 justify-self-start">
            Pas de commentaires renseignés pour le moment
          </Typography>
          {user && user.id && (
            <>
              <div
                style={{
                  width: 2,
                  height: 150,
                  /* margin: '20px auto', */
                  backgroundColor: 'rgb(198, 198, 198)',
                }}
              />
              <div className="flex flex-col justify-center text-center">
                <Typography variant="h4" className="pb-2">
                  Evaluer ce {type}
                </Typography>
                <Typography className="pb-4">
                  Partagez votre avis avec les autres utilisateurs
                </Typography>
                <button
                  type="button"
                  onClick={() => setOpenCreateDialog(true)}
                  className="p-2 border-2 rounded-xl"
                >
                  Ajouter un commentaire
                </button>
                {openCreateDialog && (
                  <POIComment
                    openCreateDialog={openCreateDialog}
                    handleCreateDialogClose={() => setOpenCreateDialog(false)}
                    type="create"
                    poiId={poiId}
                    userId={user.id}
                  />
                )}
              </div>
            </>
          )}
        </div>
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
              <>
                <div
                  style={{
                    width: 2,
                    height: 150,
                    backgroundColor: 'rgb(198, 198, 198)',
                  }}
                />
                <div className="flex flex-col justify-center text-center">
                  <Typography variant="h4" className="pb-2">
                    Evaluer ce {type}
                  </Typography>
                  <Typography className="pb-4">
                    Partagez votre avis avec les autres utilisateurs
                  </Typography>
                  <button
                    type="button"
                    onClick={() => {
                      setOpenCreateDialog(true);
                    }}
                    className="p-2 border-2 rounded-xl"
                  >
                    Ajouter un commentaire
                  </button>
                  {openCreateDialog && (
                    <POIComment
                      openCreateDialog={openCreateDialog}
                      handleCreateDialogClose={() => {
                        setOpenCreateDialog(false);
                      }}
                      type="create"
                      poiId={poiId}
                      userId={user.id}
                    />
                  )}
                </div>
              </>
            )}
          </div>

          {user &&
            userComment.length > 0 &&
            userComment.map((comment, index) => (
              <div key={index}>
                <div className="flex justify-between items-center text-gray-500">
                  <StarRating
                    className="flex items-center justify-left"
                    userRate={comment.rate}
                  />
                  <div className="flex w-20 p-3 justify-between border-2 rounded-full">
                    <FiEdit
                      style={{ width: 20, height: 20, cursor: 'pointer' }}
                      onClick={() => setOpenUpdateDialog(true)}
                    />
                    {openUpdateDialog && (
                      <POIComment
                        key={comment.id}
                        openUpdateDialog={openUpdateDialog}
                        handleUpdateDialogClose={() =>
                          setOpenUpdateDialog(false)
                        }
                        type="update"
                        poiId={poiId}
                        userId={user.id}
                        userRate={comment.rate}
                        userComment={comment.text}
                        commentId={comment.id}
                      />
                    )}
                    <AiOutlineDelete
                      onClick={() => setOpenDeleteDialog(true)}
                      style={{ width: 20, height: 20, cursor: 'pointer' }}
                    />
                    {openDeleteDialog && (
                      <POIComment
                        key={comment.id}
                        openDeleteDialog={openDeleteDialog}
                        handleDeleteDialogClose={() =>
                          setOpenDeleteDialog(false)
                        }
                        type="delete"
                        poiId={poiId}
                        userId={user.id}
                        commentId={comment.id}
                      />
                    )}
                  </div>
                </div>
                <Typography className="font-bold pt-2">
                  {comment.text}
                </Typography>
                <Typography className="font-medium pt-4">
                  {comment.user?.username || comment.user.email}
                </Typography>
                <Typography className="text-gray-500">
                  Créé le{' '}
                  {moment(comment.createDate).format('DD-MM-YYYY à HH:MM')}
                  {comment.updateDate
                    ? ', Modifié le ' +
                      moment(comment.updateDate).format('DD-MM-YYYY à HH:MM')
                    : null}
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
          {otherComments &&
            otherComments.map((comment) => (
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
                  Créé le{' '}
                  {moment(comment.createDate).format('DD-MM-YYYY à HH:MM')}
                  {comment.updateDate
                    ? ', Modifié le ' +
                      moment(comment.updateDate).format('DD-MM-YYYY à HH:MM')
                    : null}
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
