import React from "react";
import Input from "../../components/Input/Input";
import Checkbox from "../../components/Checkbox/Checkbox";

export default function Signup() {
    return (
        <section className="flex flex-col">
            <div className="flex w-full flex-row">
                <main className="p-4 md:w-1/2">
                    <form className="w-100 mt-10" action="">
                        <Input type="text" name="email" label="Email" />
                        <Checkbox
                            label="I agree with the application"
                            link=""
                            linkText="terms and conditions"
                        />
                    </form>
                </main>
                <section className="h-160 bg-primary-normal w-full md:w-1/2"></section>
            </div>
        </section>
    );
}
