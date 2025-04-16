import { FC } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/Button/Button";
import { Input } from "../../../components/Input/Input";
import { RichText } from "@/components/RichText/RichText";
import { ButtonBox } from "@/components/ButtonBox/ButtonBox";
import { Typography } from "@/components/Typography/Typography";
import { PasswordInput } from "@/components/PasswordInput/PasswordInput";
import { useLocalization } from "@/components/LocalizationProvider/LocalizationProvider";

export const LoginPage: FC = () => {
    const { direction } = useLocalization();

    return (
        <main className="flex items-center justify-center p-4">
            <form
                className="flex w-full max-w-[80vw] flex-col gap-8 rounded-lg p-6"
                action=""
            >
                <Typography variant="h1" className="text-xl font-bold">
                    Enter your information
                </Typography>
                <main className="flex flex-col gap-6">
                    <Input
                        required
                        type="email"
                        name="email"
                        placeholder="example@gmail.com"
                    />
                    <PasswordInput
                        required
                        name="password"
                        placeholder="Enter your password"
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
                    Forgot your password? **Reset Password**.
                </RichText>
                <ButtonBox
                    className="[&>button]:grow"
                    direction={direction == "ltr" ? "row" : "reverse-row"}
                >
                    <Button type="reset">Clear</Button>
                    <Button variant="primary" type="submit">
                        Login
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
                    Doesn't have an account? **Sign up**.
                </RichText>
            </form>
        </main>
    );
};
