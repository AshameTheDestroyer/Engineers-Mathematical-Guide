import { FC } from "react";
import { Link } from "react-router-dom";
import { Input } from "@/components/Input/Input";
import { Locale } from "@/components/Locale/Locale";
import { Button } from "@/components/Button/Button";
import { RichText } from "@/components/RichText/RichText";
import { useSchematicForm } from "@/hooks/useSchematicForm";
import { ButtonBox } from "@/components/ButtonBox/ButtonBox";
import { useLocalization } from "@/components/LocalizationProvider/LocalizationProvider";
import {
    ForgotPasswordStepsDTO,
    ForgotPasswordStepSchemas,
} from "./ForgotPasswordPage";

import locales from "@localization/forgot_password_page.json";

export type ForgotPasswordCodeVerificationFormProps = {
    SubmitData: (data: ForgotPasswordStepsDTO["code-verification"]) => void;
};

export const ForgotPasswordCodeVerificationForm: FC<
    ForgotPasswordCodeVerificationFormProps
> = ({ SubmitData }) => {
    const { direction, GetLocale, GetErrorLocale, language } =
        useLocalization();

    const {
        reset,
        register,
        handleSubmit,
        formState: { errors },
    } = useSchematicForm(ForgotPasswordStepSchemas["code-verification"]);

    function ResendCode() {
        alert("Code Resent.");
    }

    return (
        <form
            className="my-16 flex h-full w-full flex-col gap-8"
            onSubmit={handleSubmit(SubmitData)}
        >
            <Locale variant="h1" className="text-xl font-bold">
                {locales.title["code-verification"]}
            </Locale>
            <main className="flex grow flex-col place-content-center gap-6">
                <Input
                    required
                    autoFocus
                    {...register("code")}
                    label={<Locale>{locales.inputs.code.label}</Locale>}
                    errorMessage={GetErrorLocale(
                        errors.code?.message,
                        locales.inputs.code.errors,
                        language
                    )}
                    placeholder={GetLocale(
                        locales.inputs.code.placeholder,
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
                    <Locale>{locales.buttons["verify-code"]}</Locale>
                </Button>
            </ButtonBox>
            <RichText
                variant="p"
                ExtractedTextRenders={(text) => (
                    <span
                        className="text-secondary-normal cursor-pointer underline"
                        onClick={ResendCode}
                    >
                        {text}
                    </span>
                )}
            >
                {GetLocale(
                    locales["last-option"]["code-verification"]["resend-code"],
                    language
                )}
            </RichText>
            <RichText
                variant="p"
                ExtractedTextRenders={(text) => (
                    <Link
                        className="text-primary-normal underline"
                        to="/registration/forgot-password?step=code-request"
                    >
                        {text}
                    </Link>
                )}
            >
                {GetLocale(
                    locales["last-option"]["code-verification"]["go-back"],
                    language
                )}
            </RichText>
        </form>
    );
};
