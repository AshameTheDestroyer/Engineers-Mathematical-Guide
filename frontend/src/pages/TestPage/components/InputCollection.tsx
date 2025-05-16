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
                <Input
                    type="email"
                    variant="information"
                    name="email-information"
                    placeholder="example@gmail.com"
                />
                <Input
                    type="email"
                    variant="warning"
                    name="email-warning"
                    placeholder="example@gmail.com"
                />
                <Input
                    type="email"
                    variant="success"
                    name="email-success"
                    placeholder="example@gmail.com"
                />
                <Input
                    type="email"
                    variant="error"
                    name="email-error"
                    placeholder="example@gmail.com"
                />
                <Input
                    type="email"
                    variant="epic"
                    name="email-epic"
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
                <PasswordInput
                    variant="information"
                    placeholder="password"
                    name="password-information"
                />
                <PasswordInput
                    variant="warning"
                    placeholder="password"
                    name="password-warning"
                />
                <PasswordInput
                    variant="success"
                    placeholder="password"
                    name="password-success"
                />
                <PasswordInput
                    variant="error"
                    placeholder="password"
                    name="password-error"
                />
                <PasswordInput
                    variant="epic"
                    placeholder="password"
                    name="password-epic"
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
                <Select
                    variant="information"
                    name="select-information"
                    options={["option-1", "option-2", "option-3"]}
                />
                <Select
                    variant="warning"
                    name="select-warning"
                    options={["option-1", "option-2", "option-3"]}
                />
                <Select
                    variant="success"
                    name="select-success"
                    options={["option-1", "option-2", "option-3"]}
                />
                <Select
                    variant="error"
                    name="select-error"
                    options={["option-1", "option-2", "option-3"]}
                />
                <Select
                    variant="epic"
                    name="select-epic"
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
                <Checkbox variant="information" name="checkbox-information" />
                <Checkbox variant="warning" name="checkbox-warning" />
                <Checkbox variant="success" name="checkbox-success" />
                <Checkbox variant="error" name="checkbox-error" />
                <Checkbox variant="epic" name="checkbox-epic" />
            </Collection>
        </Collection>
    );
};
