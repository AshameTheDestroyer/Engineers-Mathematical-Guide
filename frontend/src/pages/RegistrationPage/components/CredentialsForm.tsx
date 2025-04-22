import { FC } from "react";
import { Link } from "react-router-dom";
import { Form } from "@/components/Form/Form";
import { Input } from "@/components/Input/Input";
import { Locale } from "@/components/Locale/Locale";
import { Button } from "@/components/Button/Button";
import { Checkbox } from "@/components/Checkbox/Checkbox";
import { RichText } from "@/components/RichText/RichText";
import { useSchematicForm } from "@/hooks/useSchematicForm";
import { PasswordInput } from "@/components/PasswordInput/PasswordInput";
import { SignupStepSchemas, SignupStepsDTO } from "@/schemas/SignupSchema";
import { useLocalization } from "@/components/LocalizationProvider/LocalizationProvider";

import locales from "@localization/signup_page.json";

export type CredentialsFormProps = {
    SubmitData: (data: SignupStepsDTO["credentials"]) => void;
};

export const CredentialsForm: FC<CredentialsFormProps> = ({ SubmitData }) => {
    const { GetLocale, GetErrorLocale, language } = useLocalization();

    const {
        reset,
        register,
        handleSubmit,
        formState: { errors },
    } = useSchematicForm(SignupStepSchemas.credentials);

    return (
        <Form
            onSubmit={handleSubmit(SubmitData)}
            title={
                <Locale variant="h1" className="text-xl font-bold">
                    {locales.title.credentials}
                </Locale>
            }
            buttons={
                <>
                    <Button
                        type="reset"
                        onClick={(_e) =>
                            reset({ "terms-and-conditions": false })
                        }
                    >
                        <Locale>{locales.buttons.clear}</Locale>
                    </Button>
                    <Button variant="primary" type="submit">
                        <Locale>{locales.buttons.signup}</Locale>
                    </Button>
                </>
            }
            lastOptions={
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
                    {GetLocale(locales["last-option"].credentials, language)}
                </RichText>
            }
        >
            <Input
                required
                autoFocus
                type="email"
                autoComplete="off"
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
            <PasswordInput
                required
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
                label={
                    <Locale>{locales.inputs["confirm-password"].label}</Locale>
                }
                errorMessage={GetErrorLocale(
                    errors["confirm-password"]?.message,
                    locales.inputs["confirm-password"].errors,
                    language
                )}
                placeholder={GetLocale(
                    locales.inputs["confirm-password"].placeholder,
                    language
                )}
            />
            <Checkbox
                required
                {...register("terms-and-conditions")}
                errorMessage={GetErrorLocale(
                    errors["terms-and-conditions"]?.message,
                    locales.inputs["terms-and-conditions"].errors,
                    language
                )}
                label={
                    <RichText
                        ExtractedTextRenders={(text) => (
                            <Link
                                className="text-secondary-normal underline"
                                to="/registration/terms-and-conditions"
                            >
                                {text}
                            </Link>
                        )}
                    >
                        {GetLocale(
                            locales.inputs["terms-and-conditions"].label,
                            language
                        )}
                    </RichText>
                }
            />
        </Form>
    );
};
