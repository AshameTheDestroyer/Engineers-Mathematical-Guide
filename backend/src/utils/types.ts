import { Request } from 'express';
import { ObjectId } from 'typeorm';

export type AuthRequest = Request & { userId: ObjectId; username: string };
