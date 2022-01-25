import base from "./user";
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
    base,
    baseSchema
]