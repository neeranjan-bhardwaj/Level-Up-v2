import type{ Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs'; 

export const Login = (req: Request, res: Response, next: Function): void => {
    res.json({ message: 'Signup successful' });
    next();
};

export const signup = (req: Request, res: Response, next: Function): void => {
    res.json({ message: 'Signup successful' });
    next();
};