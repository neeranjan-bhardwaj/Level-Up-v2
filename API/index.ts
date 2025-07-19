import express, { type Request, type Response } from 'express';
import { getRoadmap } from './src/controller';
import cors from 'cors'
import { authentication, Login, signup } from './src/AUTHController';

const app = express();
const port = 3300;

app.use(express.json());
app.use(cors());

app.route('/Roadmap').post(getRoadmap);
app.route('/Login').post(Login);
app.route('/signup').post(signup);

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});