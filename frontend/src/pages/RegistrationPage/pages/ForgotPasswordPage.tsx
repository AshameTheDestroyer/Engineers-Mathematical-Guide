import { z } from "zod";
import { FC, useEffect, useState } from "react";
import { InferNested } from "@/types/Zod.InferNested";
import { useSchematicQueryParams } from "@/hooks/useSchematicQueryParams";
import { ForgotPasswordCodeRequestForm } from "./ForgotPasswordCodeRequestForm";
import { ForgotPasswordResetPasswordForm } from "./ForgotPasswordResetPasswordForm";
import { ForgotPasswordCodeVerificationForm } from "./ForgotPasswordCodeVerificationForm";

export const ForgotPasswordStepSchemas = {
    "code-request": z.object({
        email: z.string({ required_error: "required" }).email("pattern"),
    }),
    "code-verification": z.object({
        code: z.string({ required_error: "required" }).length(6, "length"),
    }),
    "reset-password": z
        .object({
            password: z
                .string({ required_error: "required" })
                .min(4, "minimum")
                .max(20, "maximum"),
            "confirm-password": z.string({ required_error: "required" }),
        })
        .refine((data) => data.password == data["confirm-password"], {
            message: "match",
            path: ["confirm-password"],
        }),
};

export const ForgotPasswordSchema = ForgotPasswordStepSchemas["code-request"]
    .and(ForgotPasswordStepSchemas["code-verification"])
    .and(ForgotPasswordStepSchemas["reset-password"]);

export type ForgotPasswordDTO = z.infer<typeof ForgotPasswordSchema>;
export type ForgotPasswordStepsDTO = InferNested<
    typeof ForgotPasswordStepSchemas
>;

export const ForgotPasswordQueryParamSchema = z.object({
    step: z.enum(["code-request", "code-verification", "reset-password"]),
});

export const ForgotPasswordPage: FC = () => {
    const { queryParams, setQueryParams } = useSchematicQueryParams(
        ForgotPasswordQueryParamSchema
    );

    const [data, setData] = useState<
        WithPartial<ForgotPasswordStepsDTO, keyof ForgotPasswordStepsDTO>
    >({});

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
            return (
                <ForgotPasswordCodeRequestForm SubmitData={SubmitCodeRequest} />
            );
        case "code-verification":
            return (
                <ForgotPasswordCodeVerificationForm
                    SubmitData={SubmitCodeVerification}
                />
            );
        case "reset-password":
            return (
                <ForgotPasswordResetPasswordForm
                    SubmitData={SubmitResetPassword}
                />
            );
    }
};
