import pool from "./../../database/connection";

export default {

    Query: {
        findUser: () => "Hello World!"
    },
    Mutation: {
        saveUser: async(_: any, { first_name, last_name, email, password }:any, {req, res}:any) => {
            try{
                const result = await pool.query(`
                
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
                                ) RETURNING *;
                                
                                `);
                return {
                    user: {
                        id: result.rows[0].id,
                        first_name: result.rows[0].f_name,
                        last_name: result.rows[0].l_name,
                        email: result.rows[0].email,
                        password: result.rows[0].password
                    },
                    message: "User added successfully"
                }

            }catch(e:any){

                return { message: e.message }

            }
        }
    }

}