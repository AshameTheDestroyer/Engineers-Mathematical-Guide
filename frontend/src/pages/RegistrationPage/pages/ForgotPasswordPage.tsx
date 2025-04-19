import { z } from "zod";
import { Link } from "react-router-dom";
import { FC, useEffect, useState } from "react";
import { Locale } from "@/components/Locale/Locale";
import { Button } from "@/components/Button/Button";
import { InferNested } from "@/types/Zod.InferNested";
import { Input } from "../../../components/Input/Input";
import { RichText } from "@/components/RichText/RichText";
import { useSchematicForm } from "@/hooks/useSchematicForm";
import { ButtonBox } from "@/components/ButtonBox/ButtonBox";
import { useLocalization } from "@/components/LocalizationProvider/LocalizationProvider";
import { useSchematicQueryParams } from "@/hooks/useSchematicQueryParams";

import locales from "@localization/forgot_password_page.json";

export const ForgotPasswordStepSchemas = {
    "code-request": z.object({
        email: z.string({ required_error: "required" }).email("pattern"),
    }),
    "code-verification": z.object({
        code: z.string({ required_error: "required" }),
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

    const { direction, GetLocale, GetErrorLocale, language } =
        useLocalization();

    const {
        reset,
        register,
        handleSubmit,
        formState: { errors },
    } = useSchematicForm(ForgotPasswordSchema);

    useEffect(() => {
        const hasSkippedCodeRequestStep =
            data["code-request"] == null && queryParams?.step != "code-request";

        const hasSkippedCodeVerificationStep =
            data["code-verification"] == null &&
            queryParams?.step != "code-verification";

        if (
            queryParams == null ||
            hasSkippedCodeRequestStep ||
            hasSkippedCodeVerificationStep
        ) {
            setQueryParams((_queryParams) => ({ step: "code-request" }));
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

    return (
        <form
            className="my-16 flex h-full w-full flex-col gap-8"
            onSubmit={handleSubmit(SubmitCodeRequest)}
        >
            <Locale variant="h1" className="text-xl font-bold">
                {locales.title}
            </Locale>
            <main className="flex grow flex-col place-content-center gap-6">
                <Input
                    required
                    autoFocus
                    type="email"
                    {...register("email")}
                    label={<Locale>{locales.inputs.email.label}</Locale>}
                    errorMessage={GetErrorLocale(
                        errors.email?.message,
                        locales.inputs.email.errors,
                        language
                    )}
                    placeholder={GetLocale(
                        locales.inputs.email.placeholder,
                        language
                    )}
                />
            </main>
            <ButtonBox
                className="[&>button]:flex-1"
                direction={direction == "ltr" ? "row" : "reverse-row"}
            >
                <Button type="reset" onClick={(_e) => reset()}>
                    <Locale>{locales.buttons.clear}</Locale>
                </Button>
                <Button variant="primary" type="submit">
                    <Locale>{locales.buttons["send-code"]}</Locale>
                </Button>
            </ButtonBox>
            <RichText
                variant="p"
                ExtractedTextRenders={(text) => (
                    <Link
                        className="text-primary-normal underline"
                        to="/registration/login"
                    >
                        {text}
                    </Link>
                )}
            >
                {GetLocale(locales["last-option"], language)}
            </RichText>
        </form>
    );
};
