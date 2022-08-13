import express, {Application, Request, Response} from 'express';
import morgan from 'morgan';


const PORT = 3000;
//create server
const app: Application = express();
// logger middelware
app.use(morgan('common'));
// middleware to parse incoming requests
app.use(express.json());

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
