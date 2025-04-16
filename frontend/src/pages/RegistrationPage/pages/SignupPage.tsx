import { FC } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/Button/Button";
import { Input } from "../../../components/Input/Input";
import { Checkbox } from "@/components/Checkbox/Checkbox";
import { RichText } from "@/components/RichText/RichText";
import { ButtonBox } from "@/components/ButtonBox/ButtonBox";
import { Typography } from "@/components/Typography/Typography";
import { PasswordInput } from "@/components/PasswordInput/PasswordInput";
import { useLocalization } from "@/components/LocalizationProvider/LocalizationProvider";

export const SignupPage: FC = () => {
    const { direction } = useLocalization();

    return (
        <form className="flex h-full w-full flex-col gap-8" action="">
            <Typography variant="h1" className="text-xl font-bold">
                Create new account
            </Typography>
            <main className="flex grow flex-col place-content-center gap-6">
                <Input
                    required
                    type="email"
                    name="email"
                    placeholder="example@gmail.com"
                />
                <PasswordInput
                    required
                    name="password"
                    placeholder="Enter new password"
                />
                <PasswordInput
                    required
                    name="confirm-password"
                    placeholder="Re-enter previous password"
                />
                <Checkbox
                    required
                    variant="secondary"
                    name="terms-and-conditions"
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
                            I agree with the application's **Terms &
                            Conditions**.
                        </RichText>
                    }
                />
            </main>
            <ButtonBox
                className="[&>button]:grow"
                direction={direction == "ltr" ? "row" : "reverse-row"}
            >
                <Button type="reset">Clear</Button>
                <Button variant="primary" type="submit">
                    Sign up
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
                Already a member? **Login**.
            </RichText>
        </form>
    );
};
