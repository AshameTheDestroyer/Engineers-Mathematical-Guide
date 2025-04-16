import { FC } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/Button/Button";
import { Input } from "../../../components/Input/Input";
import { Checkbox } from "@/components/Checkbox/Checkbox";
import { RichText } from "@/components/RichText/RichText";
import { ButtonBox } from "@/components/ButtonBox/ButtonBox";

export const SignupPage: FC = () => {
    return (
        <main className="flex items-center justify-center p-4">
            <form
                className="flex w-full max-w-md flex-col gap-5 rounded-lg p-6"
                action=""
            >
                <h1 className="mb-6 text-xl font-bold">Create new account</h1>
                <Input
                    required
                    type="email"
                    name="email"
                    placeholder="example@gmail.com"
                />
                <Input
                    required
                    type="password"
                    name="password"
                    placeholder="Enter new password"
                />
                <Input
                    required
                    type="password"
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
                <ButtonBox className="[&>button]:grow">
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
        </main>
    );
};
