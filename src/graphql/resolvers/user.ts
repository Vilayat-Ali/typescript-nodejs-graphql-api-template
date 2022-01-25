import pool from "./../../database/connection";

export default {

    Query: {
        findUser: () => "Hello World!"
    },
    Mutation: {
        saveUser: async(_: any, { first_name, last_name, email, password }:any, {req, res}:any) => {
            try{
                await pool.query(`
                
                INSERT INTO member (
                    f_name,
                    l_name,
                    email,
                    password
                ) VALUES (
                    '${first_name}',
                    '${last_name}',
                    '${email}',
                    '${password}'
                );
                
                `);

                return {
                    message: "User added successfully"
                }

            }catch(e:any){

                return { message: e.message }

            }
        }
    }

}