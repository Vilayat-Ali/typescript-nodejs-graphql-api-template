// For postgreSQL support
import pool from "./../../database/connection";

// importing db models
import memberModel from "../../models/member.model";

// importing utility functions 
import {generateAccessToken} from "../../auth/auth";
import {encrypt} from "../../utility/encrypt";

export default {

    Query: {
        getAllMembers: async(parent: any, args: any, context: any, info: any) => {
            if(!context.user) return null;
            if(context.user){
                const members = await memberModel.find({});
                return members;
            }
        },
        getMember: async(parent: any, args: any, context: any, info: any) => {
            if(!context.user) return null; 
            if(context.user){
                if(args.id && !args.name && !args.email){
                    const member = await memberModel.findOne({_id: args.id});  
                    return member;
                }
                else if(!args.id && args.name && !args.email){
                    const member = await memberModel.findOne({name: args.name});  
                    return member;
                }
                else if(!args.id && !args.name && args.email){
                    const member = await memberModel.findOne({email: args.email});  
                    return member;
                }
            }
        }
    },
    Mutation: {
        registerMember: async(parent: any, args: any, context: any, info: any) => {
            const {name, email, password} = args;
            const encryptedPassword = encrypt(password);
            const accessToken:string = generateAccessToken(name, email);
            const newMember = new memberModel({name, email, password: encryptedPassword});
            newMember.save();
            const createdUser = {id: newMember._id, name, email, access_token: accessToken};
            return createdUser;
        }
    }

}