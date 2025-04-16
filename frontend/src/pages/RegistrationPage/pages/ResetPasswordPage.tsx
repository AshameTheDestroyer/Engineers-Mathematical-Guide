import { FC } from "react";
import { Link } from "react-router-dom";
import { Locale } from "@/components/Locale/Locale";
import { Button } from "@/components/Button/Button";
import { Input } from "../../../components/Input/Input";
import { RichText } from "@/components/RichText/RichText";
import { ButtonBox } from "@/components/ButtonBox/ButtonBox";
import { useLocalization } from "@/components/LocalizationProvider/LocalizationProvider";

import locales from "@localization/reset_password_page.json";

export const ResetPasswordPage: FC = () => {
    const { direction, GetLocale, language } = useLocalization();

    return (
        <form className="flex h-full w-full flex-col gap-8" action="">
            <Locale variant="h1" className="text-xl font-bold">
                {locales.title}
            </Locale>
            <main className="flex grow flex-col place-content-center gap-6">
                <Input
                    required
                    type="email"
                    name="email"
                    label={<Locale>{locales.inputs.email.label}</Locale>}
                    placeholder={GetLocale(
                        locales.inputs.email.placeholder,
                        language
                    )}
                />
            </main>
            <ButtonBox
                className="[&>button]:grow"
                direction={direction == "ltr" ? "row" : "reverse-row"}
            >
                <Button type="reset">
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
                {GetLocale(locales["last-option"], language)}
            </RichText>
        </form>
    );
};
