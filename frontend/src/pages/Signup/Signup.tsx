import React from "react";
import Input from "../../components/Input/Input";
import Checkbox from "../../components/Checkbox/Checkbox";

export default function Signup() {
    return (
        <section className="flex min-h-screen">
            <div className="flex w-full flex-row">
                <main className="flex items-center justify-center p-4 md:w-1/2">
                    <form
                        className="flex w-full max-w-md flex-col gap-5 rounded-lg p-6"
                        action=""
                    >
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
                    </form>
                </main>
                <section className="from-primary-normal to-primary-dark-active min-h-screen w-full bg-gradient-to-r md:w-1/2"></section>
            </div>
        </section>
    );
}
