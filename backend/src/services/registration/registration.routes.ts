import { Router } from "express";
import { ValidateAuthenticity } from "src/middlewares";
import { Login, Logout, Signup } from "./registration.services";

export const REGISTRATION_ROUTE = "/registration";
export const RegistrationRouter = Router();

RegistrationRouter.post(`${REGISTRATION_ROUTE}/login`, Login);
RegistrationRouter.post(`${REGISTRATION_ROUTE}/signup`, Signup);
RegistrationRouter.post(
    `${REGISTRATION_ROUTE}/logout`,
    ValidateAuthenticity,
    Logout
);
