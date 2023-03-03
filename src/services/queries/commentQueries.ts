
import { gql } from "@apollo/client";

export const GET_USER_COMMENT_POI_QUERY = gql`
query Query($userId: Float!, $poiId: Float!) {
    getUserCommentForPOI(userId: $userId, poiId: $poiId) {
      id
      createDate
      updateDate
      text
    }
  }
  `