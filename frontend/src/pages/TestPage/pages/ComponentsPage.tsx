import { FC } from "react";
import { ButtonCollection } from "../components/ButtonCollection";
import { IconButtonCollection } from "../components/IconButtonCollection";

export const ComponentsPage: FC = () => {
    return (
        <div className="flex flex-col gap-8">
            <ButtonCollection />
            <IconButtonCollection />
        </div>
    );
};
