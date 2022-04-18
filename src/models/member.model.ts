import {model, Schema} from "mongoose";

interface memberSchemaType{
    name: string,
    email: string,
    password: string
}

const memberSchema = new Schema<memberSchemaType>({
    name: { type: String, required: true},
    email: { type: String, required: true, unique: true},
    password: { type: String, required: true},
});

const memberModel = model<memberSchemaType>('member', memberSchema);

export default memberModel;