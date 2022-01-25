import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config(); // environment variables

// Making a connection Pool 
const pool = new Pool({
    user: process.env.db_user!,
    host: process.env.db_host!,
    database: process.env.db_dbname!,
    password: process.env.db_password!,
    port: Number(process.env.db_port!),
    max: 50,            // max number of clients in the pool
    idleTimeoutMillis: 30000 
});

export default pool;