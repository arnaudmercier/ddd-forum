import {Request, Response, Router} from "express";
import {ApiResponse} from "./response";
import {Config} from "./config";
import cors from "cors";
import {PostRepository} from "./post-repository";

export function createPostRouter(config: Config): Router {
    const router = Router();
    const postRepository = new PostRepository(config);

    router.get('/posts', cors(), async (request: Request, response: Response) => {
        try {

            console.log(`Call /posts endpoint`);
            const posts = await postRepository.findPosts();
            return response.status(200).json(
                new ApiResponse(undefined, posts, true)
            );
        } catch (error) {
            returnHttp500OnError(response, error);
        }
    })

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

