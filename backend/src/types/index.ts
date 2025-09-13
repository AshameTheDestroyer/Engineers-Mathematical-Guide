import { RequestHandler } from "express";

export type RequestHandlerWithID = RequestHandler<{ id: string }>;
export type RequestMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
export type StrictOmit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
