import express, {Request, Response} from "express";
import {Pool} from 'pg';
import router from "./user-http";
import {Config} from "./config";

require('dotenv').config()
import cors from 'cors';

const app = express();
app.use(express.json());
app.use(cors())
app.use(router);

let config: Config;
export let pool: Pool;

async function initConfig(): Promise<void> {
    try {
        const port = process.env.PORT;
        const dbUser = process.env.DB_USER;
        const dbHost = process.env.DB_HOST;
        const dbName = process.env.DB_NAME;
        const dbPassword = process.env.DB_PASSWORD;
        const dbPort = process.env.DB_PORT;

        if (!port) throw new Error('PORT environment variable is required');
        if (!dbUser) throw new Error('DB_USER environment variable is required');
        if (!dbHost) throw new Error('DB_HOST environment variable is required');
        if (!dbName) throw new Error('DB_NAME environment variable is required');
        if (!dbPassword) throw new Error('DB_PASSWORD environment variable is required');
        if (!dbPort) throw new Error('DB_PORT environment variable is required');

        config = {
            port: parseInt(port),
            db: {
                user: dbUser,
                host: dbHost,
                database: dbName,
                password: dbPassword,
                port: parseInt(dbPort),
            },
        };
        console.log('Config is initialized successfully');
    } catch (error) {
        console.error('Error initializing config:', error);
        throw error;
    }
}

async function initializeDatabase(): Promise<void> {
    try {
        pool = new Pool({
            user: config.db.user,
            host: config.db.host,
            database: config.db.database,
            password: config.db.password,
            port: config.db.port,
        });

        await pool.query(`
            CREATE TABLE IF NOT EXISTS users (
                 id SERIAL PRIMARY KEY,
                 email VARCHAR(255) UNIQUE NOT NULL,
                 username VARCHAR(255) UNIQUE NOT NULL,
                 first_name VARCHAR(100) NOT NULL,
                 last_name VARCHAR(100) NOT NULL,
                 password VARCHAR(100) NOT NULL
            )
        `);
        console.log('Database initialized: users table is ready');
    } catch (error) {
        console.error('Error initializing database:', error);
        throw error;
    }
}

initConfig()
    .then(() =>
        initializeDatabase()
            .then(() => {
                app.listen(config.port, () => {
                    console.log(`App listening on port ${config.port}`);
                });
            })
            .catch((error) => {
                console.error('Failed to initialize application:', error);
                process.exit(1);
            }));

