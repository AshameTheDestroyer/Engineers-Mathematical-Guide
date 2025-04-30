import { FC } from "react";
import { Link } from "react-router-dom";
import { Form } from "@/components/Form/Form";
import { Input } from "@/components/Input/Input";
import { Locale } from "@/components/Locale/Locale";
import { Button } from "@/components/Button/Button";
import { RichText } from "@/components/RichText/RichText";
import { useSchematicForm } from "@/hooks/useSchematicForm";
import { REGISTRATION_ROUTES } from "@/routes/registration.routes";
import { StateButton } from "@/components/StateButton/StateButton";
import { useLocalization } from "@/components/LocalizationProvider/LocalizationProvider";
import {
    ForgotPasswordStepsDTO,
    ForgotPasswordStepSchemas,
} from "@/schemas/ForgotPasswordSchema";

import locales from "@localization/forgot_password_page.json";

export type CodeRequestFormProps = {
    fetchingState: FetchingState;
    SubmitData: (data: ForgotPasswordStepsDTO["code-request"]) => void;
};

export const CodeRequestForm: FC<CodeRequestFormProps> = ({
    SubmitData,
    fetchingState,
}) => {
    const { GetLocale, GetErrorLocale, language } = useLocalization();

    const {
        reset,
        register,
        handleSubmit,
        formState: { errors },
    } = useSchematicForm(ForgotPasswordStepSchemas["code-request"]);

    return (
        <Form
            onSubmit={handleSubmit(SubmitData)}
            title={
                <Locale variant="h1" className="text-xl font-bold">
                    {locales.title["code-request"]}
                </Locale>
            }
            buttons={
                <>
                    <Button type="reset" onClick={(_e) => reset()}>
                        <Locale>{locales.buttons.clear}</Locale>
                    </Button>
                    <StateButton
                        type="submit"
                        variant="primary"
                        {...fetchingState}
                    >
                        <Locale>{locales.buttons["send-code"]}</Locale>
                    </StateButton>
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
                        locales["last-option"]["code-request"],
                        language
                    )}
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
        </Form>
    );
};
