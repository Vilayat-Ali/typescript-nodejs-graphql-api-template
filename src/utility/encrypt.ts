import bcrypt from "bcryptjs";

export function encrypt(dataString: string){
    const salt = bcrypt.genSaltSync(Number(process.env.ENCR_ROUND!));
    return bcrypt.hashSync(dataString, salt);
}

export function verifyHash(dataString: string, hashString: string){
    const comparasionResult = bcrypt.compareSync(dataString, hashString);
    if(comparasionResult) return true;
    else return false;
}
