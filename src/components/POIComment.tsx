import React, { useState } from 'react';
import StarRating from './StarRating';
import { POICommentType } from 'src/types/POIType';
import { Typography } from '@material-tailwind/react';
import moment from 'moment';
import { FiEdit } from 'react-icons/fi';
import { AiOutlineDelete } from 'react-icons/ai';
import POICommentModal from './POICommentModal';

interface POICommentProps {
  comment: POICommentType;
  isUserComment: boolean;
  poiId?: number;
  userId?: number;
}

const POIComment: React.FC<POICommentProps> = (props: POICommentProps) => {
  const { comment, poiId, userId } = props;
  const [openUpdateDialog, setOpenUpdateDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

  return userId && poiId ? (
    <>
      <div className="flex justify-between items-center text-gray-500">
        <StarRating
          className="flex items-center justify-left"
          userRate={comment.rate}
        />
        <div className="flex w-20 p-3 justify-between border-2 rounded-full">
          <button type="button" onClick={() => setOpenUpdateDialog(true)}>
            <FiEdit style={{ width: 20, height: 20, cursor: 'pointer' }} />
          </button>
          <POICommentModal
            key={comment.id}
            openUpdateDialog={openUpdateDialog}
            handleUpdateDialogClose={() => setOpenUpdateDialog(false)}
            type="update"
            poiId={poiId}
            userId={userId}
            userRate={comment.rate}
            userComment={comment.text}
            commentId={comment.id}
          />
          <AiOutlineDelete
            onClick={() => setOpenDeleteDialog(true)}
            style={{ width: 20, height: 20, cursor: 'pointer' }}
          />
          <POICommentModal
            key={comment.id}
            openDeleteDialog={openDeleteDialog}
            handleDeleteDialogClose={() => setOpenDeleteDialog(false)}
            type="delete"
            poiId={poiId}
            userId={userId}
            commentId={comment.id}
          />
        </div>
      </div>
      <Typography className="font-bold pt-2">{comment.text}</Typography>
      <Typography className="font-medium pt-4">
        {comment.user?.username || comment.user.email}
      </Typography>
      <Typography className="text-gray-500">
        Créé le {moment(comment.createDate).format('DD-MM-YYYY à HH:MM')}
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
    </>
  ) : (
    <div key={comment.id}>
      <div className="flex justify-between items-center text-gray-500">
        <StarRating
          className="flex items-center justify-left"
          userRate={comment.rate}
        />
      </div>
      <Typography className="font-bold pt-2">{comment.text}</Typography>
      <Typography className="font-medium pt-4">
        {comment.user?.username || comment.user.email}
      </Typography>
      <Typography className="text-gray-500">
        Créé le {moment(comment.createDate).format('DD-MM-YYYY à HH:MM')}
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
  );
};

export default POIComment;
