import { FC } from "react";
import { Link } from "react-router-dom";
import { Form } from "@/components/Form/Form";
import { Locale } from "@/components/Locale/Locale";
import { Button } from "@/components/Button/Button";
import { RichText } from "@/components/RichText/RichText";
import { useSchematicForm } from "@/hooks/useSchematicForm";
import { REGISTRATION_ROUTES } from "@/routes/registration.routes";
import { PasswordInput } from "@/components/PasswordInput/PasswordInput";
import { useLocalization } from "@/components/LocalizationProvider/LocalizationProvider";
import {
    ForgotPasswordStepsDTO,
    ForgotPasswordStepSchemas,
} from "@/schemas/ForgotPasswordSchema";

import locales from "@localization/forgot_password_page.json";

export type ResetPasswordFormProps = {
    SubmitData: (data: ForgotPasswordStepsDTO["reset-password"]) => void;
};

export const ResetPasswordForm: FC<ResetPasswordFormProps> = ({
    SubmitData,
}) => {
    const { GetLocale, GetErrorLocale, language } = useLocalization();

    const {
        reset,
        register,
        handleSubmit,
        formState: { errors },
    } = useSchematicForm(ForgotPasswordStepSchemas["reset-password"]);

    return (
        <Form
            onSubmit={handleSubmit(SubmitData)}
            title={
                <Locale variant="h1" className="text-xl font-bold">
                    {locales.title["reset-password"]}
                </Locale>
            }
            buttons={
                <>
                    <Button type="reset" onClick={(_e) => reset()}>
                        <Locale>{locales.buttons.clear}</Locale>
                    </Button>
                    <Button variant="primary" type="submit">
                        <Locale>{locales.buttons["reset-password"]}</Locale>
                    </Button>
                </>
            }
            lastOptions={
                <RichText
                    variant="p"
                    ExtractedTextRenders={(text) => (
                        <Link
                            className="text-primary-normal underline"
                            to={REGISTRATION_ROUTES.base.routes.login.absolute}
                        >
                            {text}
                        </Link>
                    )}
                >
                    {GetLocale(
                        locales["last-option"]["reset-password"],
                        language
                    )}
                </RichText>
            }
        >
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
                    <Locale>{locales.inputs["confirm-password"].label}</Locale>
                }
            />
        </Form>
    );
};
