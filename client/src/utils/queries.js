import { gql } from '@apollo/client'

export const QUERY_ME = gql `
query Me {
    me {
      savedBooks {
        Link
        _id
        authors
        bookId
        description
        image
        title
      }
    }
  }


`