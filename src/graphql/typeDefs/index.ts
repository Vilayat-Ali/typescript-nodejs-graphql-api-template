import user from "./user";
import account from "./account";
import { gql } from "apollo-server-express";

const baseSchema = gql`

    type Query {
        _: String!
    }

    type Mutation {
        _: String!
    }

`;

export default [
    user,
    account,
    baseSchema
]