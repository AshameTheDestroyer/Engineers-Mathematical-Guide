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
    email: z.string({ required_error: "required" }).email("pattern"),
    password: z
        .string({ required_error: "required" })
        .min(4, "minimum")
        .max(20, "maximum"),
});

export type LoginDTO = z.infer<typeof LoginSchema>;

export const LoginPage: FC = () => {
    const { direction, GetLocale, GetErrorLocale, language } =
        useLocalization();

    const {
        reset,
        register,
        handleSubmit,
        formState: { errors },
    } = useSchematicForm(LoginSchema);

    return (
        <form
            className="my-16 flex h-full w-full flex-col gap-8"
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
