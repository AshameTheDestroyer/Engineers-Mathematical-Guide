import { FC } from "react";
import { ButtonCollection } from "../components/ButtonCollection";
import { IconButtonCollection } from "../components/IconButtonCollection";

import { DropDownCollection } from "../components/DropDownCollection";

export const ComponentsPage: FC = () => {
    return (
        <div className="flex flex-col gap-8">
            <ButtonCollection />
            <IconButtonCollection />
            <DropDownCollection />
        </div>
    );
};
