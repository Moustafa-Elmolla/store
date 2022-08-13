import express, {Application, Request, Response} from 'express';
import morgan from 'morgan';
import errorMiddleware from './middleware/error.,middleware';
import config from './config';
import db from './database';


const PORT = config.port || 3000;
//create server
const app: Application = express();
// logger middelware
app.use(morgan('common'));
// middleware to parse incoming requests
app.use(express.json());

db.connect().then((client) => {
    return client.query('SELECT NOW()').then((res) => {
        client.release();
        console.log(res.rows);
    }).catch((err) => {
        client.release();
        console.log(err.stack);
    });
});

// Error middleware handling
app.use(errorMiddleware);

//add routing
app.get('/', (req: Request, res: Response) => {
    res.json({
        message: 'Hello World',
    });
});

app.post('/', (req: Request, res: Response) => {
    res.json({
        message: 'Hello World from post',
        data: req.body,
    });
});

app.listen(PORT, () => {
    console.log(`Server is starting at port:${PORT}`);
});

export default app;
