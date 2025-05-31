import type{ Request, Response } from 'express';
import { User } from './DB/DataBase';
import { createUser } from './UserController';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs'; 
import type { FieldPacket, QueryResult } from 'mysql2';

const Jwt = (payload:string): string => {
    return jwt.sign({ name:payload},'This is my secret key for jwt');
}

export async function Login (req: Request, res: Response, next:Function): Promise<void> {
    try{
        const { email, password } = req.body;
        if(!email || !password)throw 'can not find email and password';

        const [[user]]:any = await User.query(`SELECT Password,Email,Name FROM User WHERE Email=?`,[email]);

        if(!user) throw 'can not find user';
        
        const isVaild = bcrypt.compareSync(password, user.Password);
        if(!isVaild) throw 'password is not correct';

        const JWTToken = Jwt(user.Name);
        res.json({ 
            message:"login success",
            JWTToken
        });
        next();
    }catch(err){
        if(err instanceof Error){
            res.json({ message: err.message });
            console.log(err.message);
        }
        if(typeof err === 'string'){
            res.json({ message: err});
            console.log(err);
        }
    }
};

export async function signup (req: Request, res: Response, next: Function):Promise<void>{
    try{
        const { email, password, name, user } = req.body;
        if(!email || !password || !name) throw 'can not find email and password';

        const hash = bcrypt.hashSync(password, 10);
        await User.query('INSERT INTO User(Name,Email,password) VALUE(?,?,?)',[name, email, hash]);

        const JWTToken = Jwt(name);
        console.log(req.body)
        res.json({ JWTToken });
        next();
    }catch(err){
        if(err instanceof Error){
            res.json({ message: err.message });
            console.log(err.message);
        }
        if(typeof err === 'string'){
            res.json({ message: err });
            console.log(err);
        }
    }
};

export async function authentication(req: Request, res: Response, next: Function): Promise<void> {
    try{
        const token = req.headers.authorization;
        if(!token) throw 'can not find token';
        //JWT check & start with Bearer
        const isVaild=token?.startsWith('Bearer ');
        if(!isVaild) throw 'token is not vaild';
        //remove Bearer
        const tokenArr = token?.split(' ');
        // console.log(tokenArr[1]);
        let UserName;

        jwt.verify(tokenArr[1], 'This is my secret key for jwt', (err, decoded:any) => {
            UserName = decoded.name;
            if(err) throw err;
            res.locals.user= UserName;
            next();
        });

        //user check root or not
        // const [[user]]:any = await User.query(`SELECT User FROM User WHERE Name=?`,[UserName]);
        
    }catch(err){
        if(err instanceof Error){
            res.json({ message: err.message });
            console.log(err.message);
        }
        if(typeof err === 'string'){
            res.json({ message: err });
            console.log(err);
        }
    }
};