import { FC } from "react";
import { Collection } from "./Collection";
import { ProgressBar } from "@/components/ProgressBarComponent/ProgressBar";

export const ProgressBarCollection: FC = () => {
    return (
        <Collection title="Progress Bar Component">
            <ProgressBar variant="default" value={25} />
            <ProgressBar variant="primary" value={25} />
            <ProgressBar variant="secondary" value={25} />
        </Collection>
    );
};
