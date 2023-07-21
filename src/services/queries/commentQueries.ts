import { gql } from '@apollo/client';

export const GET_USER_COMMENT_POI_QUERY = gql`
  query Query($userId: Float!, $poiId: Float!) {
    getUserCommentForPOI(userId: $userId, poiId: $poiId) {
      id
      createDate
      updateDate
      text
    }
  }
`;

export const GET_COMMENTS_NUMBER_PER_POI = gql`
  query Query($poiId: Float!) {
    getNumberOfCommentsPerPOI(poiId: $poiId)
  }
`;

export const DELETE_COMMENT = gql`
  mutation Mutation($commentId: Float!, $userId: Float!) {
    deleteCommentPOI(commentId: $commentId, userId: $userId)
  }
`;
