import { FC } from "react";
import { Collection } from "./Collection";
import { Input } from "@/components/Input/Input";
import { Select } from "@/components/Select/Select";
import { Checkbox } from "@/components/Checkbox/Checkbox";
import { PasswordInput } from "@/components/PasswordInput/PasswordInput";

export const InputCollection: FC = () => {
    return (
        <Collection title="Input Components">
            <Collection
                className="flex-1 [&>div>div]:min-w-60 [&>div>div]:flex-1 [&>div]:flex-1 [&>div]:gap-4"
                title="Normal"
                typography={{ variant: "h2", className: "text-lg" }}
            >
                <Input
                    type="email"
                    variant="default"
                    name="email-default"
                    placeholder="example@gmail.com"
                />
                <Input
                    type="email"
                    variant="primary"
                    name="email-primary"
                    placeholder="example@gmail.com"
                />
                <Input
                    type="email"
                    variant="secondary"
                    name="email-secondary"
                    placeholder="example@gmail.com"
                />
            </Collection>
            <Collection
                className="flex-1 [&>div>div]:min-w-60 [&>div>div]:flex-1 [&>div]:flex-1 [&>div]:gap-4"
                title="Password"
                typography={{ variant: "h2", className: "text-lg" }}
            >
                <PasswordInput
                    variant="default"
                    placeholder="password"
                    name="password-default"
                />
                <PasswordInput
                    variant="primary"
                    placeholder="password"
                    name="password-primary"
                />
                <PasswordInput
                    variant="secondary"
                    placeholder="password"
                    name="password-secondary"
                />
            </Collection>
            <Collection
                className="flex-1 [&>div>div]:min-w-60 [&>div>div]:flex-1 [&>div]:flex-1 [&>div]:gap-4"
                title="Select"
                typography={{ variant: "h2", className: "text-lg" }}
            >
                <Select
                    variant="default"
                    name="select-default"
                    options={["option-1", "option-2", "option-3"]}
                />
                <Select
                    variant="primary"
                    name="select-primary"
                    options={["option-1", "option-2", "option-3"]}
                />
                <Select
                    variant="secondary"
                    name="select-secondary"
                    options={["option-1", "option-2", "option-3"]}
                />
            </Collection>
            <Collection
                className="flex-1 [&>div>div]:min-w-60 [&>div>div]:flex-1 [&>div]:flex-1 [&>div]:gap-4"
                title="Checkbox"
                typography={{ variant: "h2", className: "text-lg" }}
            >
                <Checkbox variant="default" name="checkbox-default" />
                <Checkbox variant="primary" name="checkbox-primary" />
                <Checkbox variant="secondary" name="checkbox-secondary" />
            </Collection>
        </Collection>
    );
};
