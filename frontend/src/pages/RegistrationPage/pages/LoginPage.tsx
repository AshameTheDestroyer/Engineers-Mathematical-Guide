import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { LoginForm } from "../components/LoginForm";
import { LANDING_ROUTES } from "@/routes/landing.routes";
import { LoginDTO, LoginSchema } from "@/schemas/LoginSchema";
import { LocalStorageManager } from "@/managers/LocalStorageManager";
import { useLoginMutation } from "@/services/Registration/useLoginMutation";

export const LoginPage: FC = () => {
    const Navigate = useNavigate();

    const {
        reset,
        isError,
        isSuccess,
        mutateAsync,
        isPending: isLoading,
    } = useLoginMutation();

    function SubmitData(data: LoginDTO) {
        const { data: validatedData, success } = LoginSchema.safeParse(data);

        if (!success) {
            return;
        }

        mutateAsync(validatedData)
            .then((response) => response.data.accessToken)
            .then((token) =>
                LocalStorageManager.Instance.SetItem("token", token)
            )
            .then(() => Navigate(LANDING_ROUTES.home.absolute))
            .catch(console.error);
    }

    return (
        <LoginForm
            SubmitData={SubmitData}
            fetchingState={{ reset, isLoading, isError, isSuccess }}
        />
    );
};
