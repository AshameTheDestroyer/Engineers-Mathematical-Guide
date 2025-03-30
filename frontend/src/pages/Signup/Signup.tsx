import React from "react";
import Input from "../../components/Input/Input";
import Checkbox from "../../components/Checkbox/Checkbox";
import { Button } from "@/components/Button/Button";
import { NavLink } from "react-router-dom";
import { Logo } from "@/components/Logo/Logo";

export default function Signup() {
    return (
        <section className="flex min-h-screen">
            <div className="flex w-full flex-col sm:flex-row">
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
                            <NavLink className="border-b-1 text-foreground-light">
                                login
                            </NavLink>
                        </p>
                    </form>
                </main>
                <section className="from-primary-normal to-primary-dark-active h-30 relative w-full bg-gradient-to-r sm:min-h-screen sm:w-1/3 md:min-h-screen md:w-1/2">
                    <div className="absolute bottom-4 right-4 rounded p-2 text-white">
                        <Logo />
                    </div>
                </section>
            </div>
        </section>
    );
}
