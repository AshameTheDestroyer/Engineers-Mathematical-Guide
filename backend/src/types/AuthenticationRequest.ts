import { Request } from "express";
import { ObjectId } from "typeorm";

export type AuthenticationRequest = Request & {
    userId: ObjectId;
    username: string;
};
