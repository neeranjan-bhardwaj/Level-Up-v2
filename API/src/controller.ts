import type{ Request, Response } from 'express';

export async function getRoadmap(req: Request, res: Response): Promise<void> {
    res.json({ message: "hi from getRoadmap" });
}