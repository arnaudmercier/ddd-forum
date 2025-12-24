import express from "express";
import {createUserRouter} from "./user-http";
import {Config} from "./config";
import cors from 'cors';
import {PrismaPg} from "@prisma/adapter-pg";
import {PrismaClient} from '../src/generated/prisma/client';

require('dotenv').config()

const app = express();
app.use(express.json());
app.use(cors())

export let config: Config;

async function initConfig(): Promise<void> {
    try {
        const port = process.env.PORT;
        const databaseUrl = process.env.DATABASE_URL;

        if (!port) throw new Error('PORT environment variable is required');
        if (!databaseUrl) throw new Error('DATABASE_URL environment variable is required');

        config = {
            port: parseInt(port),
            databaseUrl: databaseUrl
        };
        console.log('Config is initialized successfully');
    } catch (error) {
        console.error('Error initializing config:', error);
        throw error;
    }
}

async function pingDatabase(): Promise<void> {
    let prisma: PrismaClient | null = null;
    try {
        const adapter = new PrismaPg({
            connectionString: config.databaseUrl,
        });
        prisma = new PrismaClient({adapter});
        await prisma.$connect()
        await prisma.$queryRaw`SELECT 1 as test`
        console.log('Database is ready');

    } catch (error) {
        console.error('Error pinging database:', error);
        throw new Error(`Database connection failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
        if (prisma) {
            await prisma.$disconnect();
        }
    }
}

initConfig()
    .then(() => {
        const router = createUserRouter(config);
        app.use(router);
        return pingDatabase();
    })
    .then(() => {
        app.listen(config.port, () => {
            console.log(`App listening on port ${config.port}`);
        });
    })
    .catch((error) => {
        console.error('Failed to initialize application:', error);
        process.exit(1);
    });

