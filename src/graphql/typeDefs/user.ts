import { gql } from 'apollo-server-express';

export default gql`

    type newMemberResponseType{
        name: String!,
        email: String!,
        access_token: String!
    }

    type memberType{
        name: String!,
        email: String!
    }

    type savedMemberType{
        id: ID!,
        name: String!,
        email: String!,
    }

    type Query{
        getAllMembers: [memberType!]!,
        getMember(id: ID, name: String, email: String): memberType!
    }

    type Mutation {
        registerMember(name: String, email: String, password: String): newMemberResponseType!
    }

`;