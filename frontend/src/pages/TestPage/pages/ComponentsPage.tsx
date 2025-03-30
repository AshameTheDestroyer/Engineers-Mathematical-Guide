import { FC } from "react";
import { ButtonCollection } from "../components/ButtonCollection";

export const ComponentsPage: FC = () => {
    return (
        <div className="flex flex-col gap-8">
            <ButtonCollection />
        </div>
    );
};
