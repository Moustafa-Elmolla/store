import { Router, Request, Response, NextFunction } from 'express';
import UserModel from '../../models/user.model';
import config from '../../config';
import jwt from 'jsonwebtoken';
import validToken from '../../middleware/auth.middleware';

const routes = Router();
const userModel = new UserModel();

// Creating
routes.post(
    '/',
    validToken,
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const user = await userModel.create(req.body);
            res.json({
                status: 'success',
                data: { ...user },
                message: 'User Created Successfully',
            });
        } catch (error) {
            next(error);
        }
    }
);

// Showing All
routes.get(
    '/',
    validToken,
    async (_req: Request, res: Response, next: NextFunction) => {
        try {
            const users = await userModel.getMany();
            res.json({
                status: 'success',
                data: users,
                message: 'User retrieved successfully',
            });
        } catch (error) {
            next(error);
        }
    }
);

// Showing one by ID
routes.get(
    '/:id',
    validToken,
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const user = await userModel.getOne(
                req.params.id as unknown as number
            );
            res.json({
                status: 'success',
                data: user,
                message: 'User retrieved successfully',
            });
        } catch (error) {
            next(error);
        }
    }
);

// Update One by ID
routes.patch(
    '/:id',
    validToken,
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const user = await userModel.updateOne(req.body);
            res.json({
                status: 'success',
                data: user,
                message: 'User updated successfully',
            });
        } catch (error) {
            next(error);
        }
    }
);

// Delete one by ID
routes.delete(
    '/:id',
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const user = await userModel.deleteOne(
                req.params.id as unknown as string
            );
            res.json({
                status: 'success',
                data: user,
                message: 'User deleted successfully',
            });
        } catch (error) {
            next(error);
        }
    }
);

// Authenticate
routes.post(
    '/authenticate',
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { email, password } = req.body;
            const user = await userModel.authenticate(email, password);
            const token = jwt.sign(
                { user },
                config.tokenSecret as unknown as string
            );
            if (!user) {
                return res.status(401).json({
                    status: 'error',
                    message: 'the username and password do not match',
                });
            }
            return res.json({
                status: 'success',
                data: { ...user, token },
                message: 'user authenticated successfully',
            });
        } catch (error) {
            return next(error);
        }
    }
);

export default routes;
