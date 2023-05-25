import { gql } from '@apollo/client';

export const CREATE_POI_MUTATION = gql`
  mutation CreatePoi($data: CreatePoiInput!) {
    createPoi(data: $data) {
      name
      address
      postal
      type
      coordinates
      creationDate
      pictureUrl
      websiteURL
      description
      priceRange
      city
      daysOpen
      hoursOpen
      hoursClose
    }
  }
`;

export const UPDATE_POI_IMG = gql`
  mutation UpdatePoi($slug: String!, $coverUrl: String) {
    updateBlog(blogSlug: $slug, coverUrl: $coverUrl) {
      coverUrl
    }
  }
`;
