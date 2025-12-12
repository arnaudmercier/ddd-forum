import express, {Request, Response} from "express";
import {Pool} from 'pg';
import router from "./user-http";

const app = express();
app.use(express.json());
app.use(router);

export let pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'users',
    password: 'demo',
    port: 5432,
});

pool.query(`
            CREATE TABLE IF NOT EXISTS users (
                id SERIAL PRIMARY KEY,
                email VARCHAR(255) UNIQUE NOT NULL,
                username VARCHAR(255) UNIQUE NOT NULL,
                first_name VARCHAR(100) NOT NULL,
                last_name VARCHAR(100) NOT NULL,
                password VARCHAR(100) NOT NULL
                )
        `);

app.listen(3000, () => {
    console.log(`App listening on port 3000`);
});
