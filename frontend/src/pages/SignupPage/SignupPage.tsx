import { FC, useState } from "react";
import { Link } from "react-router-dom";
import { Logo } from "@/components/Logo/Logo";
import Input from "../../components/Input/Input";
import { Button } from "@/components/Button/Button";
import Checkbox from "../../components/Checkbox/Checkbox";

export const SignupPage: FC = () => {
    const [isChecked, setisChecked] = useState(true);
    return (
        <section className="flex min-h-screen">
            <div className="flex w-full flex-col sm:flex-row">
                <main className="flex h-5/6 items-center justify-center p-4 md:w-1/2">
                    <form
                        className="flex w-full max-w-md flex-col gap-5 rounded-lg p-6"
                        action=""
                    >
                        <h1 className="mb-6 text-xl font-bold">
                            Create new account
                        </h1>
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
                            label="I agree with the application"
                            link=""
                            linkText="terms and conditions"
                            checked={true}
                            onChange={setisChecked}
                        />
                        <Button>Sign up</Button>
                        <p>
                            Already a member?
                            {/* <Link
                                to=""
                                className="border-b-1 text-foreground-light"
                            >
                                login
                            </Link> */}
                            <Link
                                className="border-b-1 text-foreground-light ml-2"
                                to="/registration/login"
                            >
                                login
                            </Link>
                        </p>
                    </form>
                </main>
                <section className="from-primary-normal to-primary-dark-active relative h-1/6 bg-gradient-to-r sm:min-h-screen sm:w-1/3 md:min-h-screen md:w-1/2">
                    <div className="absolute bottom-4 right-4 rounded p-2 text-white">
                        <Logo />
                    </div>
                </section>
            </div>
        </section>
    );
};
