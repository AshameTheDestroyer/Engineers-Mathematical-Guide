import { Router } from "express";
import { Upload } from "src/middlewares/upload";
import { ValidateRateLimit, ValidateAuthenticity } from "src/middlewares";
import {
    GetMyUser,
    PatchMyUser,
    PatchMyUserAvatar,
    DeleteMyUserAvatar,
} from "./user.services";

export const USER_ROUTE = "/users";
export const UserRouter = Router();

UserRouter.get(
    `${USER_ROUTE}/mine`,
    ValidateAuthenticity,
    ValidateRateLimit(),
    GetMyUser
);

UserRouter.patch(
    `${USER_ROUTE}/mine/avatar`,
    ValidateAuthenticity,
    ValidateRateLimit(),
    Upload.single("file"),
    PatchMyUserAvatar
);

UserRouter.patch(
    `${USER_ROUTE}/mine`,
    ValidateAuthenticity,
    ValidateRateLimit(),
    PatchMyUser
);

UserRouter.delete(
    `${USER_ROUTE}/mine/avatar`,
    ValidateAuthenticity,
    ValidateRateLimit(),
    DeleteMyUserAvatar
);
