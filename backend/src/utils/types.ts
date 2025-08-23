import { Request } from 'express';
import { ObjectId } from 'mongodb';

export type AuthRequest = Request & { userId: ObjectId; username: string };

export enum LessonType {
    VIDEO = "video",
    READING = "reading"
}

export enum UserGender {
    MALE = "male",
    FEMALE = "female"
}