import { FC } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/Button/Button";
import { Input } from "../../../components/Input/Input";
import { RichText } from "@/components/RichText/RichText";
import { ButtonBox } from "@/components/ButtonBox/ButtonBox";
import { Typography } from "@/components/Typography/Typography";
import { useLocalization } from "@/components/LocalizationProvider/LocalizationProvider";

export const ResetPasswordPage: FC = () => {
    const { direction } = useLocalization();

    return (
        <form
            className="flex w-full max-w-[80vw] flex-col gap-8 rounded-lg p-6"
            action=""
        >
            <Typography variant="h1" className="text-xl font-bold">
                Get code via email
            </Typography>
            <main className="flex flex-col gap-6">
                <Input
                    required
                    type="email"
                    name="email"
                    placeholder="example@gmail.com"
                />
            </main>
            <ButtonBox
                className="[&>button]:grow"
                direction={direction == "ltr" ? "row" : "reverse-row"}
            >
                <Button type="reset">Clear</Button>
                <Button variant="primary" type="submit">
                    Send Code
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
                Changed your mind? **Go Back**.
            </RichText>
        </form>
    );
};
