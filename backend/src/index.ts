import express, {Request, Response} from "express";
import {ApiResponse} from "./response";

const app = express();
app.use(express.json());

app.post('/users/new', async (request: Request, response: Response) => {
    console.log('Called /users/new endpoint');

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
