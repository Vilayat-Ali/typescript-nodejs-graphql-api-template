import {model, Schema} from "mongoose";

interface userSchemaType{
    name: string,
    email: string,
    password: string
}

const userSchema = new Schema<userSchemaType>({
    name: { type: String, required: true},
    email: { type: String, required: true, unique: true},
    password: { type: String, required: true},
});

const userModel = model<userSchemaType>('user', userSchema);

export default userModel;