import {Request, Response, Router} from "express";
import {ApiResponse} from "./response";
import {User} from "./user";
import {UserRepository} from "./user-repository";

const router = Router();
const userRepository = new UserRepository();

router.post('/users/new', async (request: Request, response: Response) => {
    try {
        console.log('Called /users/new endpoint');
        returnHttp400WhenValidationError(request, response);
        const user = createUserFrom(request);
        await returnHttp409WhenUsernameAlreadyTaken(user.username, response);
        await returnHttp409WhenEmailAlreadyInUse(user.email, response);
        const userId = await userRepository.save(user)
        returnHttpResponse(201, response, userId, request);
    } catch (error) {
        returnHttp500OnError(response, error);
    }
});

router.post('/users/edit/:userId', async (request: Request, response: Response) => {
    try {
        const userId = parseInt(request.params.userId);
        console.log(`Called /users/ endpoint ${userId}`);
        returnHttp400WhenValidationError(request, response);
        const user = createUserFrom(request);
        await returnHttp409WhenUsernameAlreadyTaken(user.username, response);
        await returnHttp409WhenEmailAlreadyInUse(user.email, response);
        await userRepository.update(userId, user)
        returnHttpResponse(200, response, userId, request);
    } catch (error) {
        returnHttp500OnError(response, error);
    }
});

function returnHttp400WhenValidationError(request: Request, response: Response) {
    if (!request.body.email || !request.body.username || !request.body.firstName || !request.body.lastName) {
        return response.status(400).json(
            new ApiResponse('ValidationError', undefined, false)
        );
    }
}

async function returnHttp409WhenUsernameAlreadyTaken(username: string, response: Response) {
    if (await userRepository.usernameExists(username)) {
        return response.status(409).json(
            new ApiResponse('UsernameAlreadyTaken', undefined, false)
        );
    }
}

async function returnHttp409WhenEmailAlreadyInUse(email: string, response: Response) {
    const emailExists = await userRepository.emailExists(email);
    if (emailExists) {
        return response.status(409).json(
            new ApiResponse('EmailAlreadyInUse', undefined, false)
        );
    }
}

function createUserFrom(request: Request) {
    return new User(
        request.body.email,
        request.body.username,
        request.body.firstName,
        request.body.lastName
    );
}

function returnHttpResponse(httpStatus: number, response: Response, userId: number, request: Request) {
    const successResponse = new ApiResponse(undefined, {
        id: userId,
        email: request.body.email,
        username: request.body.username,
        firstName: request.body.firstName,
        lastName: request.body.lastName
    }, true);
    response.status(httpStatus).json(successResponse);
}

function returnHttp500OnError(response: Response, error: any) {
    console.error('Error creating user:', error);
    if (error instanceof Error) {
        return response.status(500).json(
            new ApiResponse(`ServerError: ${error.message}`, null, false)
        );
    }
    return response.status(500).json(
        new ApiResponse('ServerError', null, false)
    );
}

export default router;
