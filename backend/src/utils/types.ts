import { Request } from 'express';
import { ObjectId } from 'mongodb';

export type AuthRequest = Request & { userId: ObjectId; username: string };

export enum AchievementType {
    Constant="constant",
    Function="function",
    Derivative="derivative",
    Integral="Integral"
}