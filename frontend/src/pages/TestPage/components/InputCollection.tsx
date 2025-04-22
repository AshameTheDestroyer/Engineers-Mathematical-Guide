import { FC } from "react";
import { Collection } from "./Collection";
import { Input } from "@/components/Input/Input";

export const InputCollection: FC = () => {
    return (
        <Collection title="Input Component">
            <Collection
                className="[&>div]:gap-4"
                title="Normal"
                typography={{ variant: "h2", className: "text-lg" }}
            >
                <Input
                    name="email"
                    placeholder="example@gmail.com"
                    variant="default"
                />
                <Input
                    name="email"
                    placeholder="example@gmail.com"
                    variant="primary"
                />
                <Input
                    name="email"
                    placeholder="example@gmail.com"
                    variant="secondary"
                />
            </Collection>
        </Collection>
    );
};
