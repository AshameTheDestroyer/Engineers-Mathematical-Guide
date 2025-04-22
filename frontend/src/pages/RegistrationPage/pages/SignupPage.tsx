import { z } from "zod";
import { FC, useEffect, useState } from "react";
import { CredentialsForm } from "../components/CredentialsForm";
import { SignupSchema, SignupStepsDTO } from "@/schemas/SignupSchema";
import { useSchematicQueryParams } from "@/hooks/useSchematicQueryParams";
import { useSignupMutation } from "@/services/Registration/useSignupMutation";
import { PersonalInformationForm } from "../components/PersonalInformationForm";

const SignupQueryParamSchema = z.object({
    step: z.enum(["credentials", "personal-information"]),
});

export const SignupPage: FC = () => {
    const { queryParams, setQueryParams } = useSchematicQueryParams(
        SignupQueryParamSchema
    );

    const [data, setData] = useState<
        WithPartial<SignupStepsDTO, keyof SignupStepsDTO>
    >({});

    const { mutateAsync } = useSignupMutation();

    useEffect(() => {
        const hasSkippedCredentialsStep =
            data.credentials == null && queryParams?.step != "credentials";

        if (queryParams == null || hasSkippedCredentialsStep) {
            setQueryParams((_queryParams) => ({ step: "credentials" }));
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
            .then((response) => response.data)
            .then(console.log)
            .catch(console.error);
    }, [data]);

    function SubmitCredentials(credentials: SignupStepsDTO["credentials"]) {
        setData((data) => ({ ...data, credentials }));
        setQueryParams((_queryParams) => ({ step: "personal-information" }));
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
                />
            );
    }
};
