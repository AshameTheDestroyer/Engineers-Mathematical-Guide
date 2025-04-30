import { FC } from "react";
import { LoginForm } from "../components/LoginForm";
import { LoginDTO, LoginSchema } from "@/schemas/LoginSchema";
import { useLoginMutation } from "@/services/Registration/useLoginMutation";

export const LoginPage: FC = () => {
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
            .then((response) => response.data)
            .then(console.log)
            .catch(console.error);
    }

    return (
        <LoginForm
            SubmitData={SubmitData}
            fetchingState={{ reset, isLoading, isError, isSuccess }}
        />
    );
};
