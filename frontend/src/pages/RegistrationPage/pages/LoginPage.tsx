import { z } from "zod";
import { FC } from "react";
import { Link } from "react-router-dom";
import { Locale } from "@/components/Locale/Locale";
import { Button } from "@/components/Button/Button";
import { Input } from "../../../components/Input/Input";
import { RichText } from "@/components/RichText/RichText";
import { useSchematicForm } from "@/hooks/useSchematicForm";
import { ButtonBox } from "@/components/ButtonBox/ButtonBox";
import { PasswordInput } from "@/components/PasswordInput/PasswordInput";
import { useLocalization } from "@/components/LocalizationProvider/LocalizationProvider";

import locales from "@localization/login_page.json";

export const LoginSchema = z.object({
    email: z
        .string({ required_error: "Email is required." })
        .email("Email should be written as 'example@gmail.com'."),
    password: z
        .string({ required_error: "Password is required." })
        .min(4, "Password should consist of more than 4 characters.")
        .max(20, "Password should not exceed 20 characters."),
});

export type LoginDTO = z.infer<typeof LoginSchema>;

export const LoginPage: FC = () => {
    const { direction, GetLocale, language } = useLocalization();
    const {
        reset,
        register,
        handleSubmit,
        formState: { errors },
    } = useSchematicForm(LoginSchema);

    return (
        <form
            className="flex h-full w-full flex-col gap-8"
            onSubmit={handleSubmit(console.log)}
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
                    errorMessage={errors["email"]?.message}
                    label={<Locale>{locales.inputs.email.label}</Locale>}
                    placeholder={GetLocale(
                        locales.inputs.email.placeholder,
                        language
                    )}
                />
                <PasswordInput
                    required
                    {...register("password")}
                    errorMessage={errors["password"]?.message}
                    label={<Locale>{locales.inputs.password.label}</Locale>}
                    placeholder={GetLocale(
                        locales.inputs.password.placeholder,
                        language
                    )}
                />
            </main>
            <RichText
                variant="p"
                ExtractedTextRenders={(text) => (
                    <Link
                        className="text-secondary-normal underline"
                        to="/registration/reset-password"
                    >
                        {text}
                    </Link>
                )}
            >
                {GetLocale(locales["forgot-password"], language)}
            </RichText>
            <ButtonBox
                className="[&>button]:grow"
                direction={direction == "ltr" ? "row" : "reverse-row"}
            >
                <Button type="reset" onClick={(_e) => reset()}>
                    <Locale>{locales.buttons.clear}</Locale>
                </Button>
                <Button variant="primary" type="submit">
                    <Locale>{locales.buttons.login}</Locale>
                </Button>
            </ButtonBox>
            <RichText
                variant="p"
                ExtractedTextRenders={(text) => (
                    <Link
                        className="text-primary-normal underline"
                        to="/registration/signup"
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
