import { FC } from "react";
import { ButtonCollection } from "../components/ButtonCollection";
import { DropDownCollection } from "../components/DropDownCollection";
import { IconButtonCollection } from "../components/IconButtonCollection";
import { ProgressBarCollection } from "../components/ProgressBarCollection";

export const ComponentsPage: FC = () => {
    return (
        <div className="flex flex-col gap-8">
            <ButtonCollection />
            <IconButtonCollection />
            <DropDownCollection />
            <ProgressBarCollection />
        </div>
    );
};
