import { gql } from '@apollo/client';

export const COMMENT_POI_MUTATION = gql`
  mutation CommentPOI(
    $comment: String!
    $rate: Float!
    $userId: Float!
    $poiId: Float!
  ) {
    commentPOI(comment: $comment, rate: $rate, userId: $userId, poiId: $poiId) {
      id
      createDate
      text
      rate
    }
  }
`;

export const UPDATE_COMMENT_POI_MUTATION = gql`
  mutation UpdateCommentPOI(
    $commentId: Float!
    $comment: String!
    $rate: Float!
    $userId: Float!
    $poiId: Float!
  ) {
    updateCommentPOI(
      commentId: $commentId
      comment: $comment
      rate: $rate
      userId: $userId
      poiId: $poiId
    ) {
      id
      createDate
      text
      rate
    }
  }
`;
