import { Pool } from 'pg';
import config from '../config';

const pool = new Pool({
    host: config.host,
    port: parseInt(config.dbPort as string, 10),
    database: config.database,
    user: config.user,
    password: config.password,
});

pool.on('error', (error: Error) => {
    console.error(error.message);
});

export default pool;
