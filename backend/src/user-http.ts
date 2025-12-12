import {Request, Response, Router} from "express";
import {ApiResponse} from "./response";
import {User} from "./user";
import {UserRepository} from "./user-repository";

const router = Router();
const userRepository = new UserRepository();

router.post('/users/new', async (request: Request, response: Response) => {
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

export default router;
