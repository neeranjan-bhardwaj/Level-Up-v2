import type{ Request, Response } from 'express';

export async function getRoadmap(req: Request, res: Response): Promise<void> {
    console.log("hi from getRoadmap");
    res.json({ message: "hi from getRoadmap" });
}