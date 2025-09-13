import { Model } from "mongoose";

export async function CheckRole<T extends { role: string }>(props: {
    userID: string;
    userModel: Model<T>;
    requiredRoles: Array<T["role"]>;
    onNotFound: () => void;
    onAuthorized: () => void;
    onFail: (error: any) => void;
    onUnauthorized: (requiredRoles: Array<T["role"]>) => void;
}) {
    const user = await props.userModel.findById(props.userID);
    try {
        if (user == null) {
            return props.onNotFound(), "not-found";
        }

        if (!props.requiredRoles.includes(user.role)) {
            return props.onUnauthorized(props.requiredRoles), "unauthorized";
        }

        return props.onAuthorized(), "authorized";
    } catch (error) {
        return props.onFail(error), "fail";
    }
}
