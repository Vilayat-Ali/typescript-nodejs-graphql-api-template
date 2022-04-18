// For postgreSQL support
import pool from "./../../database/connection";

// importing db models
import memberModel from "../../models/member.model";

export default {

    Query: {
        getAllMembers: async() => {
            const members = await memberModel.find({});
            return members;
        }
    },
    Mutation: {
        registerMember: async(parent: any, args: any, context: any, info: any) => {
            const {name, email, password} = args;
            const newMember = new memberModel({name, email, password});
            newMember.save();
            const createdUser = {id: newMember._id, name, email};
            return createdUser;
        }
    }

}