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

export type CodeRequestFormProps = {
    SubmitData: (data: ForgotPasswordStepsDTO["code-request"]) => void;
};

export const CodeRequestForm: FC<CodeRequestFormProps> = ({ SubmitData }) => {
    const { direction, GetLocale, GetErrorLocale, language } =
        useLocalization();

    const {
        reset,
        register,
        handleSubmit,
        formState: { errors },
    } = useSchematicForm(ForgotPasswordStepSchemas["code-request"]);

    return (
        <form
            className="my-16 flex h-full w-full flex-col gap-8"
            onSubmit={handleSubmit(SubmitData)}
        >
            <Locale variant="h1" className="text-xl font-bold">
                {locales.title["code-request"]}
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
                {GetLocale(locales["last-option"]["code-request"], language)}
            </RichText>
        </form>
    );
};
