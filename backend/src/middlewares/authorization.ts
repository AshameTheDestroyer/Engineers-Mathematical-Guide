import { CheckRole } from "../utils";
import { RequestHandler } from "express";
import { UserModel, UserProps } from "src/services/users";

export const ValidateAuthority: (
    ...requiredRoles: Array<UserProps["role"]>
) => RequestHandler =
    (...requiredRoles) =>
    (request, response, next) =>
        CheckRole({
            requiredRoles,
            onAuthorized: next,
            userModel: UserModel,
            userID: (request as typeof request & { userID: string })["userID"],
            onNotFound: () =>
                response.status(404).send({ message: "User isn't found." }),
            onUnauthorized: (requiredRoles) =>
                response.status(403).send({
                    message:
                        "User is unauthorized, should have the role of " +
                        new Intl.ListFormat("en-US", {
                            style: "long",
                            type: "disjunction",
                        }).format(requiredRoles) +
                        ".",
                }),
            onFail: (error) => (
                console.error(error), response.status(500).send(error)
            ),
        });
