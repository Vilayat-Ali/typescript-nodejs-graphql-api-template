import consola from 'consola';
import pool from "./connection";

const initiate = async() => {

    await pool.query(`
    
    CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

    CREATE TABLE IF NOT EXISTS member (
        id              uuid DEFAULT uuid_generate_v4 (),
        f_name          VARCHAR(25) NOT NULL,
        l_name          VARCHAR(25) NOT NULL,
        email           VARCHAR(50) NOT NULL UNIQUE,
        password        VARCHAR(20) NOT NULL
    );
    
    `);

}

// running migrations
initiate() 
    .then(() => {
        consola.info({
            message: "Migrations applied to the database...",
            badge: true
        })
    })
    .catch(err => {
        console.log(err.message);
        consola.fatal({
            message: err.message,
            badge: true
        })
    })