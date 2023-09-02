import React, { useContext, useEffect, useState } from 'react';
import { POICommentType } from 'src/types/POIType';
import { Typography } from '@material-tailwind/react';
import { AverageRatingStar } from './AverageRatingStar';
import { UserContext } from 'src/contexts/userContext';
import { sortBy } from 'lodash';
import POICommentModal from './POICommentModal';
import POIComment from './POIComment';
import { getCurrentDimension } from 'src/components/Navbar';

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
  const [screenSize, setScreenSize] = useState(getCurrentDimension());

  const userComment = comments.filter(
    (comment) => comment?.user.id === user?.id
  );
  const otherComments = comments.filter(
    (comment) => comment?.user.id !== user?.id
  );

  useEffect(() => {
    const updateDimension = () => {
      setScreenSize(getCurrentDimension());
    };
    window.addEventListener('resize', updateDimension);
    return () => {
      window.removeEventListener('resize', updateDimension);
    };
  }, [screenSize]);

  return (
    <div
      className={className ? className : 'my-4 w-[95%] md:w-[80%] mx-auto pt-8'}
    >
      <Typography variant="h2" className="text-xl md:text-4xl">
        Commentaires
      </Typography>
      {comments.length === 0 ? (
        <div
          className={
            user && user.id
              ? 'flex flex-col md:flex-row justify-between items-center'
              : ''
          }
        >
          <Typography className="mt-4 mb-6 justify-self-start">
            Pas de commentaires renseignés pour le moment
          </Typography>
          {user && user.id && (
            <>
              {screenSize.width >= 700 && (
                <div
                  style={{
                    width: 2,
                    height: 150,
                    backgroundColor: 'rgb(198, 198, 198)',
                  }}
                />
              )}

              <div className="flex flex-col justify-center md:text-center">
                <Typography variant="h4" className="pb-2 text-lg md:text-2xl">
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
          <div className="flex flex-col md:flex-row justify-between items-center w-[80%] mx-auto">
            <div className="flex flex-col my-6 justify-center items-center">
              <Typography
                variant="h3"
                className="font-bold pb-3 text-xl md:text-3xl"
              >
                Note moyenne
              </Typography>
              <AverageRatingStar
                averageRate={averageRate}
                className="flex justify-start pr-1 pb-3"
                starSize="text-3xl md:text-5xl"
                textColor="black"
              />
              <Typography className="font-semibold">
                basé sur {commentsCount}{' '}
                {commentsCount > 1 ? 'commentaires' : 'commentaire'}
              </Typography>
            </div>
            {user && user.id && (
              <>
                {screenSize.width >= 700 && (
                  <div
                    style={{
                      width: 2,
                      height: 150,
                      backgroundColor: 'rgb(198, 198, 198)',
                    }}
                  />
                )}
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
                <div key={comment.id} className="my-2">
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
              <div key={comment.id} className="my-2">
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
