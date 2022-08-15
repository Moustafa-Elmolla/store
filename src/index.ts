import express, {Application, Request, Response} from 'express';
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

app.use('/api', routes);

//add routing
app.get('/', (req: Request, res: Response) => {
    res.json({
        message: 'Hello World',
    });
});

app.listen(PORT, () => {
    console.log(`Server is starting at port:${PORT}`);
});

export default app;
