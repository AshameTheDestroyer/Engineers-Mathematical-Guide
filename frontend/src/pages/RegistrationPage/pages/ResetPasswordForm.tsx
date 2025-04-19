import { FC } from "react";
import { Link } from "react-router-dom";
import { Locale } from "@/components/Locale/Locale";
import { Button } from "@/components/Button/Button";
import { RichText } from "@/components/RichText/RichText";
import { useSchematicForm } from "@/hooks/useSchematicForm";
import { ButtonBox } from "@/components/ButtonBox/ButtonBox";
import { PasswordInput } from "@/components/PasswordInput/PasswordInput";
import { useLocalization } from "@/components/LocalizationProvider/LocalizationProvider";
import {
    ForgotPasswordStepsDTO,
    ForgotPasswordStepSchemas,
} from "./ForgotPasswordPage";

import locales from "@localization/forgot_password_page.json";

export type ResetPasswordFormProps = {
    SubmitData: (data: ForgotPasswordStepsDTO["reset-password"]) => void;
};

export const ResetPasswordForm: FC<ResetPasswordFormProps> = ({
    SubmitData,
}) => {
    const { direction, GetLocale, GetErrorLocale, language } =
        useLocalization();

    const {
        reset,
        register,
        handleSubmit,
        formState: { errors },
    } = useSchematicForm(ForgotPasswordStepSchemas["reset-password"]);

    return (
        <form
            className="my-16 flex h-full w-full flex-col gap-8"
            onSubmit={handleSubmit(SubmitData)}
        >
            <Locale variant="h1" className="text-xl font-bold">
                {locales.title["reset-password"]}
            </Locale>
            <main className="flex grow flex-col place-content-center gap-6">
                <PasswordInput
                    required
                    autoFocus
                    autoComplete="off"
                    {...register("password")}
                    label={<Locale>{locales.inputs.password.label}</Locale>}
                    errorMessage={GetErrorLocale(
                        errors.password?.message,
                        locales.inputs.password.errors,
                        language
                    )}
                    placeholder={GetLocale(
                        locales.inputs.password.placeholder,
                        language
                    )}
                />
                <PasswordInput
                    required
                    autoComplete="off"
                    {...register("confirm-password")}
                    errorMessage={GetErrorLocale(
                        errors["confirm-password"]?.message,
                        locales.inputs["confirm-password"].errors,
                        language
                    )}
                    placeholder={GetLocale(
                        locales.inputs["confirm-password"].placeholder,
                        language
                    )}
                    label={
                        <Locale>
                            {locales.inputs["confirm-password"].label}
                        </Locale>
                    }
                />
            </main>
            <ButtonBox
                className="flex-wrap [&>button]:flex-1 [&>button]:text-nowrap"
                direction={direction == "ltr" ? "row" : "reverse-row"}
            >
                <Button type="reset" onClick={(_e) => reset()}>
                    <Locale>{locales.buttons.clear}</Locale>
                </Button>
                <Button variant="primary" type="submit">
                    <Locale>{locales.buttons["reset-password"]}</Locale>
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
                {GetLocale(locales["last-option"]["reset-password"], language)}
            </RichText>
        </form>
    );
};
