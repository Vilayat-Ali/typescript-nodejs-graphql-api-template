// For postgreSQL support
import pool from "./../../database/connection";

// importing db models
import memberModel from "../../models/member.model";
import { ApolloError } from "apollo-server-express";

// importing utilities
import {verifyHash} from "../../utility/encrypt";
import {generateRefreshToken} from "../../auth/auth";

export default {
    Query: {
        login: async(parent: any, args: any, context: any, info: any) => {
            const searchMember = await memberModel.findOne({email: args.email}, {_id: 0});
            if(searchMember && verifyHash(args.password, searchMember.password)){
                const refresh_token = generateRefreshToken(searchMember.name, searchMember.email);
                return {refresh_token};
            }
            if(!searchMember){
                throw new ApolloError(`${args.email} is not a registered email`);
            }
        }
    }
}