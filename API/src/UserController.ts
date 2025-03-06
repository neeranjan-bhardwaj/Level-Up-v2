import type{ Request, Response } from 'express';

export async function getUser(req: Request, res: Response) {
    res.json({ message: "This is from getUser" });
}

export async function deleteUser(req: Request, res: Response) {
    res.json({ message: "This is from deleteUser" });
}

export async function createUser(req: Request, res: Response) {
    res.json({ message: "This is from createUser" });
}

export async function updateUser(req: Request, res: Response) {
    res.json({ message: "This is from updateUser" });
}