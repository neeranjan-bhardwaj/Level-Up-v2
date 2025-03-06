import express, { type Request, type Response } from 'express';
import { getRoadmap } from './src/controller';
import cors from 'cors'

const app = express();
const port = 3000;

app.use(cors());

app.route('/Roadmap').get((req,res)=>{
    console.log("hi from getRoadmap");
    res.json(["hi from getRoadmap"] );
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});