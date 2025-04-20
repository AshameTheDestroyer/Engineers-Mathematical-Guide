import { z } from "zod";
import { FC, useEffect, useState } from "react";
import { CodeRequestForm } from "../components/CodeRequestForm";
import { ResetPasswordForm } from "../components/ResetPasswordForm";
import { useSchematicQueryParams } from "@/hooks/useSchematicQueryParams";
import { CodeVerificationForm } from "../components/CodeVerificationForm";
import { useResetpasswordMutation } from "@/services/Registration/useForgotPasswordMutation";
import { useForgotPasswordMutation } from "@/services/Registration/useResetPasswordMutation";
import {
    ForgotPasswordStepsDTO,
    ForgotPasswordStepSchemas,
} from "@/schemas/ForgotPasswordSchema";

const ForgotPasswordQueryParamSchema = z.object({
    step: z.enum(["code-request", "code-verification", "reset-password"]),
});

export const ForgotPasswordPage: FC = () => {
    const { queryParams, setQueryParams } = useSchematicQueryParams(
        ForgotPasswordQueryParamSchema
    );

    const [data, setData] = useState<
        WithPartial<ForgotPasswordStepsDTO, keyof ForgotPasswordStepsDTO>
    >({});

    const { mutateAsync: mutateAsyncResetPassword } =
        useResetpasswordMutation();
    const { mutateAsync: mutateAsyncForgotPassword } =
        useForgotPasswordMutation();

    useEffect(() => {
        if (queryParams == null) {
            setQueryParams((_queryParams) => ({ step: "code-request" }));
            return;
        }

        switch (queryParams.step) {
            case "code-verification":
                if (data["code-request"] == null) {
                    setQueryParams((_queryParams) => ({
                        step: "code-request",
                    }));
                }
                break;
            case "reset-password":
                if (
                    data["code-request"] == null ||
                    data["code-verification"] == null
                ) {
                    setQueryParams((_queryParams) => ({
                        step: "code-request",
                    }));
                }
                break;
        }
    }, [queryParams]);

    useEffect(() => {
        const { data: validatedData, success } = ForgotPasswordStepSchemas[
            "code-request"
        ].safeParse(data["code-request"]);

        if (!success) {
            return;
        }

        mutateAsyncForgotPassword(validatedData)
            .then((response) => response.data)
            .then(console.log)
            .catch(console.error);
    }, [data["code-request"]]);

    useEffect(() => {
        const { data: validatedData, success } = ForgotPasswordStepSchemas[
            "reset-password"
        ].safeParse(data["reset-password"]);

        if (!success) {
            return;
        }

        mutateAsyncResetPassword(validatedData)
            .then((response) => response.data)
            .then(console.log)
            .catch(console.error);
    }, [data["reset-password"]]);

    function SubmitCodeRequest(
        codeRequest: ForgotPasswordStepsDTO["code-request"]
    ) {
        setData((data) => ({ ...data, "code-request": codeRequest }));
        setQueryParams((_queryParams) => ({ step: "code-verification" }));
    }

    function SubmitCodeVerification(
        codeVerification: ForgotPasswordStepsDTO["code-verification"]
    ) {
        setData((data) => ({ ...data, "code-verification": codeVerification }));
        setQueryParams((_queryParams) => ({ step: "reset-password" }));
    }

    function SubmitResetPassword(
        resetPassword: ForgotPasswordStepsDTO["reset-password"]
    ) {
        setData((data) => ({ ...data, "reset-password": resetPassword }));
    }

    switch (queryParams?.step) {
        case "code-request":
            return <CodeRequestForm SubmitData={SubmitCodeRequest} />;
        case "code-verification":
            return <CodeVerificationForm SubmitData={SubmitCodeVerification} />;
        case "reset-password":
            return <ResetPasswordForm SubmitData={SubmitResetPassword} />;
    }
};
