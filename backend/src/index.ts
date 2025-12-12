import express, {Request, Response} from "express";
import {ApiResponse} from "./response";
import {Pool} from 'pg';
import {User} from "./user";
import {UserRepository} from "./user-repository";

const userRepository = new UserRepository();
const app = express();
app.use(express.json());

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

app.post('/users/new', async (request: Request, response: Response) => {
    console.log('Called /users/new endpoint');

    if (!request.body.email || !request.body.username || !request.body.firstName || !request.body.lastName) {
        return response.status(400).json(
            new ApiResponse('ValidationError', undefined, false)
        );
    }

    const user = new User(
        request.body.email,
        request.body.username,
        request.body.firstName,
        request.body.lastName,
        'TODO: random password'
    );

    await userRepository.save(user)

    const successResponse = new ApiResponse(undefined, {
        id: 'generated-user-id',
        email: request.body.email,
        username: request.body.username,
        firstName: request.body.firstName,
        lastName: request.body.lastName
    }, true);

    response.status(201).json(successResponse);
});

app.listen(3000, () => {
    console.log(`App listening on port 3000`);
});
