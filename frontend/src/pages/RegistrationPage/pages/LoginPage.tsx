import { FC } from "react";
import { useMain } from "@/contexts";
import { useNavigate } from "react-router-dom";
import { LoginForm } from "../components/LoginForm";
import { WEBSITE_ROUTES } from "@/routes/website.routes";
import { useGetMyUser } from "@/services/Users/useGetMyUser";
import { LoginDTO, LoginSchema } from "@/schemas/LoginSchema";
import { LocalStorageManager } from "@/managers/LocalStorageManager";
import { useLoginMutation } from "@/services/Registration/useLoginMutation";

export const LoginPage: FC = () => {
    const Navigate = useNavigate();

    const { data: myUser } = useGetMyUser();
    const { setMyUser } = useMain();

    const { reset, isPending, isError, isSuccess, mutateAsync } =
        useLoginMutation({ onSuccess: () => setMyUser(myUser) });

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
            .then(() => Navigate(WEBSITE_ROUTES.base.routes.home.absolute))
            .catch(console.error);
    }

    return (
        <LoginForm
            SubmitData={SubmitData}
            mutationProps={{ reset, isPending, isError, isSuccess }}
        />
    );
};
