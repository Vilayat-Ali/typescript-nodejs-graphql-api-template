import { gql } from 'apollo-server-express';

export default gql`

    type user {
        id: String,
        first_name: String,
        last_name: String,
        email: String,
        password: String
    }

    type confirmationMessage {
        message: String!
    }

    extend type Query {
        findUser(id: String!): user
    }

    extend type Mutation {
        saveUser(first_name: String!, last_name: String!, email: String!, password: String!):confirmationMessage!
    }

`;