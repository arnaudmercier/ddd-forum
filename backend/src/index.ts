import express, {Request, Response} from "express";

const app = express();
app.use(express.json());

app.post('/users/new', async (request: Request, response: Response) => {
    console.log('Called /users/new endpoint');
    response.status(201).json({ message: 'User creation endpoint called' });
});

app.listen(3000, () => {
    console.log(`App listening on port 3000`);
});
