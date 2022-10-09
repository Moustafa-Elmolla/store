import express, { Application, Request, Response } from 'express';
import routes from './routes';
import morgan from 'morgan';
import errorMiddleware from './middleware/error.,middleware';
import config from './config';

const PORT = config.port || 3000;
//create server
const app: Application = express();
// logger middelware
app.use(morgan('common'));
// middleware to parse incoming requests
app.use(express.json());

// Error middleware handling
app.use(errorMiddleware);

//add routing
app.use('/api', routes);

//add routing
app.get('/', (_req: Request, res: Response) => {
    res.json({
        message: 'Connected to server',
    });
});

app.listen(PORT, () => {
    console.log(`Server is starting at port:${PORT}`);
});

export default app;
