import { gql } from 'apollo-server-express';

export default gql`

    type memberType{
        name: String!,
        email: String!
    }

    type savedMemberType{
        id: String!,
        name: String!,
        email: String!,
    }

    type Query{
        getAllMembers: [memberType!]!
    }

    type Mutation {
        registerMember(name: String, email: String, password: String): savedMemberType!
    }

`;