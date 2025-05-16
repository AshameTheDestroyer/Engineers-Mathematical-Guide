import { FC } from "react";
import { InputCollection } from "../components/InputCollection";
import { PopupCollection } from "../components/PopupCollection";
import { ButtonCollection } from "../components/ButtonCollection";
import { RoutingCollection } from "../components/RoutingCollection";
import { DropDownCollection } from "../components/DropDownCollection";
import { IconButtonCollection } from "../components/IconButtonCollection";
import { ProgressBarCollection } from "../components/ProgressBarCollection";
import { StateButtonCollection } from "../components/StateButtonCollection";

export const ComponentsPage: FC = () => {
    return (
        <div className="flex flex-col gap-8">
            <RoutingCollection />
            <ButtonCollection />
            <StateButtonCollection />
            <IconButtonCollection />
            <DropDownCollection />
            <ProgressBarCollection />
            <InputCollection />
            <PopupCollection />
        </div>
    );
};
