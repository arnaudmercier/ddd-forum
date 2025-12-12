import express, {Request, Response} from "express";
import {ApiResponse} from "./response";
import {Pool} from 'pg';

const app = express();
app.use(express.json());

let pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'users',
    password: 'demo',
    port: 5432,
});

pool.query('select 1+1 as result').then(() => {
    console.log('Connected to the database successfully');
}).catch((error) => {
    console.error('Error connecting to the database:', error);
});

app.post('/users/new', async (request: Request, response: Response) => {
    console.log('Called /users/new endpoint');

    if (!request.body.email || !request.body.username || !request.body.firstName || !request.body.lastName) {
        return response.status(400).json(
            new ApiResponse('ValidationError', undefined, false)
        );
    }

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
