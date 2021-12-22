import { gql } from '@apollo/client';

//wrap entire query in a tagged template literal using the imported gql function
export const QUERY_THOUGHTS = gql`
query thoughts($username: String) {
    thoughts(username: $username) {
      _id
      thoughtText
      createdAt
      username
      reactionCount
      reactions {
        _id
        createdAt
        username
        reactionBody
      }
    }
  }
`;