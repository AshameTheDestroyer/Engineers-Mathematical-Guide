import { z } from "zod";
import { FC, useEffect, useState } from "react";
import { CodeRequestForm } from "../components/CodeRequestForm";
import { ResetPasswordForm } from "../components/ResetPasswordForm";
import { useSchematicQueryParams } from "@/hooks/useSchematicQueryParams";
import { CodeVerificationForm } from "../components/CodeVerificationForm";
import { useResetPasswordMutation } from "@/services/Registration/useForgotPasswordMutation";
import { useForgotPasswordMutation } from "@/services/Registration/useResetPasswordMutation";
import {
    ForgotPasswordStepsDTO,
    ForgotPasswordStepSchemas,
} from "@/schemas/ForgotPasswordSchema";

export enum ForgotPasswordStepEnum {
    codeRequest = "code-request",
    resetPassword = "reset-password",
    codeVerification = "code-verification",
}

export type ForgotPasswordStep = ExtractEnumValue<ForgotPasswordStepEnum>;

const ForgotPasswordQueryParamSchema = z.object({
    step: z.nativeEnum(ForgotPasswordStepEnum),
});

export const ForgotPasswordPage: FC = () => {
    const { queryParams, setQueryParams } = useSchematicQueryParams(
        ForgotPasswordQueryParamSchema
    );

    const [data, setData] = useState<
        WithPartial<ForgotPasswordStepsDTO, keyof ForgotPasswordStepsDTO>
    >({});

    const resetPasswordMutation = useResetPasswordMutation();
    const forgotPasswordMutation = useForgotPasswordMutation();

    useEffect(() => {
        if (queryParams == null) {
            setQueryParams((_queryParams) => ({
                step: ForgotPasswordStepEnum.codeRequest,
            }));
            return;
        }

        switch (queryParams.step) {
            case ForgotPasswordStepEnum.codeVerification:
                if (data["code-request"] == null) {
                    setQueryParams((_queryParams) => ({
                        step: ForgotPasswordStepEnum.codeRequest,
                    }));
                }
                break;
            case ForgotPasswordStepEnum.resetPassword:
                if (
                    data["code-request"] == null ||
                    data["code-verification"] == null
                ) {
                    setQueryParams((_queryParams) => ({
                        step: ForgotPasswordStepEnum.codeRequest,
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

        forgotPasswordMutation
            .mutateAsync(validatedData)
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

        resetPasswordMutation
            .mutateAsync(validatedData)
            .then((response) => response.data)
            .then(console.log)
            .catch(console.error);
    }, [data["reset-password"]]);

    function SubmitCodeRequest(
        codeRequest: ForgotPasswordStepsDTO["code-request"]
    ) {
        setData((data) => ({ ...data, "code-request": codeRequest }));
        setQueryParams((_queryParams) => ({
            step: ForgotPasswordStepEnum.codeVerification,
        }));
    }

    function SubmitCodeVerification(
        codeVerification: ForgotPasswordStepsDTO["code-verification"]
    ) {
        setData((data) => ({ ...data, "code-verification": codeVerification }));
        setQueryParams((_queryParams) => ({
            step: ForgotPasswordStepEnum.resetPassword,
        }));
    }

    function SubmitResetPassword(
        resetPassword: ForgotPasswordStepsDTO["reset-password"]
    ) {
        setData((data) => ({ ...data, "reset-password": resetPassword }));
    }

    switch (queryParams?.step) {
        case ForgotPasswordStepEnum.codeRequest:
            return (
                <CodeRequestForm
                    SubmitData={SubmitCodeRequest}
                    mutationProps={Object.pick(
                        forgotPasswordMutation,
                        "reset",
                        "isError",
                        "isPending",
                        "isSuccess"
                    )}
                />
            );
        case ForgotPasswordStepEnum.codeVerification:
            return <CodeVerificationForm SubmitData={SubmitCodeVerification} />;
        case ForgotPasswordStepEnum.resetPassword:
            return (
                <ResetPasswordForm
                    SubmitData={SubmitResetPassword}
                    mutationProps={Object.pick(
                        resetPasswordMutation,
                        "reset",
                        "isError",
                        "isPending",
                        "isSuccess"
                    )}
                />
            );
    }
};
