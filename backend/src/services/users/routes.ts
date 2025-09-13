import { Router } from "express";

import {
    GetUsers,
    GetMyUser,
    PatchMyUser,
    GetUserByID,
    DeleteAllUsers,
    DeleteMyUser,
    DeleteUserByID,
} from "./services";
import {
    ValidateAuthenticity,
    ValidateAuthority,
    ValidateRateLimit,
} from "../../middlewares";

export const USER_ROUTE = "/users";
export const UserRouter = Router();

UserRouter.get(
    `${USER_ROUTE}/mine`,
    ValidateAuthenticity,
    ValidateRateLimit(),
    GetMyUser
);

UserRouter.get(
    USER_ROUTE,
    ValidateAuthenticity,
    ValidateAuthority("admin"),
    GetUsers
);
UserRouter.get(
    `${USER_ROUTE}/:id`,
    ValidateAuthenticity,
    ValidateRateLimit(),
    GetUserByID
);

UserRouter.patch(
    `${USER_ROUTE}/mine`,
    ValidateAuthenticity,
    ValidateRateLimit(),
    PatchMyUser
);

UserRouter.delete(
    `${USER_ROUTE}/mine`,
    ValidateAuthenticity,
    ValidateRateLimit(),
    DeleteMyUser
);

// UNTESTED!
UserRouter.delete(
    USER_ROUTE,
    ValidateAuthenticity,
    ValidateAuthority("admin"),
    DeleteAllUsers
);
// UNTESTED!
UserRouter.delete(
    `${USER_ROUTE}/:id`,
    ValidateAuthenticity,
    ValidateAuthority("admin"),
    DeleteUserByID
);
