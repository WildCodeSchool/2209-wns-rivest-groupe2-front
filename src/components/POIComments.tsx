import React, { useContext, useState } from 'react';
import { POICommentType } from 'src/types/POIType';
import { Typography } from '@material-tailwind/react';
import { AverageRatingStar } from './AverageRatingStar';
import { UserContext } from 'src/contexts/userContext';
import { sortBy } from 'lodash';
import POICommentModal from './POICommentModal';
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

  const [openCreateDialog, setOpenCreateDialog] = useState(false);

  const userComment = comments.filter(
    (comment) => comment?.user.id === user?.id
  );
  const otherComments = comments.filter(
    (comment) => comment?.user.id !== user?.id
  );

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
                  <POICommentModal
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
                    <POICommentModal
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
            sortBy(userComment, (comment) => comment.createDate)
              .reverse()
              .map((comment) => (
                <div key={comment.id}>
                  <POIComment
                    comment={comment}
                    isUserComment={true}
                    poiId={poiId}
                    userId={user.id}
                  />
                </div>
              ))}
          {otherComments &&
            otherComments.map((comment) => (
              <div key={comment.id}>
                <POIComment
                  comment={comment}
                  isUserComment={false}
                  poiId={poiId}
                />
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default POIComments;
