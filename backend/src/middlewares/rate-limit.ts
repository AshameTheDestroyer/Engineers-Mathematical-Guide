import { CheckRole } from "../utils";
import { RequestHandler } from "express";
import RateLimit from "express-rate-limit";
import { UserModel } from "src/services/users";

const RATE_LIMIT = 1000;
const RATE_LIMIT_TIMER = 15 * 60 * 1000;

const rateLimit = RateLimit({
    max: RATE_LIMIT,
    windowMs: RATE_LIMIT_TIMER,
    handler: (_request, response) =>
        response
            .status(429)
            .send({ error: "Too many requests, please try again later." }),
});

export const ValidateRateLimit: (props?: {
    checkRole: boolean;
}) => RequestHandler =
    (props = { checkRole: true }) =>
    (request, response, next) =>
        !props.checkRole
            ? rateLimit(request, response, next)
            : CheckRole({
                  onAuthorized: next,
                  userModel: UserModel,
                  requiredRoles: ["admin"],
                  onUnauthorized: () => rateLimit(request, response, next),
                  userID: (request as typeof request & { userID: string })[
                      "userID"
                  ],
                  onNotFound: () =>
                      response
                          .status(404)
                          .send({ message: "User isn't found." }),
                  onFail: (error) => (
                      console.error(error), response.status(500).send(error)
                  ),
              });
