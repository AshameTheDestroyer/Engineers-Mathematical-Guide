import { FC } from "react";
import { Link } from "react-router-dom";
import { Logo } from "@/components/Logo/Logo";
import Input from "../../components/Input/Input";
import { Button } from "@/components/Button/Button";
import Checkbox from "../../components/Checkbox/Checkbox";

export const SignupPage: FC = () => {
    return (
        <section className="flex min-h-screen">
            <div className="flex w-full flex-row">
                <main className="flex items-center justify-center p-4 md:w-1/2">
                    <form
                        className="flex w-full max-w-md flex-col gap-5 rounded-lg p-6"
                        action=""
                    >
                        <h1 className="mb-6 text-xl font-bold">
                            Create new account
                        </h1>
                        <Input type="text" name="email" label="Email" />
                        <Input
                            type="password"
                            name="password"
                            label="Enter new Password"
                        />
                        <Input
                            type="password"
                            name="password"
                            label="Confirm Password"
                        />
                        <Checkbox
                            label="I agree with the application"
                            link=""
                            linkText="terms and conditions"
                        />
                        <Button>SignUp</Button>
                        <p>
                            Already a member?{" "}
                            <Link to="/registration/login">login</Link>
                        </p>
                    </form>
                </main>
                <section className="from-primary-normal to-primary-dark-active relative min-h-screen w-full bg-gradient-to-r md:w-1/2">
                    <div className="absolute bottom-4 right-4 rounded p-2 text-white">
                        <Logo />
                    </div>
                </section>
            </div>
        </section>
    );
};
