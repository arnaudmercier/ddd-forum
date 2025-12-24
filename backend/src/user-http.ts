import {Request, Response, Router} from "express";
import {ApiResponse} from "./response";
import {User} from "./user";
import {UserRepository} from "./user-repository";
import {Config} from "./config";
import cors from "cors";

export function createUserRouter(config: Config): Router {
    const router = Router();
    const userRepository = new UserRepository(config);

    router.post('/users', cors(), async (request: Request, response: Response) => {
        try {
            if (!request.query.email) {
                return response.status(400).json(
                    new ApiResponse('MissingEmailQueryParameter', undefined, false)
                );
            }
            const email = request.query.email.toString();
            console.log(`Call /users endpoint with email: ${email}`);
            const user = await userRepository.findByEmail(email);
            if (user) {
                return response.status(200).json(
                    new ApiResponse(undefined, user, true)
                );
            } else {
                return response.status(404).json(
                    new ApiResponse('UserNotFound', undefined, false)
                );
            }
        } catch (error) {
            returnHttp500OnError(response, error);
        }
    })

    router.post('/users/new', cors(), async (request: Request, response: Response) => {
        try {
            console.log('Called /users/new endpoint');

            if (returnHttp400WhenValidationError(request, response)) {
                return;
            }

            const user = createUserFrom(request);

            if (await returnHttp409WhenUsernameAlreadyTaken(user.username, response)) {
                return;
            }

            if (await returnHttp409WhenEmailAlreadyInUse(user.email, response)) {
                return;
            }

            const userId = await userRepository.save(user)
            returnHttpResponse(201, response, userId, request);
        } catch (error) {
            returnHttp500OnError(response, error);
        }
    });

    router.post('/users/edit/:userId', cors(), async (request: Request, response: Response) => {
        try {
            const userId = parseInt(request.params.userId);
            console.log(`Called /users/ endpoint with userId: ${userId}`);

            if (returnHttp400WhenValidationError(request, response)) {
                return;
            }

            const user = createUserFrom(request);

            if (await returnHttp409WhenUsernameAlreadyTaken(user.username, response)) {
                return;
            }

            if (await returnHttp409WhenEmailAlreadyInUse(user.email, response)) {
                return;
            }

            await userRepository.update(userId, user)
            returnHttpResponse(200, response, userId, request);
        } catch (error) {
            returnHttp500OnError(response, error);
        }
    });

    function returnHttp400WhenValidationError(request: Request, response: Response): boolean {
        if (!request.body.email || !request.body.username || !request.body.firstName || !request.body.lastName) {
            response.status(400).json(
                new ApiResponse('ValidationError', undefined, false)
            );
            return true;
        }
        return false;
    }

    async function returnHttp409WhenUsernameAlreadyTaken(username: string, response: Response): Promise<boolean> {
        if (await userRepository.usernameExists(username)) {
            console.log("Username already taken:", username);
            response.status(409).json(
                new ApiResponse('UsernameAlreadyTaken', undefined, false)
            );
            return true;
        }
        return false;
    }

    async function returnHttp409WhenEmailAlreadyInUse(email: string, response: Response): Promise<boolean> {
        if (await userRepository.emailExists(email)) {
            console.log("Email already in use:", email);
            response.status(409).json(
                new ApiResponse('EmailAlreadyInUse', undefined, false)
            );
            return true;
        }
        return false;
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

    return router;
}

