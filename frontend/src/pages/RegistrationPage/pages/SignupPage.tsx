import { z } from "zod";
import { useNavigate } from "react-router-dom";
import { FC, useEffect, useState } from "react";
import { WEBSITE_ROUTES } from "@/routes/website.routes";
import { CredentialsForm } from "../components/CredentialsForm";
import { LocalStorageManager } from "@/managers/LocalStorageManager";
import { SignupSchema, SignupStepsDTO } from "@/schemas/SignupSchema";
import { useSchematicQueryParams } from "@/hooks/useSchematicQueryParams";
import { useSignupMutation } from "@/services/Registration/useSignupMutation";
import { PersonalInformationForm } from "../components/PersonalInformationForm";

export enum SignupStepEnum {
    credentials = "credentials",
    personalInformation = "personal-information",
}

export type SignupStep = ExtractEnumValue<SignupStepEnum>;

export const SignupQueryParamSchema = z.object({
    step: z.nativeEnum(SignupStepEnum).default(SignupStepEnum.credentials),
});

export const SignupPage: FC = () => {
    const { queryParams, setQueryParams } = useSchematicQueryParams(
        SignupQueryParamSchema
    );

    const [data, setData] = useState<
        WithPartial<SignupStepsDTO, keyof SignupStepsDTO>
    >({});

    const Navigate = useNavigate();

    const { reset, isPending, isError, isSuccess, mutateAsync } =
        useSignupMutation();

    useEffect(() => {
        const hasSkippedCredentialsStep =
            data.credentials == null &&
            queryParams?.step != SignupStepEnum.credentials;

        if (queryParams == null || hasSkippedCredentialsStep) {
            setQueryParams((_queryParams) => ({
                step: SignupStepEnum.credentials,
            }));
        }
    }, [queryParams]);

    useEffect(() => {
        const { data: validatedData, success } = SignupSchema.safeParse({
            ...data.credentials,
            ...data["personal-information"],
        });

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
    }, [data]);

    function SubmitCredentials(credentials: SignupStepsDTO["credentials"]) {
        setData((data) => ({ ...data, credentials }));
        setQueryParams((_queryParams) => ({
            step: SignupStepEnum.personalInformation,
        }));
    }

    function SubmitPersonalInformation(
        personalInformation: SignupStepsDTO["personal-information"]
    ) {
        setData((data) => ({
            ...data,
            "personal-information": personalInformation,
        }));
    }

    switch (queryParams?.step) {
        case "credentials":
            return <CredentialsForm SubmitData={SubmitCredentials} />;
        case "personal-information":
            return (
                <PersonalInformationForm
                    SubmitData={SubmitPersonalInformation}
                    mutationProps={{ reset, isPending, isError, isSuccess }}
                />
            );
    }
};
