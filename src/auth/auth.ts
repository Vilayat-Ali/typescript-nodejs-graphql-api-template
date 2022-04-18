import {sign, verify} from "jsonwebtoken";

// generating access token
export function generateAccessToken(name: string, email:string): string{
    const accesstoken = sign({name, email}, process.env.ACCESS_TOKEN_SECRET!, {expiresIn: '7200s'});
    return accesstoken;
}

// generating refresh token
export function generateRefreshToken(name: string, email: string): string{
    const refreshtoken: string = sign({name, email}, process.env.REFRESH_TOKEN_SECRET!);
    return refreshtoken;
}
