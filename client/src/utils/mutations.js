//import the gql 
import { gql } from '@apollo/client';

//create a GraphQL mutation called login that accepts 2 variables 
export const LOGIN_USER = gql`
mutation login($email: String!, $password: String!){
    login(email: $email, password: $password){
        token
        user {
            _id
            username
        }
    }
}
`;

//create a mutation for creating new users through the form page
export const ADD_USER = gql `
mutation addUser($username: String!, $email: String!, $password:String!){
    addUser(username: $username, email: $email, password: $password) {
        token
        user{
            _id
            username
        }
    }
}
`;