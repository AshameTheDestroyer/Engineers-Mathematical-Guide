import { FC } from "react";
import { LoginForm } from "../components/LoginForm";
import { LoginDTO, LoginSchema } from "@/schemas/LoginSchema";
import { useLoginMutation } from "@/services/Registration/useLoginMutation";

export const LoginPage: FC = () => {
    const { mutateAsync } = useLoginMutation();

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

    return <LoginForm SubmitData={SubmitData} />;
};
