import { gql } from "@apollo/client";

export const COMMENT_POI_MUTATION = gql`
mutation CommentPOI($comment: String!, $userId: Float!, $poiId: Float!) {
    commentPOI(comment: $comment, userId: $userId, poiId: $poiId) {
      id
      createDate
      text
    }
  }
  `
export const UPDATE_COMMENT_POI_MUTATION = gql`
mutation UpdatePOIComment($comment: String!, $userId: Float!, $poiId: Float!) {
    updatePOIComment(comment: $comment, userId: $userId, poiId: $poiId) {
      id
      createDate
      text
    }
  }
  `