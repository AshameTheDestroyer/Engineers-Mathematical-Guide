import { RequestHandler } from "express";

export type RequestHandlerWithID = RequestHandler<{ id: string }>;
export type RequestMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
