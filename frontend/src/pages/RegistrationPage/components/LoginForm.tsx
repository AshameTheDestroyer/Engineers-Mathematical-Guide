import { FC } from "react";
import { Link } from "react-router-dom";
import { Form } from "@/components/Form/Form";
import { Locale } from "@/components/Locale/Locale";
import { Button } from "@/components/Button/Button";
import { Input } from "../../../components/Input/Input";
import { RichText } from "@/components/RichText/RichText";
import { useSchematicForm } from "@/hooks/useSchematicForm";
import { LoginDTO, LoginSchema } from "@/schemas/LoginSchema";
import { REGISTRATION_ROUTES } from "@/routes/registration.routes";
import { PasswordInput } from "@/components/PasswordInput/PasswordInput";
import { useLocalization } from "@/components/LocalizationProvider/LocalizationProvider";

import locales from "@localization/login_page.json";

export type LoginFormProps = {
    SubmitData: (data: LoginDTO) => void;
};

export const LoginForm: FC<LoginFormProps> = ({ SubmitData }) => {
    const { GetLocale, GetErrorLocale, language } = useLocalization();

    const {
        reset,
        register,
        handleSubmit,
        formState: { errors },
    } = useSchematicForm(LoginSchema);

    return (
        <Form
            onSubmit={handleSubmit(SubmitData)}
            title={
                <Locale variant="h1" className="text-xl font-bold">
                    {locales.title}
                </Locale>
            }
            options={
                <RichText
                    variant="p"
                    ExtractedTextRenders={(text) => (
                        <Link
                            className="text-secondary-normal underline"
                            to={
                                REGISTRATION_ROUTES.base.routes[
                                    "forgot-password"
                                ].absolute
                            }
                        >
                            {text}
                        </Link>
                    )}
                >
                    {GetLocale(locales["forgot-password"], language)}
                </RichText>
            }
            buttons={
                <>
                    <Button type="reset" onClick={(_e) => reset()}>
                        <Locale>{locales.buttons.clear}</Locale>
                    </Button>
                    <Button variant="primary" type="submit">
                        <Locale>{locales.buttons.login}</Locale>
                    </Button>
                </>
            }
            lastOptions={
                <RichText
                    variant="p"
                    ExtractedTextRenders={(text) => (
                        <Link
                            className="text-primary-normal underline"
                            to={REGISTRATION_ROUTES.base.routes.signup.absolute}
                        >
                            {text}
                        </Link>
                    )}
                >
                    {GetLocale(locales["last-option"], language)}
                </RichText>
            }
        >
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
            <PasswordInput
                required
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
        </Form>
    );
};
