import { FC } from "react";
import { Link } from "react-router-dom";
import Input from "../../../components/Input/Input";
import { Button } from "@/components/Button/Button";
import Checkbox from "../../../components/Checkbox/Checkbox";

export const SignupPage: FC = () => {
    return (
        <main className="flex h-5/6 items-center justify-center p-4 md:w-1/2">
            <form
                className="flex w-full max-w-md flex-col gap-5 rounded-lg p-6"
                action=""
            >
                <h1 className="mb-6 text-xl font-bold">Create new account</h1>
                <Input
                    type="text"
                    name="email"
                    label="Email"
                    placeholder="example@gmail.com"
                />
                <Input
                    type="password"
                    name="password"
                    label="Password"
                    placeholder="Enter new password"
                />
                <Input
                    type="password"
                    name="password"
                    label="Confirm Password"
                    placeholder="Re-enter same password"
                />
                <Checkbox
                    link=""
                    checked={true}
                    linkText="terms and conditions"
                    label="I agree with the application"
                />
                <Button>Sign up</Button>
                <p>
                    Already a member?
                    <Link
                        className="border-b-1 text-foreground-light ml-2"
                        to="/registration/login"
                    >
                        login
                    </Link>
                </p>
            </form>
        </main>
    );
};
