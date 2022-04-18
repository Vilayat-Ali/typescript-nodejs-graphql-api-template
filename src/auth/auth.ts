import { AuthenticationError } from "apollo-server-core";
import {sign, verify} from "jsonwebtoken";

export function generateAccessToken(name: string, email:string){
    try{
    const hashString = sign({name, email}, process.env.SECRET!);
    return hashString;
    }catch(error){
        if(error) return "";
    }
}

export function Verify(request: any){
    try{
        const Headers = request.req.headers['authorization'];
        const token = Headers && Headers.split(" ")[1];
    
        if(token === null) throw new AuthenticationError('Login required...');
        else{
            const userID = verify(token, process.env.SECRET!);
            if(userID) return { isAuth: true, user: userID}
            else throw new AuthenticationError('Could\'nt find user account');
        }
    }catch(error:any){
        return {isAuth: false, message: `Error: ${error.message}`}
    }
}
