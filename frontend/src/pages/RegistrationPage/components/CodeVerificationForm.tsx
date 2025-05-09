import { FC } from "react";
import { Link } from "react-router-dom";
import { Form } from "@/components/Form/Form";
import { Input } from "@/components/Input/Input";
import { Locale } from "@/components/Locale/Locale";
import { Button } from "@/components/Button/Button";
import { RichText } from "@/components/RichText/RichText";
import { useSchematicForm } from "@/hooks/useSchematicForm";
import { REGISTRATION_ROUTES } from "@/routes/registration.routes";
import { useToast } from "@/components/ToastProvider/ToastProvider";
import { useLocalization } from "@/components/LocalizationProvider/LocalizationProvider";
import {
    ForgotPasswordStepsDTO,
    ForgotPasswordStepSchemas,
} from "@/schemas/ForgotPasswordSchema";

import locales from "@localization/forgot_password_page.json";

export type CodeVerificationFormProps = {
    SubmitData: (data: ForgotPasswordStepsDTO["code-verification"]) => void;
};

export const CodeVerificationForm: FC<CodeVerificationFormProps> = ({
    SubmitData,
}) => {
    const { GetLocale, GetErrorLocale, language } = useLocalization();
    const { Alert } = useToast();

    const {
        reset,
        register,
        handleSubmit,
        formState: { errors },
    } = useSchematicForm(ForgotPasswordStepSchemas["code-verification"]);

    function ResendCode() {
        Alert(GetLocale(locales.toasts["code-resent"], language), {
            type: "info",
        });
    }

    return (
        <Form
            onSubmit={handleSubmit(SubmitData)}
            title={
                <Locale variant="h1" className="text-xl font-bold">
                    {locales.title["code-verification"]}
                </Locale>
            }
            options={
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
                        locales["last-option"]["code-verification"][
                            "resend-code"
                        ],
                        language
                    )}
                </RichText>
            }
            buttons={
                <>
                    <Button type="reset" onClick={(_e) => reset()}>
                        <Locale>{locales.buttons.clear}</Locale>
                    </Button>
                    <Button variant="primary" type="submit">
                        <Locale>{locales.buttons["verify-code"]}</Locale>
                    </Button>
                </>
            }
            lastOptions={
                <RichText
                    variant="p"
                    ExtractedTextRenders={(text) => (
                        <Link
                            className="text-primary-normal underline"
                            to={`${REGISTRATION_ROUTES.base.routes["forgot-password"].absolute}?step=code-request`}
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
            }
        >
            <Input
                required
                autoFocus
                autoComplete="off"
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
        </Form>
    );
};
