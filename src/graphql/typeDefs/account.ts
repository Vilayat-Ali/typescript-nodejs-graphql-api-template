import {gql} from "apollo-server-express";

export default gql`

    type loginResponse{
        refresh_token: String
    }

    type tokenResponse{
        access_token: String
    }

    type Query {
        login(email: String, password: String): loginResponse!,
        token(refresh_token: String): tokenResponse!
    }

`;