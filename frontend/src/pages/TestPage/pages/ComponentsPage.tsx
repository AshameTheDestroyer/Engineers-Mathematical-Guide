import { FC } from "react";
import { InputCollection } from "../components/InputCollection";
import { ButtonCollection } from "../components/ButtonCollection";
import { DropDownCollection } from "../components/DropDownCollection";
import { IconButtonCollection } from "../components/IconButtonCollection";
import { ProgressBarCollection } from "../components/ProgressBarCollection";
import { RoutingCollection } from "../components/RoutingCollection";

export const ComponentsPage: FC = () => {
    return (
        <div className="flex flex-col gap-8">
            <RoutingCollection />
            <ButtonCollection />
            <IconButtonCollection />
            <DropDownCollection />
            <ProgressBarCollection />
            <InputCollection />
        </div>
    );
};
