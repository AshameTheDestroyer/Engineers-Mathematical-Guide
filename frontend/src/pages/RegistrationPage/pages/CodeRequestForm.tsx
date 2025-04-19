import { FC } from "react";
import { Link } from "react-router-dom";
import { Form } from "@/components/Form/Form";
import { Input } from "@/components/Input/Input";
import { Locale } from "@/components/Locale/Locale";
import { Button } from "@/components/Button/Button";
import { RichText } from "@/components/RichText/RichText";
import { useSchematicForm } from "@/hooks/useSchematicForm";
import { useLocalization } from "@/components/LocalizationProvider/LocalizationProvider";
import {
    ForgotPasswordStepsDTO,
    ForgotPasswordStepSchemas,
} from "./ForgotPasswordPage";

import locales from "@localization/forgot_password_page.json";

export type CodeRequestFormProps = {
    SubmitData: (data: ForgotPasswordStepsDTO["code-request"]) => void;
};

export const CodeRequestForm: FC<CodeRequestFormProps> = ({ SubmitData }) => {
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
                    <Button variant="primary" type="submit">
                        <Locale>{locales.buttons["send-code"]}</Locale>
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
