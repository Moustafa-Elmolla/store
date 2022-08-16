import { Request, Response, NextFunction } from 'express';
import Error from '../interfaces/error.interface';
import config from '../config';
import jwt from 'jsonwebtoken';

const handleError = (next: NextFunction) => {
    const error: Error = new Error('login error: Try Again');
        error.status = 401;
        next(error);
};

const validToken = (req: Request, _res: Response, next: NextFunction) => {
    try {
        const authHeader = req.get('Authorization');
        if(authHeader) {
            const bearer = authHeader.split(' ')[0].toLowerCase();
            const token = authHeader.split(' ')[1];
            if(token && bearer === 'bearer') {
                const decode = jwt.verify(token, config.tokenSecret as unknown as string);
                if(decode) {
                    next();
                } else {
                    handleError(next);
                }
            } else {
                handleError(next);
            }
        }else {
            handleError(next);
        } 
    } catch (error) {
        handleError(next);
    }
};

export default validToken;
